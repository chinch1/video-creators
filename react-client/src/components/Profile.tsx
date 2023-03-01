import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCreator } from '../services/creators/getCreator'
import { retrieveSession } from '../utils/retrieveSesion'
import NavBar from './NavBar'

const Profile = () => {
  const navigate = useNavigate()
  const [creatorData, setCreatorData] = useState({
    id: '',
    name: '',
    type: '',
    photo: '',
    email: '',
    createdAt: '',
    updatedAt: '',
  })
  const [errorMessage, setErrorMessage] = useState('')

  // Check if user is logged in
  const creatorSession = retrieveSession()

  // Fetching creator
  useEffect(() => {
    const dataFetch = async () => {
      const onError = (error: any) => setErrorMessage(error)

      const creator = await getCreator(
        creatorSession.token,
        creatorSession.creatorId,
        onError
      )

      setCreatorData(creator)
    }

    dataFetch()
  }, [creatorSession.creatorId, creatorSession.id, creatorSession.token])
  return (
    <div>
      <NavBar profileImage={creatorData.photo} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h1
            style={{
              textAlign: 'center',
            }}
          >
            Creator Profile
          </h1>
          <ul>
            <li>
              <b>Name:</b> {creatorData.name}
            </li>
            <li>
              <b>Creator Id:</b> {creatorData.id}
            </li>
            <li>
              <b>Creator Type:</b> {creatorData.type}
            </li>

            <li>
              <b>email:</b> {creatorData.email}
            </li>
            <li>
              <b>Created At:</b> {creatorData.createdAt}
            </li>
            <li>
              <b>Updated At:</b> {creatorData.updatedAt}
            </li>
          </ul>
        </div>
        <div>
          <img alt={creatorData.photo} src={creatorData.photo} />
        </div>

        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  )
}
export default Profile
