# frozen_string_literal: true

# require_relative "../state"
# require_relative "provisional_state"

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
class TurboBoost::State::Manager
  # include ActiveModel::Dirty

  # class << self
  # def state_override_blocks
  # @state_overrides ||= {}
  # end

  # def add_state_override_block(controller_name, block)
  # state_override_blocks[controller_name] = block
  # end

  # def state_override_block(controller)
  # return nil if state_override_blocks.blank?
  # ancestor = controller.class.ancestors.find { |a| state_override_blocks[a.name] }
  # state_override_blocks[ancestor.name]
  # end
  # end

  # attr_reader :state
  # attr_reader :controller, :header_data, :server_data

  ## For ActiveModel::Dirty tracking
  # define_attribute_methods :state

  # def initialize(controller)
  # @controller = controller

  # begin
  # @state = TurboBoost::State.new
  # rescue => error
  # Rails.logger.error "Failed to construct TurboBoost::State! #{error.message}"
  # @state = TurboBoost::State.new
  # end

  ## State the server used to render the page last time

  ## State managed by the server on the backend (redis cache etc.)
  ## SEE: `TurboBoost::State::Manager.state_override_block`
  # server_state_hash = {}

  ## State the client expects... related to optimistic UI updates
  ## i.e. Changes made on the client before making this request
  # header_state_hash = {}

  ## Apply server state overrides (i.e. state stored in databases like Redis, Postgres, etc...)
  # if TurboBoost::Commands.config.apply_server_state_overrides
  # begin
  # state_override_block = self.class.state_override_block(controller)
  # if state_override_block
  # server_state_hash = controller.instance_eval(&state_override_block).with_indifferent_access
  # server_state_hash.each { |key, val| self[key] = val }
  # end
  # rescue => error
  # Rails.logger.error "Failed to apply `state_override_block` configured in #{controller.class.name} to TurboBoost::State! #{error.message}"
  # end
  # end

  ## Apply client state overrides (i.e. optimistic state)
  ## NOTE: Client state HTTP headers are only sent if/when state has changed on the client (only the changes are sent).
  ##       This prevents race conditions (state mismatch) caused when frame and XHR requests emit immediately
  ##       before the <meta id="turbo-boost"> has been updated with the latest state from the server.
  # if TurboBoost::Commands.config.apply_client_state_overrides
  # begin
  # header_state_hash = TurboBoost::State.deserialize_base64(header).with_indifferent_access
  # header_state_hash.each { |key, val| self[key] = val }
  # rescue => error
  # Rails.logger.error "Failed to apply client state from HTTP headers to TurboBoost::State! #{error.message}"
  # end
  # end

  # @header_data = header_state_hash
  # @server_data = server_state_hash
  # rescue => error
  # Rails.logger.error "Failed to construct TurboBoost::State! #{error.message}"
  # ensure
  # @state ||= TurboBoost::State.new
  # end

  # delegate :cache_key, to: :state

  # def [](*keys, default: nil)
  # state.read(*keys, default: default)
  # end

  # def []=(*keys, value)
  # state_will_change! if value != self[*keys]
  # value.nil? ? state.delete(*keys) : state.write(*keys, value)
  # end

  # def provisional_state
  # @provisional_state ||= TurboBoost::State::ProvisionalState.new(self)
  # end

  # alias_method :now, :provisional_state

  # def clear
  # provisional_state.clear
  # state.clear
  # end

  # def payload
  # provisional_state.clear
  # state.shrink!
  # state.payload
  # end

  # private

  # def headers
  # controller.request.headers.select { |(key, _)| key.match?(/TURBOBOOST_STATE/i) }.sort
  # end

  ## State that exists on the client.
  # def header
  # headers.map(&:last).join
  # end
end
