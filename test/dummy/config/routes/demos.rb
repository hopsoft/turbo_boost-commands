# frozen_string_literal: true

resource :basic_command, only: [:show]
get "basic_command/demo", to: "basic_commands#demo", as: :basic_command_demo
