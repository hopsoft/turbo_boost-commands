# frozen_string_literal: true

Rails.application.config.tap do |config|
  config.active_record.maintain_test_schema = false

  config.after_initialize do
    ActiveRecord::Base.connection.migration_context.tap do |context|
      if context.migrations.blank?
        path = Rails.root.join("db/migrate").to_s
        context.migrations_paths << path unless context.migrations_paths.include?(path)
      end
      context.migrate
      context.migrations_paths.clear
    end
  end
end
