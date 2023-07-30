# frozen_string_literal: true

module LocalCache
  def local_cache
    ActiveSupport::Cache::MemoryStore.new(
      expires_in: 1.minute,
      size: 32.megabytes
    )
  end
end

Rails.extend LocalCache
