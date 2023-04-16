import { PlusOutlined } from '@ant-design/icons'
import { Col, FloatButton, Input, List, Pagination, Row, Select, Space, Typography } from 'antd'
import AdminGuard from 'components/AdminGuard'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import UserIdInput from 'components/shared/UserIdInput'
import useQueryFilters, { FilterConfig } from 'hooks/useQueryFilters'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import ArticlesService from 'services/Articles'
import ArticleCreateButton from './ArticleCreateButton'
import ArticleListItem from './ArticleListItem'

const SORT_OPTIONS = [{ label: 'Newest', value: 'newest' }, { label: 'Oldest', value: 'oldest' }]
const STATUS_OPTIONS = [{ label: 'Any', value: 'any' }, { label: 'Published', value: 'published' }, { label: 'Draft', value: 'draft' }]

const FILT: Record<string, FilterConfig> = {
  search: {
    match: /.*/,
    default: ''
  },
  status: {
    match: /(any|published|draft)/,
    default: 'any'
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

export default function ManageArticles () {
  const navigate = useNavigate()
  const [filters, apiFilter, refilter] = useQueryFilters(FILT)
  const { data, refetch } = useQuery(['articles[]', apiFilter], () => ArticlesService.findMany(apiFilter))
  const articles: any[] = data?.data || []
  const meta = data?.meta || {}

  return (
    <RouteGuard require='authenticated'>
      <AdminGuard>
        <Layout.Admin
          menuProps={{ defaultOpenKeys: ['articles'], selectedKeys: ['articles.items'] }}
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
              dataSource={articles}
              renderItem={article => (
                <ArticleListItem article={article} afterDeleted={refetch} afterUpdated={refetch}/>
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
          <ArticleCreateButton afterCreated={(created: any) => navigate(`/articles/${created.id}/edit`)}>
            <FloatButton icon={<PlusOutlined />} />
          </ArticleCreateButton>
        </Layout.Admin>
      </AdminGuard>
    </RouteGuard>
  )
}
