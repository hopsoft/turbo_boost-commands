# frozen_string_literal: true

require_relative "state"

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
class TurboReflex::StateManager
  include ActiveModel::Dirty

  class << self
    attr_writer :cookie_max_bytesize

    def cookie_max_bytesize
      @cookie_max_bytesize ||= 2.kilobytes
    end

    def state_override_blocks
      @state_overrides ||= {}
    end

    def add_state_override_block(controller_name, block)
      state_override_blocks[controller_name] = block
    end

    def state_override_block(controller)
      return nil if state_override_blocks.blank?
      ancestor = controller.class.ancestors.find { |a| state_override_blocks[a.name] }
      state_override_blocks[ancestor.name]
    end
  end

  # For ActiveModel::Dirty tracking
  define_attribute_methods :state

  delegate :cookies, to: :runner
  delegate :request, :response, to: :"runner.controller"

  def initialize(runner)
    @runner = runner

    begin
      @state = TurboReflex::State.new(cookie) # server state as stored in the cookie
    rescue => error
      Rails.logger.error "Failed to construct TurboReflex::State! #{error.message}"
      @state = TurboReflex::State.new
    end

    # Apply server state overrides (i.e. state stored in databases like Redis, Postgres, etc...)
    begin
      state_override_block = self.class.state_override_block(runner.controller)
      if state_override_block
        server_data = runner.controller.instance_eval(&state_override_block).with_indifferent_access
        server_data.each { |key, val| self[key] = val }
      end
    rescue => error
      Rails.logger.error "Failed to apply `state_override_block` configured in #{runner.controller.class.name} to TurboReflex::State! #{error.message}"
    end

    # Merge client state into server state (i.e. optimistic state)
    # NOTE: Client state HTTP headers are only sent if/when state has changed on the client (only the changes are sent).
    #       This prevents race conditions (state mismatch) caused when frame and XHR requests emit immediately
    #       before the <meta id="turbo-reflex"> has been updated with the latest state from the server.
    begin
      client_data = TurboReflex::State.deserialize_base64(header).with_indifferent_access
      client_data.each { |key, val| self[key] = val }
    rescue => error
      Rails.logger.error "Failed to apply client state from HTTP headers to TurboReflex::State! #{error.message}"
    end
  end

  delegate :cache_key, :payload, to: :state

  def [](*keys, default: nil)
    state.read(*keys, default: default)
  end

  def []=(*keys, value)
    state_will_change! if value != self[*keys]
    state.write(*keys, value)
  end

  def set_cookie
    return unless changed?
    state.shrink!
    state.prune! max_bytesize: TurboReflex::StateManager.cookie_max_bytesize
    cookies["turbo_reflex.state"] = {value: state.ordinal_payload, path: "/", expires: 1.day.from_now}
    changes_applied
  end

  private

  attr_reader :runner
  attr_reader :state

  def headers
    request.headers.select { |(key, _)| key.match?(/TURBOREFLEX_STATE/i) }.sort
  end

  # State that exists on the client.
  def header
    headers.map(&:last).join
  end

  # State that the server last rendered with.
  def cookie
    cookies["turbo_reflex.state"]
  end
end
