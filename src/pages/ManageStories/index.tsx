import { Button, Col, Input, List, Row, Select, Space } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import StoriesService from 'services/Stories'

const SORT_OPTIONS = [{ label: 'Newest', value: 'newest' }, { label: 'Oldest', value: 'oldest' }]
const STATUS_OPTIONS = [{ label: 'Newest', value: 'newest' }, { label: 'Oldest', value: 'oldest' }]

export default function ManageStories () {
  const { data } = useQuery('stories', () => StoriesService.findMany())
  const stories: any[] = data?.data || []

  return (
    <RouteGuard require='authenticated'>
      <Layout.Admin
        menuProps={{ defaultOpenKeys: ['stories'], selectedKeys: ['stories.items'] }}
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
        <Space direction='vertical' style={{ width: '100%' }}>
          <List
            dataSource={stories}
            renderItem={story => (
              <List.Item
                extra={
                  <Space>
                    <Link to={`/stories/${story.id}`}>
                      <Button>Details</Button>
                    </Link>
                    <Button>Delete</Button>
                  </Space>
              }
            >
                <List.Item.Meta
                  title={story?.title}
                  description={story?.description}
              />
              </List.Item>
            )}
        />
        </Space>
      </Layout.Admin>
    </RouteGuard>
  )
}
