import { PlusOutlined } from '@ant-design/icons'
import { Button, FloatButton, List, Space } from 'antd'
import AdminGuard from 'components/AdminGuard'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import { useQuery } from 'react-query'
import ArticlesService from 'services/Articles'
import ArticleCategoryCreateButton from './ArticleCategoryCreateButton'
import ArticleCategoryDeleteButton from './ArticleCategoryDeleteButton'
import ArticleCategoryEditButton from './ArticleCategoryEditButton'
import ReorderCategoriesButton from './ReorderCategoriesButton'

export default function ManageArticleCategories () {
  const { data, refetch } = useQuery('articles.categories', () => ArticlesService.Categories.findMany())
  const categories: any[] = data?.data || []

  return (
    <RouteGuard require='authenticated'>
      <AdminGuard>
        <Layout.Admin
          menuProps={{ defaultOpenKeys: ['articles'], selectedKeys: ['articles.categories'] }}
          applet={
            <ReorderCategoriesButton categories={categories} afterUpdated={refetch}>
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
                    <ArticleCategoryEditButton category={cat} afterUpdated={refetch}>
                      <Button>Edit</Button>
                    </ArticleCategoryEditButton>
                    <ArticleCategoryDeleteButton category={cat} afterDeleted={refetch}>
                      <Button>Delete</Button>
                    </ArticleCategoryDeleteButton>
                  </Space>
              }
            >
                <List.Item.Meta
                  title={cat?.name}
              />
              </List.Item>
            )}
        />
          <ArticleCategoryCreateButton afterCreated={refetch}>
            <FloatButton icon={<PlusOutlined />} />
          </ArticleCategoryCreateButton>
        </Layout.Admin>
      </AdminGuard>
    </RouteGuard>

  )
}
