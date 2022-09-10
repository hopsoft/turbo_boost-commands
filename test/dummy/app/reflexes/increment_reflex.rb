# frozen_string_literal: true

class IncrementReflex < TurboReflex::Base
  def increment
    controller.instance_variable_set :@value, element.data_value.to_i + 1

    # controller.render html: "<turbo-frame id='increment'><h1>We Hijacked the normal response!</h1></turbo-frame>".html_safe
  end

  def form_increment
    controller.instance_variable_set :@value, element.data_value.to_i + 1
    turbo_streams << turbo_stream.invoke("console.log", args: ["You submitted the increment form! #{SecureRandom.base64[0, 8]}"])
    # turbo_streams << turbo_stream.append("form-increment", html: "<p>You submitted the increment form! #{SecureRandom.base64[0, 8]}</p>".html_safe)

    # controller.render html: "<turbo-frame id='increment'><h1>We Hijacked the Form response!</h1></turbo-frame>".html_safe
  end
end
