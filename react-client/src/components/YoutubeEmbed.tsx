import React from 'react'
import PropTypes from 'prop-types'

const YoutubeEmbed = ({
  videoId,
  embedId,
  videoTitle,
}: {
  videoId: string
  embedId: string
  videoTitle: string
}) => (
  <div>
    <iframe
      key={videoId}
      title={videoTitle}
      width="400"
      height="250"
      src={`https://www.youtube.com/embed/${embedId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
)

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
}

export default YoutubeEmbed
