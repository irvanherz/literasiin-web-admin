import { Button, Card, Col, Form, message, Row } from 'antd'
import Layout from 'components/Layout'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import StoriesService from 'services/Stories'
import StoryForm from './StoryForm'

export default function StoryCreate () {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const creator = useMutation<any, any, any>(StoriesService.create)

  const handleSubmit = (values: any) => {
    creator.mutate(values, {
      onSuccess: () => {
        navigate('/stories/mine')
      }
    })
  }

  const handleValidationFailed = () => {
    message.error('Cheack all fields and then try again')
  }

  return (
    <Layout.Default>
      <Layout.Scaffold
        title="Create Story"
        description="Fill information aout your story below"
        bodyStyle={{ padding: '16px 0' }}
        actions={[<Button key='sub' onClick={form.submit}>Submit</Button>]}
      >
        <Row gutter={[16, 16]}>
          <Col span={8}>Cover</Col>
          <Col span={16}>
            <Card>
              <Form
                form={form}
                wrapperCol={{ span: 24 }}
                labelCol={{ span: 24 }}
                onFinish={handleSubmit}
                onFinishFailed={handleValidationFailed}
              >
                <StoryForm />
              </Form>
            </Card>
          </Col>
        </Row>
      </Layout.Scaffold>
    </Layout.Default>
  )
}
