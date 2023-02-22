import { PlusOutlined } from '@ant-design/icons'
import { Button, FloatButton, List, Space } from 'antd'
import AdminGuard from 'components/AdminGuard'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import { useQuery } from 'react-query'
import StoriesService from 'services/Stories'
import ReorderCategoriesButton from './ReorderCategoriesButton'
import StoryCategoryCreateButton from './StoryCategoryCreateButton'
import StoryCategoryDeleteButton from './StoryCategoryDeleteButton'
import StoryCategoryEditButton from './StoryCategoryEditButton'

export default function ManageStoryCategories () {
  const { data, refetch } = useQuery('stories.categories', () => StoriesService.Categories.findMany())
  const categories: any[] = data?.data || []

  return (
    <RouteGuard require='authenticated'>
      <AdminGuard>
        <Layout.Admin
          menuProps={{ defaultOpenKeys: ['stories'], selectedKeys: ['stories.categories'] }}
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
                    <StoryCategoryEditButton category={cat} afterUpdated={refetch}>
                      <Button>Edit</Button>
                    </StoryCategoryEditButton>
                    <StoryCategoryDeleteButton category={cat} afterDeleted={refetch}>
                      <Button>Delete</Button>
                    </StoryCategoryDeleteButton>
                  </Space>
                }
              >
                <List.Item.Meta
                  title={cat?.name}
                />
              </List.Item>
            )}
          />
          <StoryCategoryCreateButton afterCreated={refetch}>
            <FloatButton icon={<PlusOutlined />} />
          </StoryCategoryCreateButton>
        </Layout.Admin>
      </AdminGuard>
    </RouteGuard>
  )
}
