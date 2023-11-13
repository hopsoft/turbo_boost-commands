# frozen_string_literal: true

module BasicCommandsHelper
  def padded_number(count)
    prefix = "-" if count.negative?
    value = count.abs.to_s.rjust(4, "0")
    "#{prefix}#{value}"
  end
end
