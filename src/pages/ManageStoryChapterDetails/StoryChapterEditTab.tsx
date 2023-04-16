import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, message } from 'antd'
import StoryChapterForm from 'components/shared/StoryChapterForm'
import { useEffect, useMemo } from 'react'
import { useMutation } from 'react-query'
import StoriesService from 'services/Stories'

type StoryChapterEditTabProps = {
  chapter: any
  afterUpdated?: () => void
}
export default function StoryChapterEditTab ({ chapter, afterUpdated }: StoryChapterEditTabProps) {
  const chapterId = chapter?.id || 0
  const [form] = Form.useForm()
  const updater = useMutation(data => StoriesService.Chapters.updateById(chapterId, data))

  const initialValues = useMemo(() => {
    const result = { ...chapter }
    return result
  }, [chapter])

  useEffect(() => {
    form.resetFields()
  }, [chapter])

  const handleSubmit = (payload: any) => {
    payload.coverId = payload?.cover?.id
    delete payload.cover

    updater.mutate(payload, {
      onSuccess: () => {
        afterUpdated && afterUpdated()
        message.success('Chapter updated')
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
      <StoryChapterForm />
      <Button
        type='primary'
        onClick={form.submit}
        loading={updater.isLoading}
        icon={<PlusOutlined />}
      >
        Update Chapter
      </Button>
    </Form>
  )
}
