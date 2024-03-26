# frozen_string_literal: true

class TurboBoost::Commands::EntryMiddleware
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
  rescue => error
    puts "#{self.class.name} failed to determine if the request should be modified! #{error.message}"
    false
  end

  # Modifies the given POST request so Rails sees it as GET.
  #
  # The posted JSON body content holds the TurboBoost Command meta data.
  # The parsed JSON body is stored in the environment under the `turbo_boost_command` key.
  #
  # @example POST payload for: /turbo-boost-command-invocation
  #   {
  #     "id"                => "turbo-command-f824ded1-a86e-4a36-9442-ea2165a64569", # Unique ID for the command invocation
  #     "name"              => "ExampleCommand#perform",                             # Name of command being invoked
  #     "elementId"         => nil,                                                  # Triggering element's DOM id
  #     "elementAttributes" => {...},                                                # Triggering element's attributes
  #     "startedAt"         => 1708213193567,                                        # Time the command was invoked
  #     "elementCache"      => {...},                                                # Cache of ALL tracked element attributes (optimistic changes)
  #     "state"             => {                                                     # State ... TODO: HOPSOFT
  #       "signed"          => "",                                                   # - ...
  #       "unsigned"        => {...}                                                 # - ...
  #     },
  #     "driver"            => "frame",                                              # Driver used to invoke the command
  #     "frameId"           => "...",                                                # TurboFrame id (if applicable)
  #     "src"               => "..."                                                 # URL to present to Rails (turbo-frame src, window location, etc.)
  #   }
  #
  # @param request [Rack::Request] the request to modify
  def modify!(request)
    params = JSON.parse(request.body.string)
    uri = URI.parse(params["src"])

    request.env.tap do |env|
      # Store the command params in the environment
      env["turbo_boost_command_params"] = params

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
  rescue => error
    puts "#{self.class.name} failed to modify the request! #{error.message}"
  end
end
