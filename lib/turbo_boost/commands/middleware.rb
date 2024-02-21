# frozen_string_literal: true

class TurboBoost::Commands::Middleware
  PATH = "/turbo-boost-command-invocation"

  def initialize(app)
    @app = app
  end

  def call(env)
    request = Rack::Request.new(env)
    modify! request if modify?(request)
    @app.call env
  end

  private

  # Returns the MIME type for TurboBoost Command invocations.
  def mime_type
    Mime::Type.lookup_by_extension(:turbo_boost)
  end

  # Indicates whether or not the request is a TurboBoost Command invocation that requires modifications
  # before we hand things over to Rails.
  #
  # @param request [Rack::Request] the request to check
  # @return [Boolean] true if the request is a TurboBoost Command invocation, false otherwise
  def modify?(request)
    return false unless request.post?
    return false unless request.path.start_with?(PATH)
    return false unless mime_type && request.env["HTTP_ACCEPT"]&.include?(mime_type)
    true
  end

  # Modifies the given POST request so Rails sees it as GET.
  #
  # The posted JSON body content holds the TurboBoost Command meta data.
  # The parsed JSON body is stored in the environment under the `turbo_boost_command` key.
  #
  # @example POST payload for: /turbo-boost-command-invocation
  #   {
  #     "id"                => "turbo-command-f824ded1-a86e-4a36-9442-ea2165a64569",                 # unique command invocation id
  #     "name"              => "IncrementCountCommand",                                              # the command being invoked
  #     "elementId"         => nil,                                                                  # the triggering element's dom id
  #     "elementAttributes" => {"tag"=>"BUTTON", "checked"=>false, "disabled"=>false, "value"=>nil}, # the triggering element's attributes
  #     "startedAt"         => 1708213193567,                                                        # the time the command was invoked
  #     "changedState"      => {},                                                                   # the delta of optimistic state changes made on the client
  #     "clientState"       => {                                                                     # the state as it was on the client
  #       "command_token" => "IlU0dVVhNElFdkVCZVUi--a878d33d85ed9b9611c155ed1d7bb8785fb..."}         # the command token used for forgery protection
  #     },
  #     "signedState"       => "eyJfcmFpbHMiOnsiZGF0YSI6ImdpZDovL2R1VuaXZlcnNhbElEOjpFeH...",        # the state as it was on the server at the time of the last command invocation
  #     "driver"            => "frame",                                                              # the driver used to invoke the command
  #     "frameId"           => "basic_command-turbo-frame",                                          # the turbo-frame id (if applicable)
  #     "src"               => "/basic_command.turbo_stream"                                         # the URL to present to Rails (turbo-frame src, window location, etc.)
  #   }
  #
  # @param request [Rack::Request] the request to modify
  def modify!(request)
    params = JSON.parse(request.body.string)
    uri = URI.parse(params["src"])

    request.env.tap do |env|
      # Store the command params in the environment
      env["turbo_boost_command"] = params

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
