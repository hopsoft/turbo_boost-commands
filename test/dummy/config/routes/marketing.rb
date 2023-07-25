# frozen_string_literal: true

resource :features, only: [:show]
resource :todos, only: [:show]
root "features#show"
