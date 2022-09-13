# frozen_string_literal: true

class TurboReflex::Sanitizer
  include Singleton
  include ActionView::Helpers::SanitizeHelper

  attr_reader :scrubber

  def sanitize(value)
    super value, scrubber: scrubber
  end

  private

  def initialize
    @scrubber = Loofah::Scrubber.new do |node|
      node.remove if node.name == "script"
    end
  end
end
