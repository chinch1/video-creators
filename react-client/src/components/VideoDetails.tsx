import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getVideo } from '../services/videos/getVideo'
import { retrieveSession } from '../utils/retrieveSesion'
import { youtubeParser } from '../utils/youtubeParser'
import NavBar from './NavBar'
import YoutubeEmbed from './YoutubeEmbed'

const VideoDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [videoData, setVideoData] = React.useState({
    id: '',
    title: '',
    creatorId: '',
    description: '',
    url: '',
    published: '',
    createdAt: '',
    updatedAt: '',
  })
  const [errorMessage, setErrorMessage] = React.useState('')

  // Check if user is logged in
  const creatorSession = retrieveSession()

  // Fetching video
  useEffect(() => {
    const dataFetch = async () => {
      const onError = (error: any) => setErrorMessage(error)
      const video = await getVideo(creatorSession.token, id, onError)
      setVideoData(video)
    }

    dataFetch()
  }, [creatorSession.token, id])

  return (
    <Box>
      <NavBar profileImage={creatorSession.photo} />
      <h1
        style={{
          textAlign: 'center',
        }}
      >
        Video Details
      </h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          gap: '1rem',
        }}
      >
        <ul>
          <li>
            <b>Title:</b> {videoData.title}
          </li>
          <li>
            <b>Video Id:</b> {videoData.id}
          </li>
          <li>
            <b>Creator:</b> {videoData.creatorId}
          </li>
          <li>
            <b>Description:</b> {videoData.description}
          </li>
          <li>
            <b>Url:</b> {videoData.url}
          </li>
          <li>
            <b>Published:</b> {videoData.published ? 'Yes' : 'No'}
          </li>
          <li>
            <b>Created At:</b> {videoData.createdAt}
          </li>
          <li>
            <b>Updated At:</b> {videoData.updatedAt}
          </li>
        </ul>
        <YoutubeEmbed
          videoId={videoData.id}
          videoTitle={videoData.title}
          embedId={youtubeParser(videoData.url)}
        />
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </Box>
  )
}

export default VideoDetails
