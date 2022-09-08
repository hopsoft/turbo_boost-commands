# frozen_string_literal: true

class Users::ProfilesController < ApplicationController
  def show
    @profile = Users::Profile.new(id: 1, name: "David")
  end
end
