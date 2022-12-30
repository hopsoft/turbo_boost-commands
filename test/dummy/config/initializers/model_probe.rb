# frozen_string_literal: true

require "model_probe"

ActiveRecord::Base.extend ModelProbe if Rails.env.development?
