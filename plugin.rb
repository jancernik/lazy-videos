# frozen_string_literal: true

# name: lazy-videos
# about: Lazy loads emeded videos
# version: 1.0.0
# authors:
# url:

hide_plugin if self.respond_to?(:hide_plugin)

register_asset "stylesheets/lazy-videos.scss"
register_asset "stylesheets/lazy-videos_mobile.scss", :mobile

require_relative "lib/lazy-videos/lazy_youtube"
require_relative "lib/lazy-videos/lazy_vimeo"

# after_initialize do

#   on(:reduce_cooked) do |fragment|
#     fragment.css(".lazyYT").each do |yt|
#       begin
#         youtube_id = yt["data-youtube-id"]
#         parameters = yt["data-parameters"]
#         uri = URI("https://www.youtube.com/embed/#{youtube_id}?autoplay=1&#{parameters}")
#         yt.replace %{<p><a href="#{uri.to_s}">https://#{uri.host}#{uri.path}</a></p>}
#       rescue URI::InvalidURIError
#         # remove any invalid/weird URIs
#         yt.remove
#       end
#     end
#   end

# end
