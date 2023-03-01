import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Icon, IconButton, Tooltip, Zoom } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled'

import NavBar from './NavBar'
import { retrieveSession } from '../utils/retrieveSesion'
import { getVideos } from '../services/videos/getVideos'
import { youtubeParser } from '../utils/youtubeParser'
import { getCreator } from '../services/creators/getCreator'
import likeVideo from '../services/creators/likeVideo'
import creatorFollow from '../services/creators/followCreator'

const Dashboard = () => {
  const navigate = useNavigate()
  const reload = () => window.location.reload()

  const [errorMessage, setErrorMessage] = React.useState('')
  const [videosData, setVideosData] = React.useState([])
  const [creatorData, setCreatorData] = React.useState({
    id: '',
    likedVideos: [],
    following: [],
  })

  // Check if user is logged in
  const creatorSession = retrieveSession()

  useEffect(() => {
    // Fetching videos
    const dataFetch = async () => {
      const onError = (error: any) => setErrorMessage(error)
      const videos = await getVideos(creatorSession.token, onError)
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
    await likeVideo(videoId, creatorSession, likeOrUnlike, onError)
    reload()
  }

  const handleFollowOrUnfollow = async (
    creatorToFollowId: string,
    followOrUnfollow: boolean
  ) => {
    const onError = (error: any) => setErrorMessage(error)
    const response = await creatorFollow(
      creatorToFollowId,
      followOrUnfollow,
      creatorSession,
      onError
    )
    if (response) reload()
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
        {videosData.map((video: any) => (
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
              <Box display={'flex'} flexDirection={'column'}>
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
                {creatorData.id === video.creatorId ? (
                  // <Tooltip title="empty">
                  //   <IconButton disabled>
                  //     <Icon></Icon>
                  //   </IconButton>
                  // </Tooltip>
                  <span />
                ) : creatorData.following.some(
                    (creator: any) => creator.id === video.creatorId
                  ) ? (
                  <Tooltip title="Unfollow" TransitionComponent={Zoom}>
                    <IconButton
                      color="error"
                      aria-label="followed creator"
                      onClick={() =>
                        handleFollowOrUnfollow(video.creatorId, false)
                      }
                    >
                      <PersonAddDisabledIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Follow" TransitionComponent={Zoom}>
                    <IconButton
                      color="primary"
                      aria-label="unfollowed creator"
                      onClick={() =>
                        handleFollowOrUnfollow(video.creatorId, true)
                      }
                    >
                      <PersonAddIcon />
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

export default Dashboard
