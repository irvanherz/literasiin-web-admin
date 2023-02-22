import { Button, Form, message, Space } from 'antd'
import AdminGuard from 'components/AdminGuard'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import ArticleForm from 'components/shared/ArticleForm'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import ArticlesService from 'services/Articles'

export default function ManageArticleCreate () {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const creator = useMutation(payload => ArticlesService.create(payload))

  const handleFinish = (values: any) => {
    creator.mutate(values, {
      onSuccess: () => {
        message.success('Article created')
        navigate('/articles')
      },
      onError: (err: any) => {
        message.error(err?.message)
      }
    })
  }

  const handleFinishFailed = () => {
    message.error('Check all fields and try again')
  }

  return (
    <RouteGuard require='authenticated'>
      <AdminGuard>
        <Layout.Admin
          breadcrumb={[
            { breadcrumbName: 'Home', path: '/' },
            { breadcrumbName: 'Articles', path: '/articles' },
            { breadcrumbName: 'Create Article', path: '/articles/create}' }
          ]}
        >
          <Space direction='vertical' style={{ width: '100%' }}>
            <Form form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={handleFinish} onFinishFailed={handleFinishFailed}>
              <ArticleForm />
            </Form>
            <Button type='primary' onClick={form.submit} loading={creator.isLoading}>Submit</Button>
          </Space>
        </Layout.Admin>
      </AdminGuard>
    </RouteGuard>
  )
}
