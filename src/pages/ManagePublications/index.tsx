import { Col, Input, List, Pagination, Row, Select, Space, Typography } from 'antd'
import AdminGuard from 'components/AdminGuard'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import UserIdInput from 'components/shared/UserIdInput'
import usePublications from 'hooks/usePublications'
import useQueryFilters, { FilterConfig } from 'hooks/useQueryFilters'
import PublicationListItem from './PublicationListItem'

const FILT: Record<string, FilterConfig> = {
  search: {
    match: /.*/,
    default: ''
  },
  status: {
    match: /(any|draft|payment|publishing|shipping|published)/,
    default: 'any'
  },
  userId: {
    match: /[0-9]+/,
    default: '',
    translate: value => ({ userId: value || 'any' })
  },
  page: {
    match: /[0-9]+/,
    default: '1'
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

const SORT_OPTIONS = [{ label: 'Newest', value: 'newest' }, { label: 'Oldest', value: 'oldest' }]
const STATUS_OPTIONS = [{ label: 'Any', value: 'any' }, { label: 'Draft', value: 'draft' }, { label: 'Waiting Payment', value: 'payment' }, { label: 'Publishing', value: 'publishing' }, { label: 'Shipping', value: 'shipping' }, { label: 'Published', value: 'published' }]

export default function ManagePublications () {
  const [filters, apiFilter, refilter] = useQueryFilters(FILT)
  const { data, refetch } = usePublications({ ...apiFilter, includeAddress: true })
  const publications: any[] = data?.data || []
  const meta = data?.meta || {}

  return (
    <RouteGuard require='authenticated'>
      <AdminGuard>
        <Layout.Admin
          menuProps={{ defaultOpenKeys: ['publications'], selectedKeys: ['publications.items'] }}
          applet={
            <Row gutter={8}>
              <Col span={5}>
                <Space direction='vertical' style={{ width: '100%' }}>
                  <Typography.Text>Search</Typography.Text>
                  <Input.Search allowClear defaultValue={filters.search} onSearch={q => refilter({ search: q, page: 1 })} placeholder='Search publication...' />
                </Space>
              </Col>
              <Col span={5}>
                <Space direction='vertical' style={{ width: '100%' }}>
                  <Typography.Text>User</Typography.Text>
                  <UserIdInput defaultValue={filters.userId} onChange={v => refilter({ userId: v, page: 1 })} />
                </Space>
              </Col>
              <Col span={5}>
                <Space direction='vertical' style={{ width: '100%' }}>
                  <Typography.Text>Status</Typography.Text>
                  <Select defaultValue={filters.status} onChange={v => refilter({ status: v, page: 1 })} options={STATUS_OPTIONS} style={{ width: '100%' }} placeholder="Status..." />
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
          <Space direction='vertical' style={{ width: '100%' }}>
            <List
              dataSource={publications}
              renderItem={publication => (
                <PublicationListItem publication={publication} afterUpdated={refetch} afterDeleted={refetch} />
              )}
              footer={
                <Pagination
                  pageSize={1}
                  total={meta?.numPages}
                  current={meta?.page || 0}
                  onChange={p => refilter({ page: p })}
                />
              }
          />
          </Space>
          {/* <PublicationCreateButton
            afterCreated={(created: any) => navigate(`/publications/${created.id}`)}
          >
            <FloatButton icon={<PlusOutlined />}/>
          </PublicationCreateButton> */}
        </Layout.Admin>
      </AdminGuard>
    </RouteGuard>
  )
}
