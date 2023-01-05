# frozen_string_literal: true

require "observer"

module TurboBoost::Commands::CommandCallbacks
  extend ActiveSupport::Concern

  include Observable
  include ActiveSupport::Callbacks

  NAME = :perform_command

  module ClassMethods
    [:before, :after, :around].each do |type|
      define_method "#{type}_command" do |*method_names, &blk|
        options = method_names.extract_options!
        options[:if] = [options[:if]].flatten.compact
        options[:unless] = [options[:unless]].flatten.compact

        only = [options[:only]].flatten.compact
        only.each do |command_name|
          options[:if] << -> { command_name.to_s == @performing_method_name.to_s }
        end

        except = [options[:except]].flatten.compact
        except.each do |command_name|
          options[:unless] << -> { command_name.to_s == @performing_method_name.to_s }
        end

        options.reject! { |key, value| key.match?(/\Aonly|except\z/i) || value.blank? }

        method_names.each do |method_name|
          set_callback NAME, type, method_name, options
        end
      end
    end
  end

  included do
    define_callbacks NAME,
      skip_after_callbacks_if_terminated: true,
      terminator: ->(command, callback) {
                    begin
                      callback.call
                      false # everything is ok
                    rescue => error
                      command.send :aborted!, error
                      true # halt the callback chain
                    end
                  }
  end

  def perform_with_callbacks(method_name)
    @performing_method_name = method_name
    run_callbacks NAME do
      public_send method_name
      performed!
    end
  rescue => error
    errored! error
  ensure
    @performing_method_name = nil
  end

  def aborted?
    !!@aborted
  end

  def errored?
    !!@errored
  end

  def performed?
    !!@performed
  end

  def succeeded?
    performed? && !aborted? && !errored?
  end

  private

  def aborted!(error)
    changed @aborted = true
    notify_observers :aborted, error: error
  end

  def errored!(error)
    changed @errored = true
    notify_observers :errored, error: error
  end

  def performed!
    changed @performed = true
    notify_observers :performed
  end
end
