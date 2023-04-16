import { PlusOutlined } from '@ant-design/icons'
import { Button, FloatButton, List, Space } from 'antd'
import AdminGuard from 'components/AdminGuard'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import { useQuery } from 'react-query'
import KbsService from 'services/Kbs'
import KbCategoryCreateButton from './KbCategoryCreateButton'
import KbCategoryDeleteButton from './KbCategoryDeleteButton'
import KbCategoryEditButton from './KbCategoryEditButton'
import ReorderCategoriesButton from './ReorderCategoriesButton'

export default function ManageKbCategories () {
  const { data, refetch } = useQuery('kbs.categories', () => KbsService.Categories.findMany())
  const categories: any[] = data?.data || []

  return (
    <RouteGuard require='authenticated'>
      <AdminGuard>
        <Layout.Admin
          menuProps={{ defaultOpenKeys: ['kbs'], selectedKeys: ['kbs.categories'] }}
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
                    <KbCategoryEditButton category={cat} afterUpdated={refetch}>
                      <Button>Edit</Button>
                    </KbCategoryEditButton>
                    <KbCategoryDeleteButton category={cat} afterDeleted={refetch}>
                      <Button>Delete</Button>
                    </KbCategoryDeleteButton>
                  </Space>
              }
            >
                <List.Item.Meta
                  title={cat?.name}
              />
              </List.Item>
            )}
        />
          <KbCategoryCreateButton afterCreated={refetch}>
            <FloatButton icon={<PlusOutlined />} />
          </KbCategoryCreateButton>
        </Layout.Admin>
      </AdminGuard>
    </RouteGuard>

  )
}
