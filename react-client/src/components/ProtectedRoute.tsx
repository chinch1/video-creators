import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({
  creatorSession,
  childrenComponent,
}: {
  creatorSession: any
  childrenComponent: JSX.Element
}) => {
  if (!creatorSession) {
    return <Navigate to="/login" replace />
  }

  return childrenComponent
}

export default ProtectedRoute
