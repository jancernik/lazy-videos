# frozen_string_literal: true

require "onebox"

class Onebox::Engine::YoutubeOnebox
  include Onebox::Engine
  alias_method :default_onebox_to_html, :to_html

  def to_html
    if video_id && !params['list']

      size_restricted = [params['width'], params['height']].any?
      video_width = (params['width'] && params['width'].to_i <= 695) ? params['width'] : 690 # embed width
      video_height = (params['height'] && params['height'].to_i <= 500) ? params['height'] : 388 # embed height
      size_tags = ["width=\"#{video_width}\"", "height=\"#{video_height}\""]

      result = parse_embed_response
      result ||= get_opengraph.data

      thumbnail_url = "https://img.youtube.com/vi/#{video_id}/maxresdefault.jpg" || result[:image]
      escaped_title = ERB::Util.html_escape(video_title)

      <<~HTML
      <div class="youtube-onebox lazy-container"
           data-video-id="#{video_id}"
           data-video-title="#{escaped_title}"
           data-provider-name="youtube"
           #{size_restricted ? size_tags.map { |t| "data-#{t}" }.join(' ') : ""}
           data-parameters="#{embed_params}">
        <a href="https://www.youtube.com/watch?v=#{video_id}" target="_blank">
          <img class="youtube-thumbnail"
               src="#{thumbnail_url}"
               title="#{escaped_title}"
               #{size_restricted ? size_tags.join(' ') : ""}>
        </a>
      </div>
      HTML
    else
      default_onebox_to_html
    end
  end

end
