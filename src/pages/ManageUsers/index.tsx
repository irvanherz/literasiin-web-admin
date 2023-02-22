import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, FloatButton, Input, List, Row, Select, Space, Typography } from 'antd'
import AdminGuard from 'components/AdminGuard'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import useQueryFilters, { FilterConfig } from 'hooks/useQueryFilters'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import UsersService from 'services/Users'
import AddUserButton from './AddUserButton'

const SORT_OPTIONS = [{ label: 'Newest', value: 'newest' }, { label: 'Oldest', value: 'oldest' }]
const ROLE_OPTIONS = [{ label: 'Any', value: 'any' }, { label: 'User', value: 'user' }, { label: 'Admin', value: 'admin' }]

const FILT: Record<string, FilterConfig> = {
  search: {
    match: /.*/,
    default: ''
  },
  role: {
    match: /(any|user|admin)/,
    default: 'any',
    translate: role => role === 'any' ? {} : { role }
  },
  sort: {
    match: /(newest|oldest)/,
    default: 'newest',
    translate: value => {
      const MAP = {
        newest: { sortBy: 'createdAt', sortOrder: 'desc' },
        oldest: { sortBy: 'createdAt', sortOrder: 'asc' }
      }
      const key = value as keyof typeof MAP
      return MAP[key] || MAP.newest
    }
  }
}

export default function ManageUsers () {
  const [filters, apiFilter, refilter] = useQueryFilters(FILT)
  const { data, refetch } = useQuery(['users[]', apiFilter], () => UsersService.findMany(apiFilter))
  const users: any[] = data?.data || []

  return (
    <RouteGuard require='authenticated'>
      <AdminGuard>
        <Layout.Admin
          applet={
            <Row gutter={8}>
              <Col span={5}>
                <Space direction='vertical' style={{ width: '100%' }}>
                  <Typography.Text>Search</Typography.Text>
                  <Input.Search defaultValue={filters.search} onSearch={q => refilter({ search: q })} placeholder='Search users...' />
                </Space>
              </Col>
              <Col span={5}>
                <Space direction='vertical' style={{ width: '100%' }}>
                  <Typography.Text>Role</Typography.Text>
                  <Select defaultValue={filters.role} onChange={v => refilter({ role: v })} options={ROLE_OPTIONS} style={{ width: '100%' }} placeholder="Role..." />
                </Space>
              </Col>
              <Col span={5}>
                <Space direction='vertical' style={{ width: '100%' }}>
                  <Typography.Text>Sort</Typography.Text>
                  <Select defaultValue={filters.sort} onChange={v => refilter({ sort: v })} options={SORT_OPTIONS} style={{ width: '100%' }} placeholder="Sort..." />
                </Space>
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
      </AdminGuard>
    </RouteGuard>
  )
}
