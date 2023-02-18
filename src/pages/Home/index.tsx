import { Space } from 'antd'
import Layout from '../../components/Layout'

export default function Home () {
  return (
    <Layout.Admin>
      <Space direction='vertical' style={{ width: '100%' }}>
        <div>Dashboard</div>
      </Space>
    </Layout.Admin>
  )
}
