import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, FloatButton, Input, List, Row, Select, Space } from 'antd'
import Layout from 'components/Layout'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import UsersService from 'services/Users'
import AddUserButton from './AddUserButton'

const SORT_OPTIONS = [{ label: 'Newest', value: 'newest' }, { label: 'Oldest', value: 'oldest' }]
const STATUS_OPTIONS = [{ label: 'Newest', value: 'newest' }, { label: 'Oldest', value: 'oldest' }]

export default function ManageUsers () {
  const { data, refetch } = useQuery('users', () => UsersService.findMany())
  const users: any[] = data?.data || []

  return (
    <Layout.Admin
      applet={
        <Row gutter={8}>
          <Col span={5}>
            <Input.Search placeholder='Search stories...' />
          </Col>
          <Col span={5}>
            <Select options={STATUS_OPTIONS} style={{ width: '100%' }} placeholder="Publish status..." />
          </Col>
          <Col span={5}>
            <Select options={SORT_OPTIONS} style={{ width: '100%' }} placeholder="Sort..." />
          </Col>
        </Row>
      }
    >
      <List
        dataSource={users}
        renderItem={user => (
          <List.Item
            extra={
              <Space>
                <Link to={`/users/${user.id}`}>
                  <Button>Details</Button>
                </Link>
                <Button>Delete</Button>
              </Space>
            }
          >
            <List.Item.Meta
              title={user?.fullName}
              description={user?.email}
            />
          </List.Item>
        )}
      />
      <AddUserButton afterCreated={refetch}>
        <FloatButton
          icon={<PlusOutlined />}
          onClick={() => console.log('click')}
        />
      </AddUserButton>

    </Layout.Admin>
  )
}
