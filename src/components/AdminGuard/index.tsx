import { Button, Result } from 'antd'
import useAuthContext from 'hooks/useAuthContext'
import useCurrentUserContext from 'hooks/useCurrentUserContext'
import { ReactElement } from 'react'

type AdminGuardProps = {
  children: ReactElement
}

export default function AdminGuard ({ children }:AdminGuardProps) {
  const currentUser = useCurrentUserContext()
  const auth = useAuthContext()

  const handleLogout = () => {
    auth.setToken('', '')
  }

  if (currentUser.status !== 'success') {
    return null
  } else if (currentUser.data?.role === 'admin') {
    return children
  } else {
    return (
      <Result
        status='error'
        title="Forbidden"
        subTitle="Only admin allowed to access this page"
        extra={<Button onClick={handleLogout}>Logout</Button>}
    />
    )
  }
}
