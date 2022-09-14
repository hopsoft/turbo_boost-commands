# frozen_string_literal: true

class RpcOverHttpReflex < TurboReflex::Base
  def perform
    turbo_streams << turbo_stream.invoke("console.log", args: ["You just performed an RPC call over HTTP! #{SecureRandom.alphanumeric(4)}"])
  end
end
