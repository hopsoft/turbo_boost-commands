# frozen_string_literal: true

module DocsHelper
  def doc_name
    return nil unless controller_name == "docs"
    params[:id]
  end

  def doc_active?(name)
    doc_name == name.to_s
  end

  def docs_active?
    controller_name == "docs" && action_name == "index"
  end
end
