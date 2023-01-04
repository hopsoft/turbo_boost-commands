# frozen_string_literal: true

module TurboBoost::Commands::CommandCallbacks
  extend ActiveSupport::Concern
  include ActiveSupport::Callbacks

  included do
    define_callbacks :perform, skip_after_callbacks_if_terminated: true
  end
end
