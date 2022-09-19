# frozen_string_literal: true

class RpcOverHttpReflex < TurboReflex::Base
  def perform
    requested = render(partial: "components/stat", locals: {id: "stat-reflex-requested", title: "RPC Requested", value: "TRUE", value_class: "text-success"})
    performed = render(partial: "components/stat", locals: {id: "stat-reflex-performed", title: "RPC Performed", value: "TRUE", value_class: "text-success"})

    # turbo_streams << turbo_stream.invoke("outerHTML =", args: [requested], selector: "#stat-reflex-requested")
    # turbo_streams << turbo_stream.invoke("outerHTML =", args: [performed], selector: "#stat-reflex-performed")

    turbo_streams << turbo_stream.invoke("console.log", args: ["You just performed an RPC call over HTTP! #{SecureRandom.alphanumeric(4)}"])
  end
end
