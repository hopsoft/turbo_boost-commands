# frozen_string_literal: true

class TurboBoost::Commands::Middleware
  PATH = "/turbo-boost/command"

  def initialize(app)
    @app = app
  end

  def call(env)
    request = Rack::Request.new(env)
    modify! request if modify?(request)
    @app.call env
  end

  private

  def modify?(request)
    return false unless request.post?
    return false unless request.xhr?
    return false unless request.content_type&.downcase&.start_with?("application/json")
    request.path.start_with? PATH
  end

  def modify!(request)
    params = JSON.parse(request.body.string)
    uri = URI.parse(params["src"])

    request.env.tap do |env|
      # Store the command params in the environment
      env["turbo_boost.command"] = params.except("src")

      # Change the method from POST to GET
      env["REQUEST_METHOD"] = "GET"

      # Update the URI, PATH_INFO, and QUERY_STRING
      env["REQUEST_URI"] = uri.to_s if env.key?("REQUEST_URI")
      env["PATH_INFO"] = uri.path
      env["QUERY_STRING"] = uri.query.to_s

      # Clear the body and related headers so the appears and behaves like a GET
      env["rack.input"] = StringIO.new
      env["CONTENT_LENGTH"] = "0"
      env.delete("CONTENT_TYPE")
    end
  end
end
