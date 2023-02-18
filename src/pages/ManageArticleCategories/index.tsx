import { Button, List, Space } from 'antd'
import Layout from 'components/Layout'
import { useQuery } from 'react-query'
import ArticlesService from 'services/Articles'
import ReorderCategoriesButton from './ReorderCategoriesButton'

export default function ManageArticleCategories () {
  const { data } = useQuery('articles.categories', () => ArticlesService.Categories.findMany())
  const categories: any[] = data?.data || []

  return (
    <Layout.Admin
      menuProps={{ defaultOpenKeys: ['articles'], selectedKeys: ['articles.categories'] }}
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
  )
}
