# frozen_string_literal: true

# Being extra cautious with cookie size by targeting a max of 4 kilobytes
# for all cookies as the lowest common denominator.
#
# SEE: http://browsercookielimits.iain.guru/
# SEE: https://stackoverflow.com/questions/52203972/maximum-cookie-size-of-current-browsers-year-2018
#

TurboReflex::StateManager.cookie_max_bytesize = 1.kilobyte # defaults to 2.kilobytes
