import { Button, Form, message, Space } from 'antd'
import AdminGuard from 'components/AdminGuard'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import ConfigurationForm from 'components/shared/ConfigurationForm'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import ConfigurationsService from 'services/Configurations'

export default function ManageConfigurationCreate () {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const creator = useMutation(payload => ConfigurationsService.create(payload))

  const handleFinish = (values: any) => {
    console.log(values)

    const payload = values
    payload.imageId = values.image?.id
    delete payload.image
    creator.mutate(payload, {
      onSuccess: () => {
        message.success('Configuration created')
        navigate('/configurations')
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
          menuProps={{ selectedKeys: ['configurations'] }}
          breadcrumb={[
            { title: 'Home', path: '/' },
            { title: 'Configurations', path: '/configurations' },
            { title: 'Create Configuration', path: '/configurations/create}' }
          ]}
        >
          <Space direction='vertical' style={{ width: '100%' }}>
            <Form form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={handleFinish} onFinishFailed={handleFinishFailed}>
              <ConfigurationForm />
            </Form>
            <Button type='primary' onClick={form.submit} loading={creator.isLoading}>Submit</Button>
          </Space>
        </Layout.Admin>
      </AdminGuard>
    </RouteGuard>
  )
}
