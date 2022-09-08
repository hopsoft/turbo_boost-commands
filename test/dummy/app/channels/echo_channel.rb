# frozen_string_literal: true

class EchoChannel < ApplicationCable::Channel
  extend Turbo::Streams::StreamName
  extend Turbo::Streams::Broadcasts
  include Turbo::Streams::StreamName::ClassMethods

  def subscribed
    if (stream_name = verified_stream_name_from_params).present?
      stream_from stream_name
      message = Message.new(content: params[:message])
      message.broadcast_append_to stream_name, target: :messages
    else
      reject
    end
  end
end
