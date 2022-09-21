# frozen_string_literal: true

require "rouge"

module CodeHelper
  def read_source(path, erb: false)
    source = File.read(Rails.root.join(path))
    return source unless erb
    ERB.new(source).result(binding)
  end

  def render_source(source, language:)
    formatter = Rouge::Formatters::HTML.new

    lexer = case language
    when :erb then Rouge::Lexers::ERB.new
    when :html then Rouge::Lexers::HTML.new
    when :javascript then Rouge::Lexers::Javascript.new
    when :json then Rouge::Lexers::JSON.new
    when :ruby then Rouge::Lexers::Ruby.new
    end

    formatter.format(lexer.lex(source)).html_safe
  end
end
