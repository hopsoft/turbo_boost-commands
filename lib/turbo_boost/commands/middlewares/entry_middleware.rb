# frozen_string_literal: true

require "device_detector"

class TurboBoost::Commands::EntryMiddleware
  PATH = "/turbo-boost-command-invocation"
  PARAM = "turbo_boost_command"

  def initialize(app)
    @app = app
  end

  def call(env)
    request = Rack::Request.new(env)

    # a command was not requested, pass through and exit early
    return @app.call(env) unless command_request?(request)

    # a command was requested
    return [403, {"Content-Type" => "text/plain"}, ["Forbidden"]] if untrusted_client?(request)
    modify_request!(request) if modify_request?(request)
    @app.call env
  end

  private

  def mime_type
    @mime_type ||= Mime::Type.lookup_by_extension(:turbo_boost)
  end

  # Indicates if the client's user agent is trusted (i.e. known and not a bot)
  #
  # @param request [Rack::Request] the request to check
  # @return [Boolean]
  def trusted_client?(request)
    client = DeviceDetector.new(request.env["HTTP_USER_AGENT"])
    return false unless client.known?
    return false if client.bot?
    true
  rescue => error
    puts "#{self.class.name} failed to determine if the client is valid! #{error.message}"
    false
  end

  # Indicates if the client's user agent is untrusted (i.e. unknown or a bot)
  #
  # @param request [Rack::Request] the request to check
  # @return [Boolean]
  def untrusted_client?(request)
    !trusted_client?(request)
  end

  # Indicates if the request is invoking a TurboBoost Command.
  #
  # @param request [Rack::Request] the request to check
  # @return [Boolean]
  def command_request?(request)
    return false unless request.post?
    return false unless request.path.start_with?(PATH) || request.params.key?(PARAM)
    true
  end

  # The TurboBoost Command params.
  #
  # @param request [Rack::Request] the request to extract the params from
  # @return [Hash]
  def command_params(request)
    return {} unless command_request?(request)
    return request.params[PARAM] if request.params.key?(PARAM)
    JSON.parse(request.body.string)
  end

  # Indicates whether or not the request is a TurboBoost Command invocation that requires modifications
  # before we hand things over to Rails.
  #
  # @note The form and method drivers DO NOT modify the request;
  #       instead, they let Rails mechanics handle the request as normal.
  #
  # @param request [Rack::Request] the request to check
  # @return [Boolean] true if the request is a TurboBoost Command invocation, false otherwise
  def modify_request?(request)
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
  #     "csrfToken"         => "..."                                                 # Rails' CSRF token
  #     "id"                => "turbo-command-f824ded1-a86e-4a36-9442-ea2165a64569", # Unique ID for the command invocation
  #     "name"              => "ExampleCommand#perform",                             # Name of command being invoked
  #     "elementId"         => nil,                                                  # Triggering element's DOM id
  #     "elementAttributes" => {...},                                                # Triggering element's attributes
  #     "startedAt"         => 1708213193567,                                        # Time the command was invoked
  #     "elementCache"      => {...},                                                # Cache of ALL tracked element attributes (optimistic changes)
  #     "state"             => {                                                     # State ... TODO: HOPSOFT
  #       "page"            => {...},                                                # - transient page state (element attributes, etc.)
  #       "signed"          => "",                                                   # - signed state used for the last server render (untampered)
  #       "unsigned"        => {...}                                                 # - state with optimistic changes from the client
  #     },
  #     "driver"            => "frame",                                              # Driver used to invoke the command
  #     "frameId"           => "...",                                                # TurboFrame id (if applicable)
  #     "src"               => "..."                                                 # URL to present to Rails (turbo-frame src, window location, etc.)
  #   }
  #
  # @param request [Rack::Request] the request to modify
  def modify_request!(request)
    params = command_params(request)
    uri = URI.parse(params["src"])

    request.env.tap do |env|
      # Store the command params in the environment
      env["turbo_boost_command_params"] = params

      # Change URI and path
      env["REQUEST_URI"] = uri.to_s if env.key?("REQUEST_URI")
      env["REQUEST_PATH"] = uri.path
      env["PATH_INFO"] = begin
        script_name = Rails.application.config.relative_url_root
        path_info = uri.path.sub(/^#{Regexp.escape(script_name.to_s)}/, "")
        path_info.empty? ? "/" : path_info
      end

      # Change query string
      env["QUERY_STRING"] = uri.query.to_s
      env.delete("rack.request.query_hash")

      # Clear form data
      env.delete("rack.request.form_input")
      env.delete("rack.request.form_hash")
      env.delete("rack.request.form_vars")
      env.delete("rack.request.form_pairs")

      # Clear the body so we can change the the method to GET
      env["rack.input"] = StringIO.new
      env["CONTENT_LENGTH"] = "0"
      env["content-length"] = "0"
      env.delete("CONTENT_TYPE")
      env.delete("content-type")

      # Change the method to GET
      env["REQUEST_METHOD"] = "GET"
    end
  rescue => error
    puts "#{self.class.name} failed to modify the request! #{error.message}"
  end
end
