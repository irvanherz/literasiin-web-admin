import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, FloatButton, Input, List, Row, Select, Space, Typography } from 'antd'
import AdminGuard from 'components/AdminGuard'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import useQueryFilters, { FilterConfig } from 'hooks/useQueryFilters'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import KbsService from 'services/Kbs'

const FILT: Record<string, FilterConfig> = {
  search: {
    match: /.*/,
    default: ''
  },
  status: {
    match: /(any|published|draft)/,
    default: 'any',
    translate: status => status === 'any' ? {} : { status }
  },
  userId: {
    match: /[0-9]+/,
    default: ''
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
const STATUS_OPTIONS = [{ label: 'Any', value: 'any' }, { label: 'Published', value: 'published' }, { label: 'Draft', value: 'draft' }]

export default function ManageKbs () {
  const [filters, apiFilter, refilter] = useQueryFilters(FILT)
  const { data } = useQuery(['kbs[]', apiFilter], () => KbsService.findMany(apiFilter))
  const kbs: any[] = data?.data || []

  return (
    <RouteGuard require='authenticated'>
      <AdminGuard>
        <Layout.Admin
          menuProps={{ defaultOpenKeys: ['kbs'], selectedKeys: ['kbs.items'] }}
          applet={
            <Row gutter={8}>
              <Col span={5}>
                <Space direction='vertical' style={{ width: '100%' }}>
                  <Typography.Text>Search</Typography.Text>
                  <Input.Search allowClear defaultValue={filters.search} onSearch={q => refilter({ search: q, page: 1 })} placeholder='Search story...' />
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
              dataSource={kbs}
              renderItem={kb => (
                <List.Item
                  extra={
                    <Space>
                      <Link to={`/kbs/${kb.id}/edit`}>
                        <Button>Edit</Button>
                      </Link>
                      <Link to={`/kbs/${kb.id}`}>
                        <Button>Details</Button>
                      </Link>
                      <Button>Delete</Button>
                    </Space>
                }
              >
                  <List.Item.Meta
                    title={kb?.title}
                    description={kb?.description}
                />
                </List.Item>
              )}
          />
          </Space>
          <Link to='/kbs/create'>
            <FloatButton icon={<PlusOutlined />} />
          </Link>
        </Layout.Admin>
      </AdminGuard>
    </RouteGuard>
  )
}
