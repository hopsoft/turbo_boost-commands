# frozen_string_literal: true

class TurboBoost::Commands::Responder
  attr_accessor :headers

  def initialize
    @headers = HashWithIndifferentAccess.new
    @body = Set.new
  end

  def body
    @body.join
  end

  def add_header(key, value)
    headers[key.to_s.downcase] = value.to_s
  end

  def add_content(content)
    @body << sanitizer.sanitize(content.to_s).html_safe
  end

  private

  def sanitizer
    TurboBoost::Commands::Sanitizer.instance
  end
end
