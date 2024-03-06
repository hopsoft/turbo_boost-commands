# frozen_string_literal: true

class TurboBoost::Commands::ExitMiddleware
  BODY_PATTERN = /<\/\s*body/io.freeze
  TURBO_FRAME_PATTERN = /<\/\s*turbo-frame/io.freeze
  TURBO_STREAM_PATTERN = /<\/\s*turbo-stream/io.freeze
  TAIL_PATTERN = /\z/io.freeze

  def initialize(app)
    @app = app
  end

  def call(env)
    @params = env["turbo_boost_command_params"]
    response = @app.call(env)
    return modify!(env, response) if modify?(env)
    response
  end

  private

  def modify?(env)
    env["turbo_boost_command_responder"].is_a? TurboBoost::Commands::Responder
  end

  def modify!(env, response)
    responder = env["turbo_boost_command_responder"]
    status, headers, body = response
    new_body = body_to_s(body)

    case response_type(new_body)
    when :body
      match = new_body.match(BODY_PATTERN).to_s
      new_body.sub! BODY_PATTERN, [responder.body, match].join
    when :frame
      match = new_body.match(TURBO_FRAME_PATTERN).to_s
      new_body.sub! TURBO_FRAME_PATTERN, [responder.body, match].join
    else
      new_body << responder.body
    end

    [status, headers.merge(responder.headers), [new_body]]
  rescue => error
    Rails.logger.error "TurboBoost::Commands::Runner failed to append to the response! #{error.message}"
    [status, headers, body]
  end

  def body_to_s(body)
    return body.join if body.respond_to?(:join)
    return body.to_ary.join if body.respond_to?(:to_ary)
    body.to_s
  end

  def response_type(body)
    return :body if body.match?(BODY_PATTERN)
    return :frame if body.match?(TURBO_FRAME_PATTERN)
    return :stream if body.match?(TURBO_STREAM_PATTERN)
    :unknown
  end
end
