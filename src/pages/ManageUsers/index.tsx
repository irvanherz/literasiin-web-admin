import { EditFilled, EyeFilled, PlusOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, FloatButton, Input, List, Row, Select, Space, Tag, Typography } from 'antd'
import AdminGuard from 'components/AdminGuard'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import useQueryFilters, { FilterConfig } from 'hooks/useQueryFilters'
import { DEFAULT_PHOTO } from 'libs/variables'
import Media from 'models/Media'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import UsersService from 'services/Users'
import styled from 'styled-components'
import AddUserButton from './AddUserButton'

const StyledListItem = styled(List.Item)`
.ant-list-item-meta-title {
  margin-top: 0;
}
`
type UserListItemProps = { user: any }
function UserListItem ({ user }: UserListItemProps) {
  const photo = new Media(user?.photo)
  return (
    <StyledListItem
      extra={
        <Space>
          <Link to={`/users/${user.id}/edit`}>
            <Button icon={<EditFilled />} shape='circle' />
          </Link>
          <Link to={`/users/${user.id}`}>
            <Button icon={<EyeFilled />} shape='circle' />
          </Link>
        </Space>
      }
    >
      <List.Item.Meta
        avatar={<Avatar shape='square' src={photo.md?.url || DEFAULT_PHOTO} size={48} />}
        title={<><span>{user?.fullName}</span> ({user?.username}) {user?.role === 'admin' ? <Tag color='red'>ADMIN</Tag> : null}</>}
        description={user?.email}
      />
    </StyledListItem>
  )
}

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
          menuProps={{ selectedKeys: ['users'] }}
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
            renderItem={user => <UserListItem user={user} />}
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
