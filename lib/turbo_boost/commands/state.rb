# frozen_string_literal: true

class TurboBoost::Commands::State
  def initialize(payload = {})
    payload = payload.to_h
    @store ||= (payload[:unsigned] || {}).with_indifferent_access

    store[:_now] ||= {}
    store[:_page] = payload[:page] || {}
    store[:_signed] = if payload[:signed].present?
      URI::UID.from_sgid(payload[:signed], for: self.class.name)&.decode
    end
    store[:_signed] ||= {}
  end

  delegate_missing_to :store

  def now
    store[:_now]
  end

  def page
    store[:_page]
  end

  def signed
    store[:_signed]
  end

  def cache_key
    "TurboBoost::Commands::State/#{Digest::SHA2.base64digest(to_s)}"
  end

  def to_json
    uid = URI::UID.build(signed, include_blank: false)
    sgid = uid.to_sgid_param(for: self.class.name, expires_in: 2.day)
    {signed: sgid, unsigned: signed}.to_json
  end

  private

  attr_reader :store
end
