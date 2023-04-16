import { Button, Form, message } from 'antd'
import ArticleForm from 'components/shared/ArticleForm'
import { useEffect, useMemo } from 'react'
import { useMutation } from 'react-query'
import ArticlesService from 'services/Articles'

type ArticleEditTabProps = {
  article: any
  afterUpdated?: () => void
}
export default function ArticleEditTab ({ article, afterUpdated }: ArticleEditTabProps) {
  const articleId = article?.id
  const [form] = Form.useForm()
  const updater = useMutation(data => ArticlesService.updateById(articleId, data))

  const initialValues = useMemo(() => {
    const result = { ...article }
    return result
  }, [article])

  useEffect(() => {
    form.resetFields()
  }, [article])

  const handleSubmit = (payload: any) => {
    payload.imageId = payload?.image?.id
    delete payload.image

    updater.mutate(payload, {
      onSuccess: () => {
        afterUpdated && afterUpdated()
        message.success('Article updated')
      },
      onError: (err: any) => {
        message.error(err?.message || 'Something wrong')
      }
    })
  }

  const handleValidationError = () => {
    message.error('Validation error')
  }
  return (
    <Form initialValues={initialValues} form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={handleSubmit} onFinishFailed={handleValidationError}>
      <ArticleForm />
      <Button type='primary' loading={updater.isLoading} onClick={form.submit}>Update</Button>
    </Form>
  )
}
