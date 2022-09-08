# frozen_string_literal: true

class Message < ApplicationRecord
  def to_s
    content
  end
end
