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
    return [] unless command_class
    head = 0
    tail = command_class.ancestors.index(TurboBoost::Commands::Command) - 1
    command_class.ancestors[head..tail]
  end

  def valid_class?
    command_class&.ancestors&.include? TurboBoost::Commands::Command
  end

  def valid_method?
    return false unless valid_class?
    command_ancestors.any? do |ancestor|
      ancestor.public_instance_methods(false).any? method_name
    end
  end
end
