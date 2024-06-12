# frozen_string_literal: true

class TurboBoost::Commands::TokenValidator
  def initialize(command, method_name)
    @command = command
    @method_name = method_name
  end

  attr_reader :command, :method_name
  delegate :controller, to: :command
  delegate :session, to: :controller

  def validate
    return true unless TurboBoost::Commands.config.protect_from_forgery
    tokens.any? { |token| valid_token? token }
  end

  alias_method :valid?, :validate

  def validate!
    return true if valid?

    message = <<~MSG
      `#{command.class.name}##{method_name}` invoked with an invalid authenticity token!

      Verify that your page includes `<%= csrf_meta_tags %>` in the header.

      If the problem persists, you can disable forgery protection with `TurboBoost::Commands.config.protect_from_forgery = false`
    MSG

    raise TurboBoost::Commands::InvalidTokenError.new(message, command: command.class)
  end

  private

  def tokens
    list = Set.new.tap do |set|
      set.add command.params[:csrf_token]
      set.add controller.request.x_csrf_token
      set.add controller.params[controller.class.request_forgery_protection_token]
    end

    list.select(&:present?).to_a
  end

  def valid_token?(token)
    # TODO: Update to use Rails' public API
    controller.send :valid_authenticity_token?, session, token
  end

  def token_name
    Rails.application.config.action_controller.request_forgery_protection_token ||
      ActionController::RequestForgeryProtection::CSRF_TOKEN
  end
end
