# frozen_string_literal: true

require "rouge"

module CodeHelper
  def read_source(path, erb: false)
    cache_key = "#{path}/#{File.mtime(Rails.root.join(path)).iso8601}"
    source = Rails.cache.fetch(cache_key) { File.read(Rails.root.join(path)) }
    return source unless erb
    ERB.new(source).result(binding)
  end

  def render_source(source, language:)
    formatter = Rouge::Formatters::HTML.new

    lexer = case language
    when :bash, :sh, :shell then Rouge::Lexers::Shell.new
    when :erb then Rouge::Lexers::ERB.new
    when :htm, :html then Rouge::Lexers::HTML.new
    when :js, :javascript then Rouge::Lexers::Javascript.new
    when :json then Rouge::Lexers::JSON.new
    when :rb, :ruby then Rouge::Lexers::Ruby.new
    end

    formatter.format(lexer.lex(source)).html_safe
  end
end
