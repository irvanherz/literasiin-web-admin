import { Space, Tabs } from 'antd'
import AdminGuard from 'components/AdminGuard'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import UsersService from 'services/Users'
import UserEditTab from './UserEditTab'
import UserIdentitesTab from './UserIdentitesTab'
import UserStoriesTab from './UserStoriesTab'
import UserSummaryTab from './UserSummaryTab'

export default function ManageUserDetails () {
  const params = useParams()
  const userId = +(params?.id || 0)
  const { data, refetch } = useQuery(`user[${userId}]`, () => UsersService.findById(userId))
  const user: any = data?.data

  return (
    <RouteGuard require='authenticated'>
      <AdminGuard>
        <Layout.Admin
          breadcrumb={[
            { breadcrumbName: 'Home', path: '/' },
            { breadcrumbName: 'Users', path: '/users' },
            { breadcrumbName: user?.fullName, path: `/users/${user?.id}` }
          ]}
        >
          <Space direction='vertical' style={{ width: '100%' }}>
            <Tabs>
              <Tabs.TabPane key='summary' tab="Summary"><UserSummaryTab user={user} /></Tabs.TabPane>
              <Tabs.TabPane key='edit' tab="Edit"><UserEditTab user={user} afterUpdated={refetch}/></Tabs.TabPane>
              <Tabs.TabPane key='identities' tab="Identities"><UserIdentitesTab user={user} /></Tabs.TabPane>
              <Tabs.TabPane key='stories' tab="Stories"><UserStoriesTab user={user} /></Tabs.TabPane>
            </Tabs>
          </Space>
        </Layout.Admin>
      </AdminGuard>
    </RouteGuard>
  )
}
