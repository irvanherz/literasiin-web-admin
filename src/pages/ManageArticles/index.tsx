import { Button, Col, Input, List, Row, Select, Space } from 'antd'
import Layout from 'components/Layout'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import ArticlesService from 'services/Articles'

const SORT_OPTIONS = [{ label: 'Newest', value: 'newest' }, { label: 'Oldest', value: 'oldest' }]
const STATUS_OPTIONS = [{ label: 'Newest', value: 'newest' }, { label: 'Oldest', value: 'oldest' }]

export default function ManageArticles () {
  const { data } = useQuery('articles', () => ArticlesService.findMany())
  const articles: any[] = data?.data || []

  return (
    <Layout.Admin
      menuProps={{ defaultOpenKeys: ['articles'], selectedKeys: ['articles.items'] }}
      applet={
        <Row gutter={8}>
          <Col span={5}>
            <Input.Search placeholder='Search articles...' />
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
          dataSource={articles}
          renderItem={article => (
            <List.Item
              extra={
                <Space>
                  <Link to={`/articles/${article.id}`}>
                    <Button>Details</Button>
                  </Link>
                  <Button>Delete</Button>
                </Space>
            }
          >
              <List.Item.Meta
                title={article?.title}
                description={article?.description}
            />
            </List.Item>
          )}
      />
      </Space>
    </Layout.Admin>
  )
}