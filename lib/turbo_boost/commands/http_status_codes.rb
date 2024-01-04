# frozen_string_literal: true

module TurboBoost::Commands
  HTTP_ABORT_STATUS_CODE = 285 # I-285 is the most congested highway in the US (traffic jams → halt/abort)

  HTTP_STATUS_CODES = Rack::Utils::HTTP_STATUS_CODES.merge(
    HTTP_ABORT_STATUS_CODE => "Abort TurboBoost Command"
  ).freeze

  def self.http_status_code(value)
    return value.to_i unless value.is_a?(String) || value.is_a?(Symbol)
    return value.to_i if value.match?(/\A\d+\z/)

    case value.to_sym
    when :abort_turbo_boost_command then HTTP_ABORT_STATUS_CODE
    else Rack::Utils::SYMBOL_TO_STATUS_CODE[value.to_sym]
    end
  end
end
