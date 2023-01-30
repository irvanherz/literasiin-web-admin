import { Avatar, Card, Drawer, Menu, Space } from 'antd'
import useAuthContext from 'hooks/useAuthContext'
import { cloneElement, ReactElement, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledDrawer = styled(Drawer)`

`

type ProfileMenuProps = {
  children: ReactElement,
}
export default function ProfileMenu ({ children }: ProfileMenuProps) {
  const auth = useAuthContext()
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  const handleSignout = () => {
    auth.setToken(null, null)
  }

  return (
    <>
      { children && cloneElement(children, { onClick: handleClick })}
      <StyledDrawer
        open={open}
        onClose={handleClick}
      >
        <Space direction='vertical' style={{ width: '100%' }}>
          <Card
            size='small'
            actions={[
              <div key='followers'>
                <div>10</div>
                <div>Followers</div>
              </div>,
              <div key='following'>
                <div>10</div>
                <div>Following</div>
              </div>
            ]}
          >
            <Card.Meta
              avatar={<Avatar />}
              // title={user.fullName}
              // description={user.email}
            />
          </Card>
          <Menu
            onClick={handleClick}
            items={[
              {
                key: '/users/me',
                label: <Link to={'/users/me'}>Profile</Link>
              },
              {
                key: '/notifications',
                label: <Link to={'/notifications'}>Notifications</Link>
              },
              {
                key: '/chats',
                label: <Link to={'/chats'}>Messages</Link>
              },
              {
                key: '/users/me/settings',
                label: <Link to={'/users/me/settings'}>Settings</Link>
              },
              {
                key: 'signout',
                label: 'Sign Out',
                onClick: handleSignout
              }
            ]}
          />
        </Space>
      </StyledDrawer>
    </>
  )
}
