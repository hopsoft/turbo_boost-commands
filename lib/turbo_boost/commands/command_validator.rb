# frozen_string_literal: true

class TurboBoost::Commands::CommandValidator
  def initialize(command_class, method_name)
    @command_class = command_class
    @method_name = method_name
  end

  attr_reader :command_class, :method_name

  def validate
    valid_class? && valid_method?
  end
  alias_method :valid?, :validate

  def validate!
    unless valid_class?
      raise TurboBoost::Commands::InvalidClassError,
        "`#{command_class.name}` is not a subclass of `#{TurboBoost::Commands::Command.name}`!"
    end

    unless valid_method?
      raise TurboBoost::Commands::InvalidMethodError,
        "`#{command_class.name}` does not define the public method `#{command_method.name}`!"
    end

    true
  end

  private

  def command_class_ancestors
    command_class.ancestors & TurboBoost::Commands::Command.descendants
  end

  def command_method
    return nil unless valid_class?
    command_class.public_instance_method method_name
  end

  def valid_class?
    command_class_ancestors.any?
  end

  def valid_method?
    return false unless command_method
    command_class_ancestors.include? command_method.owner
  end
end
