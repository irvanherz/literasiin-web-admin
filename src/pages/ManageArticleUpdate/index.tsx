import { Button, Form, message, Space } from 'antd'
import AdminGuard from 'components/AdminGuard'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import ArticleForm from 'components/shared/ArticleForm'
import { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import ArticlesService from 'services/Articles'

export default function ManageArticleUpdate () {
  const params = useParams()
  const articleId = +(params?.articleId || 0)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const updater = useMutation(payload => ArticlesService.updateById(articleId, payload))
  const articleQuery = useQuery(`articles[${articleId}]`, () => ArticlesService.findById(articleId), { enabled: !!articleId })
  const article = articleQuery.data?.data

  const handleFinish = (payload: any) => {
    if (payload.image) {
      payload.imageId = payload.image.id
    }
    delete payload.image
    updater.mutate(payload, {
      onSuccess: () => {
        message.success('Article updated')
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

  const initialValues = article

  useEffect(() => {
    if (initialValues) { form.resetFields() }
  }, [initialValues])

  return (
    <RouteGuard require='authenticated'>
      <AdminGuard>
        <Layout.Admin
          breadcrumb={[
            { title: 'Home', path: '/' },
            { title: 'Articles', path: '/articles' },
            { title: article?.title || 'Untitled', path: `/articles/${articleId}` },
            { title: 'Edit', path: `/articles/${articleId}/edit` }
          ]}
        >
          <Space direction='vertical' style={{ width: '100%' }}>
            <Form initialValues={initialValues} form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={handleFinish} onFinishFailed={handleFinishFailed}>
              <ArticleForm />
            </Form>
            <Button type='primary' onClick={form.submit} loading={updater.isLoading}>Submit</Button>
          </Space>
        </Layout.Admin>
      </AdminGuard>
    </RouteGuard>
  )
}
