import { Button, Form, message } from 'antd'
import StoryForm from 'components/shared/StoryForm'
import { useEffect, useMemo } from 'react'
import { useMutation } from 'react-query'
import StoriesService from 'services/Stories'

type StoryEditTabProps = {
  story: any
  afterUpdated?: () => void
}
export default function StoryEditTab ({ story, afterUpdated }: StoryEditTabProps) {
  const storyId = story?.id
  const [form] = Form.useForm()
  const updater = useMutation(data => StoriesService.updateById(storyId, data))

  const initialValues = useMemo(() => {
    const result = { ...story }
    return result
  }, [story])

  useEffect(() => {
    form.resetFields()
  }, [story])

  const handleSubmit = (payload: any) => {
    payload.coverId = payload?.cover?.id
    delete payload.cover

    updater.mutate(payload, {
      onSuccess: () => {
        afterUpdated && afterUpdated()
        message.success('Story updated')
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
      <StoryForm />
      <Button type='primary' loading={updater.isLoading} onClick={form.submit}>Update</Button>
    </Form>
  )
}
