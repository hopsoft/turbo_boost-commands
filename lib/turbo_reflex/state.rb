# frozen_string_literal: true

require_relative "cargo"

# Class used to hold ephemeral state related to the rendered UI.
#
# Examples:
#
# - Sidebar open/closed state
# - Tree view open/closed state
# - Accordion collapsed/expanded state
# - Customized layout / presentation
# - Applied data filters
# - Number of data rows to display etc.
#
class TurboReflex::State
  include ActiveModel::Dirty

  # For ActiveModel::Dirty tracking
  define_attribute_methods :cargo

  delegate :request, :response, to: :"runner.controller"

  def initialize(runner)
    @runner = runner
    @cargo = TurboReflex::Cargo.new(cookie) # server state as stored in the cookie

    # Merge client state into server state (i.e. optimistic state)
    # NOTE: This is currently problematic when using lazily loaded Turbo Frames because of a race condition.
    #       The browser applies the cookie immediately then emits a Turbo Frame request with the correct cookie
    #       but this happens before Turbo Streams can update the <meta id="turbo-reflex"> tag with the latest
    #       state so the previous state is sent with the request.
    #
    #       One possible solution is to only send client state stored in <meta id="turbo-reflex"> when it has been changed.
    #       We currently use a Proxy to make client state observable, so this should be a reasonable option.
    # client_state = TurboReflex::Cargo.deserialize_base64(header)
    # client_state.each do |key, value|
    #  cargo.write key, value if value && value != cargo.read(key)
    # end
  end

  delegate :cache_key, :payload, to: :cargo

  def [](*keys, default: nil)
    cargo.read(*keys, default: default)
  end

  def []=(*keys, value)
    cargo_will_change! if value != self[*keys]
    cargo.write(*keys, value)
  end

  def set_cookie
    return unless changed?
    cargo.shrink!
    cargo.prune!
    response.set_cookie "_turbo_reflex_state", value: cargo.ordinal_payload, path: "/", expires: 1.day.from_now
    changes_applied
  end

  private

  attr_reader :runner
  attr_reader :cargo

  def headers
    request.headers.select { |(key, _)| key.match?(/TURBOREFLEX_STATE/i) }.sort
  end

  # State that exists on the client.
  def header
    headers.map(&:last).join
  end

  # State that the server last rendered with.
  def cookie
    request.cookies["_turbo_reflex_state"]
  end
end
