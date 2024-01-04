# frozen_string_literal: true

require "observer"

module TurboBoost::Commands::CommandCallbacks
  extend ActiveSupport::Concern

  include Observable
  include ActiveSupport::Callbacks

  NAME = :perform_command

  module ClassMethods
    # DSL to configure an abort handler
    #
    # NOTE: Can also be defined by overriding `def abort_handler` in a subclass
    #
    # @yield [TurboBoost::Commands::Command, StandardError] The block to execute if the command is aborted
    # @yieldparam command [TurboBoost::Commands::Command] The command instance
    # @yieldparam error [StandardError] The error that was raised in a `before_command` callback
    def on_abort(&block)
      define_method(:abort_handler, &block)
    end

    # Configure an error handler
    #
    # NOTE: Can also be defined by overriding `def error_handler` in a subclass
    #
    # @yield [TurboBoost::Commands::Command, StandardError] The block to execute if the command raises an error during execution
    # @yieldparam command [TurboBoost::Commands::Command] The command instance
    # @yieldparam error [StandardError] The error that was raised
    def on_error(&block)
      define_method(:error_handler, &block)
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
        rescue => error
          # unxpected error in callback
          command.send :errored!, error
        end
      end
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

  def abort_handler(error = nil)
    # noop, override in subclasses via `on_abort`
  end

  def error_handler(error)
    # noop, override in subclasses via `on_error`
  end

  private

  def aborted!(error)
    return if aborted? || errored? || performed?
    changed @aborted = true
    abort_handler error
    notify_observers :aborted, error: error
  end

  def errored!(error)
    return if aborted? || errored? || performed?
    changed @errored = true
    error_handler error
    notify_observers :errored, error: error
  end

  def performed!
    return if aborted? || errored? || performed?
    changed @performed = true
    notify_observers :performed
  end
end
