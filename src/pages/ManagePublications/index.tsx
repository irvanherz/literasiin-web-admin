import { Button, Col, Input, List, Row, Select, Space } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import { useQuery } from 'react-query'
import PublicationsService from 'services/Publications'

const SORT_OPTIONS = [{ label: 'Newest', value: 'newest' }, { label: 'Oldest', value: 'oldest' }]
const STATUS_OPTIONS = [{ label: 'Newest', value: 'newest' }, { label: 'Oldest', value: 'oldest' }]

export default function ManagePublications () {
  const { data } = useQuery('users', () => PublicationsService.findMany())
  const publications: any[] = data?.data || []

  return (
    <RouteGuard require='authenticated'>
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
          dataSource={publications}
          renderItem={publication => (
            <List.Item
              extra={
                <Space>
                  <Button>Details</Button>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </Space>
              }
            >
              <List.Item.Meta
                title="Publication"
                description="Deskripsi"
              />
            </List.Item>
          )}
        />
      </Layout.Admin>
    </RouteGuard>
  )
}
