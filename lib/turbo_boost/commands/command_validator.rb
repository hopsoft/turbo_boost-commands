# frozen_string_literal: true

class TurboBoost::Commands::CommandValidator
  def initialize(command, method_name)
    @command = command
    @method_name = method_name.to_sym
  end

  attr_reader :command, :method_name

  def validate
    valid_class? && valid_method?
  end
  alias_method :valid?, :validate

  def validate!
    message = "`#{command.class.name}` is not a subclass of `#{TurboBoost::Commands::Command.name}`!"
    raise TurboBoost::Commands::InvalidClassError.new(message, command: command.class) unless valid_class?

    message = "`#{command.class.name}` does not define the public method `#{method_name}`!"
    raise TurboBoost::Commands::InvalidMethodError.new(message, command: command.class) unless valid_method?

    true
  end

  private

  def command_ancestors
    range = 0..(command.class.ancestors.index(TurboBoost::Commands::Command).to_i - 1)
    command.class.ancestors.[](range) || []
  end

  def valid_class?
    command.class.ancestors.include? TurboBoost::Commands::Command
  end

  def valid_method?
    return false unless valid_class?
    return false unless command_ancestors.any? { |a| a.public_instance_methods(false).any? method_name }

    method = command.class.public_instance_method(method_name)
    method&.parameters&.none?
  end
end
