import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, IconButton, Tooltip, Zoom } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

import NavBar from './NavBar'
import { retrieveSession } from '../utils/retrieveSesion'
import { getVideos } from '../services/videos/getVideos'
import { youtubeParser } from '../utils/youtubeParser'
import { getCreator } from '../services/creators/getCreator'
import likeVideo from '../services/creators/likeVideo'

const FollowingVideos = () => {
  const navigate = useNavigate()
  const reload = () => window.location.reload()

  const [errorMessage, setErrorMessage] = React.useState('')
  const [videosData, setVideosData] = React.useState([])
  const [creatorData, setCreatorData] = React.useState({
    id: '',
    following: [],
    likedVideos: [],
  })

  // Check if user is logged in
  const creatorSession = retrieveSession()

  useEffect(() => {
    const dataFetch = async () => {
      const onError = (error: any) => setErrorMessage(error)
      // Fetching videos
      const videos = await getVideos(creatorSession.token, onError)

      // Fetching creator data
      const creator = await getCreator(
        creatorSession.token,
        creatorSession.creatorId,
        onError
      )
      setVideosData(videos)
      setCreatorData(creator)
    }
    dataFetch()
  }, [creatorSession.creatorId, creatorSession.token])

  const handleLikeOrUnlike = async (videoId: string, likeOrUnlike: boolean) => {
    const onError = (error: any) => setErrorMessage(error)
    const likeResponse = await likeVideo(
      videoId,
      creatorSession,
      likeOrUnlike,
      onError
    )
    if (likeResponse) reload()
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <NavBar profileImage={creatorSession.photo} />

      <ul
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '1rem',
          listStyleType: 'none',
          padding: 0,
          margin: 0,
        }}
      >
        {videosData
          .filter((video: any) =>
            creatorData.following.some(
              (creator: any) => creator.id === video.creatorId
            )
          )
          .map((video: any) => (
            <Box key={video.id}>
              <Box display="flex" flexDirection={'row'} margin="auto">
                <Box
                  display="flex"
                  flexDirection={'column'}
                  margin="auto"
                  padding={1}
                  borderRadius={2}
                  boxShadow={'5px 5px 5px #ccc'}
                  sx={{
                    ':hover': {
                      boxShadow: '10px 10px 20px 10px #ccc',
                    },
                  }}
                  onClick={() => navigate(`/video-details/${video.id}`)}
                >
                  <h2 style={{ textAlign: 'center' }}>{video.title}</h2>
                  <img
                    src={`https://img.youtube.com/vi/${youtubeParser(
                      video.url
                    )}/0.jpg`}
                    alt={video.title}
                    width="200"
                  ></img>
                </Box>
                <Box>
                  {creatorData.likedVideos.some(
                    (videoData: any) => videoData.id === video.id
                  ) ? (
                    <Tooltip title="Unlike" TransitionComponent={Zoom}>
                      <IconButton
                        color="error"
                        aria-label="liked video"
                        onClick={() => handleLikeOrUnlike(video.id, false)}
                      >
                        <FavoriteIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Like" TransitionComponent={Zoom}>
                      <IconButton
                        color="warning"
                        aria-label="not liked video"
                        onClick={() => handleLikeOrUnlike(video.id, true)}
                      >
                        <FavoriteBorderIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Box>
            </Box>
          ))}
      </ul>

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  )
}

export default FollowingVideos
