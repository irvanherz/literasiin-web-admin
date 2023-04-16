import { Space, Tabs } from 'antd'
import AdminGuard from 'components/AdminGuard'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import { titleCase } from 'libs/common'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import UsersService from 'services/Users'
import UserEditTab from './UserEditTab'
import UserIdentitesTab from './UserIdentitesTab'
import UserStoriesTab from './UserStoriesTab'
import UserSummaryTab from './UserSummaryTab'
import UserWalletsTab from './UserWalletsTab'

export default function ManageUserDetails () {
  const params = useParams()
  const userId = +(params?.userId || 0)
  const navigate = useNavigate()
  const sectionId = params?.sectionId || 'summary'
  const { data, refetch } = useQuery(`users[${userId}]`, () => UsersService.findById(userId))
  const user: any = data?.data

  const handleChangeSection = (s: string) => {
    navigate(`/users/${userId}/${s}`, { replace: true })
  }

  return (
    <RouteGuard require='authenticated'>
      <AdminGuard>
        <Layout.Admin
          menuProps={{ selectedKeys: ['users'] }}
          breadcrumb={[
            { title: 'Home', path: '/' },
            { title: 'Users', path: '/users' },
            { title: user?.fullName, path: `/${user?.id}` },
            { title: titleCase(sectionId || ''), path: `/${sectionId}` }
          ]}
        >
          <Space direction='vertical' style={{ width: '100%' }}>
            <Tabs activeKey={sectionId} onChange={handleChangeSection}>
              <Tabs.TabPane key='summary' tab="Summary"><UserSummaryTab user={user} /></Tabs.TabPane>
              <Tabs.TabPane key='edit' tab="Edit"><UserEditTab user={user} afterUpdated={refetch}/></Tabs.TabPane>
              <Tabs.TabPane key='identities' tab="Identities"><UserIdentitesTab user={user} /></Tabs.TabPane>
              <Tabs.TabPane key='stories' tab="Stories"><UserStoriesTab user={user} /></Tabs.TabPane>
              <Tabs.TabPane key='wallets' tab="Wallets"><UserWalletsTab user={user} /></Tabs.TabPane>
            </Tabs>
          </Space>
        </Layout.Admin>
      </AdminGuard>
    </RouteGuard>
  )
}
