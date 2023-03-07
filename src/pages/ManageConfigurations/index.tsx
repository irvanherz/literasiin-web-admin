import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, FloatButton, Input, List, message, Modal, Row, Select, Space, Typography } from 'antd'
import AdminGuard from 'components/AdminGuard'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import useQueryFilters, { FilterConfig } from 'hooks/useQueryFilters'
import { useMutation, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import ConfigurationsService from 'services/Configurations'

type ConfigurationItemProps = {
  config: any,
  afterDeleted?: () => void
}

function ConfigurationItem ({ config, afterDeleted }: ConfigurationItemProps) {
  const configId = config?.id
  const deletor = useMutation(() => ConfigurationsService.deleteById(configId))

  const handleDelete = () => {
    Modal.confirm({
      centered: true,
      title: 'Confirm',
      content: 'Are you sure you want to delete this configuration?',
      onOk: async () => {
        try {
          await deletor.mutateAsync()
          if (afterDeleted) afterDeleted()
        } catch (err: any) {
          message.error(err?.message)
        }
      }
    })
  }
  return (
    <List.Item
      extra={
        <Space>
          <Link to={`/configurations/${config.id}/edit`}>
            <Button>Edit</Button>
          </Link>
          <Button onClick={handleDelete}>Delete</Button>
        </Space>
        }
      >
      <List.Item.Meta
        title={config?.name}
        description={config?.description}
                />
    </List.Item>
  )
}

const FILT: Record<string, FilterConfig> = {
  search: {
    match: /.*/,
    default: ''
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
export default function ManageConfigurations () {
  const [filters, apiFilter, refilter] = useQueryFilters(FILT)
  const { data, refetch } = useQuery(['configurations', apiFilter], () => ConfigurationsService.findMany(apiFilter))
  const configurations: any[] = data?.data || []

  return (
    <RouteGuard require='authenticated'>
      <AdminGuard>
        <Layout.Admin
          menuProps={{ defaultOpenKeys: ['configurations'], selectedKeys: ['configurations.items'] }}
          applet={
            <Row gutter={8}>
              <Col span={5}>
                <Space direction='vertical' style={{ width: '100%' }}>
                  <Typography.Text>Search</Typography.Text>
                  <Input.Search defaultValue={filters.search} onSearch={q => refilter({ search: q })} placeholder='Search configuration...' />
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
              dataSource={configurations}
              renderItem={config => <ConfigurationItem config={config} afterDeleted={refetch} />}
          />
          </Space>
          <Link to='/configurations/create'>
            <FloatButton icon={<PlusOutlined />} />
          </Link>
        </Layout.Admin>
      </AdminGuard>
    </RouteGuard>
  )
}
