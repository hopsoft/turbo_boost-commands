# frozen_string_literal: true

require "test_helper"

class TurboBoost::Commands::CommandValidatorTest < ActiveSupport::TestCase
  module TestCommandSuperclassMixin
    def superclass_mixin_perform
    end

    protected def superclass_mixin_perform_protected
    end

    private def superclass_mixin_perform_private
    end
  end

  class TestCommandSuperclass < TurboBoost::Commands::Command
    include TestCommandSuperclassMixin

    def superclass_perform
    end

    protected def superclass_perform_protected
    end

    private def superclass_perform_private
    end
  end

  module TestCommandMixin
    def mixin_perform
    end

    protected def mixin_perform_protected
    end

    private def mixin_perform_private
    end
  end

  class TestCommand < TestCommandSuperclass
    include TestCommandMixin

    def perform
    end

    def perform_with_args(arg, *args, **kwargs, &block)
    end

    protected def perform_protected
    end

    private def perform_private
    end
  end

  class InvalidTestCommand
    def perform
    end
  end

  setup do
    controller = TestsController.new
    state = TurboBoost::Commands::State.new
    @command = TurboBoost::Commands::CommandValidatorTest::TestCommand.new(controller, state)
    @invalid_command = TurboBoost::Commands::CommandValidatorTest::InvalidTestCommand.new
  end

  test "valid? with missing class" do
    refute TurboBoost::Commands::CommandValidator.new(nil, :perform).valid?
  end

  test "validate with missing class" do
    refute TurboBoost::Commands::CommandValidator.new(nil, :perform).validate
  end

  test "validate! with missing class" do
    assert_raises TurboBoost::Commands::InvalidClassError do
      TurboBoost::Commands::CommandValidator.new(nil, :perform).validate!
    end
  end

  test "valid? with invalid class" do
    refute TurboBoost::Commands::CommandValidator.new(@invalid_command, :perform).valid?
  end

  test "validate with invalid class" do
    refute TurboBoost::Commands::CommandValidator.new(@invalid_command, :perform).validate
  end

  test "validate! with invalid class" do
    assert_raises TurboBoost::Commands::InvalidClassError do
      TurboBoost::Commands::CommandValidator.new(@invalid_command, :perform).validate!
    end
  end

  test "valid? with public methods" do
    assert TurboBoost::Commands::CommandValidator.new(@command, :superclass_mixin_perform).valid?
    assert TurboBoost::Commands::CommandValidator.new(@command, :superclass_perform).valid?
    assert TurboBoost::Commands::CommandValidator.new(@command, :mixin_perform).valid?
    assert TurboBoost::Commands::CommandValidator.new(@command, :perform).valid?
  end

  test "valid? with protected methods" do
    refute TurboBoost::Commands::CommandValidator.new(@command, :superclass_mixin_perform_protected).valid?
    refute TurboBoost::Commands::CommandValidator.new(@command, :superclass_perform_protected).valid?
    refute TurboBoost::Commands::CommandValidator.new(@command, :mixin_perform_protected).valid?
    refute TurboBoost::Commands::CommandValidator.new(@command, :perform_protected).valid?
  end

  test "valid? with private methods" do
    refute TurboBoost::Commands::CommandValidator.new(@command, :superclass_mixin_perform_private).valid?
    refute TurboBoost::Commands::CommandValidator.new(@command, :superclass_perform_private).valid?
    refute TurboBoost::Commands::CommandValidator.new(@command, :mixin_perform_private).valid?
    refute TurboBoost::Commands::CommandValidator.new(@command, :perform_private).valid?
  end

  test "valid? with inherited methods" do
    refute TurboBoost::Commands::CommandValidator.new(@command, :inspect).valid?
    refute TurboBoost::Commands::CommandValidator.new(@command, :inspect).valid?
    refute TurboBoost::Commands::CommandValidator.new(@command, :inspect).valid?
    refute TurboBoost::Commands::CommandValidator.new(@command, :inspect).valid?
  end

  test "validate with public methods" do
    assert TurboBoost::Commands::CommandValidator.new(@command, :superclass_mixin_perform).validate
    assert TurboBoost::Commands::CommandValidator.new(@command, :superclass_perform).validate
    assert TurboBoost::Commands::CommandValidator.new(@command, :mixin_perform).validate
    assert TurboBoost::Commands::CommandValidator.new(@command, :perform).validate
  end

  test "validate! with public methods that accept arguments" do
    assert_raises TurboBoost::Commands::InvalidMethodError do
      TurboBoost::Commands::CommandValidator.new(@command, :perform_with_args).validate!
    end
  end

  test "validate with public methods that accept arguments" do
    refute TurboBoost::Commands::CommandValidator.new(@command, :perform_with_args).validate
  end

  test "valid? with public methods that accept arguments" do
    refute TurboBoost::Commands::CommandValidator.new(@command, :perform_with_args).valid?
  end

  test "validate with protected methods" do
    refute TurboBoost::Commands::CommandValidator.new(@command, :superclass_mixin_perform_protected).validate
    refute TurboBoost::Commands::CommandValidator.new(@command, :superclass_perform_protected).validate
    refute TurboBoost::Commands::CommandValidator.new(@command, :mixin_perform_protected).validate
    refute TurboBoost::Commands::CommandValidator.new(@command, :perform_protected).validate
  end

  test "validate with private methods" do
    refute TurboBoost::Commands::CommandValidator.new(@command, :superclass_mixin_perform_private).validate
    refute TurboBoost::Commands::CommandValidator.new(@command, :superclass_perform_private).validate
    refute TurboBoost::Commands::CommandValidator.new(@command, :mixin_perform_private).validate
    refute TurboBoost::Commands::CommandValidator.new(@command, :perform_private).validate
  end

  test "validate with inherited methods" do
    refute TurboBoost::Commands::CommandValidator.new(@command, :inspect).validate
    refute TurboBoost::Commands::CommandValidator.new(@command, :inspect).validate
    refute TurboBoost::Commands::CommandValidator.new(@command, :inspect).validate
    refute TurboBoost::Commands::CommandValidator.new(@command, :inspect).validate
  end

  test "validate! with public methods" do
    assert TurboBoost::Commands::CommandValidator.new(@command, :superclass_mixin_perform).validate!
    assert TurboBoost::Commands::CommandValidator.new(@command, :superclass_perform).validate!
    assert TurboBoost::Commands::CommandValidator.new(@command, :mixin_perform).validate!
    assert TurboBoost::Commands::CommandValidator.new(@command, :perform).validate!
  end

  test "validate! with protected methods" do
    assert_raises TurboBoost::Commands::InvalidMethodError do
      TurboBoost::Commands::CommandValidator.new(@command, :superclass_mixin_perform_protected).validate!
    end

    assert_raises TurboBoost::Commands::InvalidMethodError do
      TurboBoost::Commands::CommandValidator.new(@command, :superclass_perform_protected).validate!
    end

    assert_raises TurboBoost::Commands::InvalidMethodError do
      TurboBoost::Commands::CommandValidator.new(@command, :mixin_perform_protected).validate!
    end

    assert_raises TurboBoost::Commands::InvalidMethodError do
      TurboBoost::Commands::CommandValidator.new(@command, :perform_protected).validate!
    end
  end

  test "validate! with private methods" do
    assert_raises TurboBoost::Commands::InvalidMethodError do
      TurboBoost::Commands::CommandValidator.new(@command, :superclass_mixin_perform_private).validate!
    end

    assert_raises TurboBoost::Commands::InvalidMethodError do
      TurboBoost::Commands::CommandValidator.new(@command, :superclass_perform_private).validate!
    end

    assert_raises TurboBoost::Commands::InvalidMethodError do
      TurboBoost::Commands::CommandValidator.new(@command, :mixin_perform_private).validate!
    end

    assert_raises TurboBoost::Commands::InvalidMethodError do
      TurboBoost::Commands::CommandValidator.new(@command, :perform_private).validate!
    end
  end

  test "validate! with inherited methods" do
    assert_raises TurboBoost::Commands::InvalidMethodError do
      TurboBoost::Commands::CommandValidator.new(@command, :inspect).validate!
    end

    assert_raises TurboBoost::Commands::InvalidMethodError do
      TurboBoost::Commands::CommandValidator.new(@command, :inspect).validate!
    end

    assert_raises TurboBoost::Commands::InvalidMethodError do
      TurboBoost::Commands::CommandValidator.new(@command, :inspect).validate!
    end

    assert_raises TurboBoost::Commands::InvalidMethodError do
      TurboBoost::Commands::CommandValidator.new(@command, :inspect).validate!
    end
  end
end
