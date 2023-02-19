import { Button, List, Space } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import { useQuery } from 'react-query'
import StoriesService from 'services/Stories'
import ReorderCategoriesButton from './ReorderCategoriesButton'

export default function ManageStoryCategories () {
  const { data } = useQuery('stories.categories', () => StoriesService.Categories.findMany())
  const categories: any[] = data?.data || []

  return (
    <RouteGuard require='authenticated'>
      <Layout.Admin
        menuProps={{ defaultOpenKeys: ['stories'], selectedKeys: ['stories.categories'] }}
        applet={
          <ReorderCategoriesButton categories={categories}>
            <Button>Reorder</Button>
          </ReorderCategoriesButton>
        }
      >
        <List
          dataSource={categories}
          renderItem={cat => (
            <List.Item
              extra={
                <Space>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </Space>
              }
            >
              <List.Item.Meta
                title={cat?.name}
              />
            </List.Item>
          )}
        />
      </Layout.Admin>
    </RouteGuard>
  )
}
