import { Button, Col, Form, message, Row } from 'antd'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import StoriesService from 'services/Stories'
import EditableStoryCoverMedia from './EditableStoryCoverMedia'
import StoryForm from './StoryForm'

type StoryEditTabProps = {
  story: any
}

export default function StoryEditTab ({ story }:StoryEditTabProps) {
  const storyId = story.id
  const [form] = Form.useForm()
  const initialValues = story
  const updater = useMutation(payload => StoriesService.updateById(storyId, payload))

  useEffect(() => {
    if (story) form.resetFields()
  }, [story])

  const handleFinish = (values: any) => {
    updater.mutate(values, {
      onError: (err:any) => {
        message.error(err?.message)
      }
    })
  }

  const handleFinishFailed = () => {
    message.error('Check all fields and then try again')
  }

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <EditableStoryCoverMedia story={story} />
      </Col>
      <Col xs={24} sm={12} md={16} lg={18}>
        <Form form={form} onFinish={handleFinish} onFinishFailed={handleFinishFailed} initialValues={initialValues} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
          <StoryForm />
          <Button loading={updater.isLoading} onClick={form.submit}>Save</Button>
        </Form>
      </Col>
    </Row>
  )
}
