# frozen_string_literal: true

require "observer"

module TurboBoost::Commands::CommandCallbacks
  extend ActiveSupport::Concern

  include Observable
  include ActiveSupport::Callbacks

  NAME = :perform_command

  module ClassMethods
    # Configure an abort handler
    #
    # @yield [TurboBoost::Commands::Command, StandardError] The block to execute if the command is aborted
    # @yieldparam command [TurboBoost::Commands::Command] The command instance
    # @yieldparam error [StandardError] The error that was raised in a `before_command` callback
    def on_abort(&block)
      @on_abort = block
    end

    # Configure an error handler
    #
    # @yield [TurboBoost::Commands::Command, StandardError] The block to execute if the command raises an error during execution
    # @yieldparam command [TurboBoost::Commands::Command] The command instance
    # @yieldparam error [StandardError] The error that was raised
    def on_error(&block)
      @on_error = block
    end

    [:before, :after, :around].each do |type|
      define_method :"#{type}_command" do |*method_names, &blk|
        options = callback_options(method_names.extract_options!)

        # convert only to if
        options[:only].each do |command_name|
          options[:if] << -> { command_name.to_s == @performing_method_name.to_s }
        end

        # convert except to unless
        options[:except].each do |command_name|
          options[:unless] << -> { command_name.to_s == @performing_method_name.to_s }
        end

        options = options.slice(:if, :unless, :prepend).select { |_, val| val.present? }
        method_names.each { |method_name| set_callback NAME, type, method_name, options }
      end

      define_method :"skip_#{type}_command" do |*method_names, &blk|
        options = callback_options(method_names.extract_options!)

        # convert only to if
        options[:only].each do |command_name|
          options[:if] << -> { command_name.to_s == @performing_method_name.to_s }
        end

        # convert except to unless
        options[:except].each do |command_name|
          options[:unless] << -> { command_name.to_s == @performing_method_name.to_s }
        end

        options = options.slice(:if, :unless, :prepend).select { |_, val| val.present? }
        method_names.each { |method_name| skip_callback NAME, type, method_name, options }
      end

      private

      def callback_options(options)
        options[:if] = [options[:if]].flatten.compact
        options[:unless] = [options[:unless]].flatten.compact
        options[:only] = [options[:only]].flatten.compact
        options[:except] = [options[:except]].flatten.compact
        options
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

  def performing?
    !!@performing_method_name
  end

  def performed?
    !!@performed
  end

  def succeeded?
    performed? && !aborted? && !errored?
  end

  private

  def abort_handler
    self.class.instance_variable_get(:@on_abort) || ->(*_) {}
  end

  def aborted!(error)
    changed @aborted = true
    notify_observers :aborted, error: error
    abort_handler.call self, error
  end

  def error_handler
    self.class.instance_variable_get(:@on_error) || ->(*_) {}
  end

  def errored!(error)
    changed @errored = true
    notify_observers :errored, error: error
    error_handler.call self, error
  end

  def performed!
    changed @performed = true
    notify_observers :performed
  end
end
