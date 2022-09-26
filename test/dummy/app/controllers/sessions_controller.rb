class SessionsController < ApplicationController
  def destroy
    session.clear
    redirect_to request.referrer
  end
end
