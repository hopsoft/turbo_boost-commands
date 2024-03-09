# frozen_string_literal: true

class TurboBoost::Commands::CommandValidator
  def initialize(class_name, method_name)
    @class_name = class_name
    @method_name = method_name.to_sym
    @command_class = class_name&.safe_constantize
  end

  attr_reader :class_name, :method_name, :command_class

  def validate
    valid_class? && valid_method?
  end
  alias_method :valid?, :validate

  def validate!
    message = "`#{class_name}` is not a subclass of `#{TurboBoost::Commands::Command.name}`!"
    raise TurboBoost::Commands::InvalidClassError.new(message, command: command_class) unless valid_class?

    message = "`#{command_class.name}` does not define the public method `#{method_name}`!"
    raise TurboBoost::Commands::InvalidMethodError.new(message, command: command_class) unless valid_method?

    true
  end

  private

  def command_ancestors
    range = 0..(command_class&.ancestors&.index(TurboBoost::Commands::Command).to_i - 1)
    command_class&.ancestors&.[](range) || []
  end

  def valid_class?
    command_class&.ancestors&.include? TurboBoost::Commands::Command
  end

  def valid_method?
    return false unless valid_class?
    return false unless command_ancestors.any? { |a| a.public_instance_methods(false).any? method_name }

    method = command_class.public_instance_method(method_name)
    method&.parameters&.none?
  end
end
