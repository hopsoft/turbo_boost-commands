# frozen_string_literal: true

require "observer"

module TurboBoost::Commands::CommandCallbacks
  extend ActiveSupport::Concern

  include Observable
  include ActiveSupport::Callbacks
  include ActiveSupport::Rescuable

  NAME = :perform_command

  module ClassMethods
    [:before, :after, :around].each do |type|
      define_method :"#{type}_command" do |*method_names, &block|
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
        set_callback(NAME, type, options, &block)
        method_names.each { |method_name| set_callback(NAME, type, method_name, options, &block) }
      end

      define_method :"skip_#{type}_command" do |*method_names, &block|
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
        method_names.each { |method_name| skip_callback(NAME, type, method_name, options, &block) }
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
      terminator: ->(command, callback) do
        halt = true # STOP the callback chain (pessimistic)

        begin
          catch :abort do
            callback.call # execution halts here if the callback invokes `throw :abort`
            halt = false # CONTINUE the callback chain
          end

          if halt # callback chain halted, meaning `throw` was invoked in a callback
            command.send :aborted!, TurboBoost::Commands::AbortError.new(command: command)
          end
        rescue UncaughtThrowError => error
          # `throw` was invoked without :abort
          message = "Please use `throw :abort` to abort a command."
          command.send :aborted!, TurboBoost::Commands::AbortError.new(message, command: command, cause: error)
        end

        halt
      end
  end

  def perform_with_callbacks(method_name)
    @performing_method_name = method_name
    run_callbacks NAME do
      public_send method_name
      performed!
    end
  rescue => error
    errored! TurboBoost::Commands::PerformError.new(command: self, cause: error)
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

  def abort_handler(error = nil)
    # noop, override in subclasses via `on_abort`
  end

  def error_handler(error)
    # noop, override in subclasses via `on_error`
  end

  private

  def aborted!(error)
    return if aborted? || errored? || performed?
    changed @aborted = @performed = true
    rescue_with_handler error
    notify_observers :aborted, error: error
  end

  def errored!(error)
    return if aborted? || errored? || performed?
    changed @errored = @performed = true
    error_handler error
    rescue_with_handler error
    notify_observers :errored, error: error
  end

  def performed!
    return if performed?
    changed @performed = true
    notify_observers :performed
  end
end
