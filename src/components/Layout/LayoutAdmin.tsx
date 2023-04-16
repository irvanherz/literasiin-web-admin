import {
  BookOutlined,
  FileImageOutlined, HomeFilled, LeftOutlined, RightOutlined, SettingOutlined, UserOutlined
} from '@ant-design/icons'
import { Breadcrumb, Button, Layout, Menu, MenuProps, Space, theme } from 'antd'
import { NewBreadcrumbProps } from 'antd/es/breadcrumb/Breadcrumb'
import useAuthContext from 'hooks/useAuthContext'
import { ReactNode, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import ProfileMenu from './ProfileMenu'

function UserMenu () {
  const auth = useAuthContext()
  return auth.status === 'authenticated'
    ? (
      <Space>
        <ProfileMenu><Button shape='round' icon={<UserOutlined />}>Menu</Button></ProfileMenu>
      </Space>
      )
    : (
      <Link to="/auth/signin">
        <Button>Sign in</Button>
      </Link>
      )
}

const StyledLayout = styled(Layout)`
min-height: 100vh;
.ant-layout-sider {

}
.standard-layout-menu {
  display: flex;
  flex-direction: column;
  height: inherit;
  .standard-layout-menu-1 {
    flex: 1;
  }
  .standard-layout-menu-2 {
    flex: 0;
    position: sticky;
    bottom: 0;
  }
}
.standard-layout-menu-main {
  padding: 8px;
  position: sticky;
  top: 0;
}
.standard-layout-menu-toggler {
  height: 32px;
  background: rgba(255,255,255,0.1);
  border: none;
  cursor: pointer;
  display: block;
  width: 100%;
  color: #FFF;
}
.standard-layout-header {
  display: flex;
  .standard-layout-header-1 {
    flex: 1
  }
  .standard-layout-header-2 {
    flex: 0;
    padding-left: 8px;
  }
}
`

const LayoutBody = styled(Layout.Content)`
  margin: 24px 16px;
  .layout-breadcrumb {
    padding: 12px 24px;
  }
  .layout-content {
    min-height: 280px;
    .layout-content-applet {
      padding: 24px;
      border-bottom: 1px;
    }
    .layout-content-body {
      padding: 24px;
    }
  }
`

type LayoutAdminProps = {
  children: ReactNode
  headerExtra?: ReactNode
  applet?: ReactNode
  breadcrumb?: NewBreadcrumbProps['items']
  menuProps?: MenuProps
}

export default function LayoutAdmin ({ children, headerExtra, applet, breadcrumb, menuProps }: LayoutAdminProps) {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, colorBorder }
  } = theme.useToken()

  const handleToggleCollapseMenu = () => setCollapsed(!collapsed)

  const MENU_ITEMS: MenuProps['items'] = [
    {
      key: 'home',
      icon: <HomeFilled />,
      label: 'Home',
      onClick: () => navigate('/')
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: 'Users',
      onClick: () => navigate('/users')
    },
    {
      key: 'media',
      icon: <FileImageOutlined />,
      label: 'Media',
      onClick: () => navigate('/media')
    },
    // {
    //   key: 'publications',
    //   icon: <BookOutlined />,
    //   label: 'Publications',
    //   onClick: () => navigate('/publications')
    // },
    {
      key: 'stories',
      icon: <BookOutlined />,
      label: 'Stories',
      children: [
        {
          key: 'stories.items',
          icon: <BookOutlined />,
          label: 'Stories',
          onClick: () => navigate('/stories')
        },
        {
          key: 'stories.categories',
          icon: <BookOutlined />,
          label: 'Categories',
          onClick: () => navigate('/stories/categories')
        }
      ]
    },
    {
      key: 'articles',
      icon: <BookOutlined />,
      label: 'Articles',
      children: [
        {
          key: 'articles.items',
          icon: <BookOutlined />,
          label: 'Articles',
          onClick: () => navigate('/articles')
        },
        {
          key: 'articles.categories',
          icon: <BookOutlined />,
          label: 'Categories',
          onClick: () => navigate('/articles/categories')
        }
      ]
    },
    {
      key: 'kbs',
      icon: <BookOutlined />,
      label: 'Knowledge Bases',
      children: [
        {
          key: 'kbs.items',
          icon: <BookOutlined />,
          label: 'Knowledge Bases',
          onClick: () => navigate('/kbs')
        },
        {
          key: 'kbs.categories',
          icon: <BookOutlined />,
          label: 'Categories',
          onClick: () => navigate('/kbs/categories')
        }
      ]
    },
    {
      key: 'configurations',
      icon: <SettingOutlined />,
      label: 'Configurations',
      onClick: () => navigate('/configurations')
    }
  ]

  const itemRender: NewBreadcrumbProps['itemRender'] = (route: any, params, routes, paths) => {
    return <Link to={paths.join('/')}>{route.title}</Link>
  }

  return (
    <StyledLayout>
      <Layout.Sider width={300} trigger={null} collapsible collapsed={collapsed}>
        <div className='standard-layout-menu'>
          <div className='standard-layout-menu-1'>
            <Menu
              className='standard-layout-menu-main'
              theme="dark"
              mode="inline"
              items={MENU_ITEMS}
              {...menuProps}
            />
          </div>
          <div className='standard-layout-menu-2'>
            <button className='standard-layout-menu-toggler' onClick={handleToggleCollapseMenu}>{collapsed ? <RightOutlined /> : <LeftOutlined />}</button>
          </div>
        </div>
      </Layout.Sider>
      <Layout className="site-layout">
        <Layout.Header style={{ background: colorBgContainer }} className='standard-layout-header'>
          <div className='standard-layout-header-1'>{headerExtra}</div>
          <div className='standard-layout-header-2'>
            <UserMenu />
          </div>
        </Layout.Header>
        <LayoutBody>
          <Space direction='vertical' style={{ width: '100%' }}>
            {!!breadcrumb && <div className='layout-breadcrumb' style={{ background: colorBgContainer }}><Breadcrumb items={breadcrumb} itemRender={itemRender} /></div>}
            <div style={{ width: '100%', background: colorBgContainer }} className='layout-content'>
              {!!applet && <div className='layout-content-applet' style={{ borderBottom: `1px solid ${colorBorder}` }}>{applet}</div>}
              {!!children && <div className='layout-content-body'>{children}</div>}
            </div>
          </Space>
        </LayoutBody>
      </Layout>
    </StyledLayout>
  )
}
