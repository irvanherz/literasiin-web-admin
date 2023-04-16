import { Button, Form, message, Space } from 'antd'
import AdminGuard from 'components/AdminGuard'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import KbForm from 'components/shared/KbForm'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import KbsService from 'services/Kbs'

export default function ManageKbCreate () {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const creator = useMutation(payload => KbsService.create(payload))

  const handleFinish = (values: any) => {
    console.log(values)

    const payload = values
    payload.imageId = values.image?.id
    delete payload.image
    creator.mutate(payload, {
      onSuccess: () => {
        message.success('Kb created')
        navigate('/kbs')
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
          menuProps={{ defaultOpenKeys: ['kbs'], selectedKeys: ['kbs.create'] }}
          breadcrumb={[
            { title: 'Home', path: '/' },
            { title: 'Knowledge Bases', path: '/kbs' },
            { title: 'Create', path: '/create}' }
          ]}
        >
          <Space direction='vertical' style={{ width: '100%' }}>
            <Form form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={handleFinish} onFinishFailed={handleFinishFailed}>
              <KbForm />
            </Form>
            <Button type='primary' onClick={form.submit} loading={creator.isLoading}>Submit</Button>
          </Space>
        </Layout.Admin>
      </AdminGuard>
    </RouteGuard>
  )
}
