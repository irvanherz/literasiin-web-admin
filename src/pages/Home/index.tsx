import { Space } from 'antd'
import AdminGuard from 'components/AdminGuard'
import RouteGuard from 'components/RouteGuard'
import Layout from '../../components/Layout'

export default function Home () {
  return (
    <RouteGuard require='authenticated'>
      <AdminGuard>
        <Layout.Admin
          menuProps={{ selectedKeys: ['home'] }}
          breadcrumb={[
            { title: 'Home', path: '/' }
          ]}
        >
          <Space direction='vertical' style={{ width: '100%' }}>
            <div>Dashboard</div>
          </Space>
        </Layout.Admin>
      </AdminGuard>

    </RouteGuard>

  )
}
