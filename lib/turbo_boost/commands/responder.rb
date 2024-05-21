# frozen_string_literal: true

class TurboBoost::Commands::Responder
  attr_accessor :headers

  def initialize
    @headers = HashWithIndifferentAccess.new
    @body = Set.new
  end

  def body
    @body.join.html_safe
  end

  def add_header(key, value)
    headers[key.to_s.downcase] = value.to_s
  end

  def add_content(content)
    @body << sanitizer.sanitize(content) + "\n"
  end

  private

  def sanitizer
    TurboBoost::Commands::Sanitizer.instance
  end
end
