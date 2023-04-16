import { Button, Form, message, Space } from 'antd'
import AdminGuard from 'components/AdminGuard'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import ConfigurationForm from 'components/shared/ConfigurationForm'
import { useEffect, useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import ConfigurationsService from 'services/Configurations'

export default function ManageConfigurationEdit () {
  const params = useParams()
  const configId = +(params.configId || 0)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { data } = useQuery(`configuratios[${configId}]`, () => ConfigurationsService.findById(configId), { enabled: !!configId })
  const updater = useMutation(payload => ConfigurationsService.updateById(configId, payload))

  const handleFinish = (values: any) => {
    console.log(values)

    const payload = values
    payload.imageId = values.image?.id
    delete payload.image
    updater.mutate(payload, {
      onSuccess: () => {
        message.success('Configuration updated')
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

  const configuration = data?.data || ''

  const initialValues = useMemo(() => {
    if (configuration) {
      const result = { ...configuration }
      try {
        result.value = JSON.stringify(result.value || '', null, 2)
      } catch (err) {
        result.value = ''
      }
      return result
    }
    return {}
  }, [configuration])

  useEffect(() => {
    form.resetFields()
  }, [initialValues])

  return (
    <RouteGuard require='authenticated'>
      <AdminGuard>
        <Layout.Admin
          menuProps={{ selectedKeys: ['configurations'] }}
          breadcrumb={[
            { title: 'Home', path: '/' },
            { title: 'Configurations', path: '/configurations' },
            { title: `${configuration?.name}`, path: `/${configuration?.id}}` },
            { title: 'Edit Configuration', path: '/edit}' }
          ]}
        >
          <Space direction='vertical' style={{ width: '100%' }}>
            <Form initialValues={initialValues} form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={handleFinish} onFinishFailed={handleFinishFailed}>
              <ConfigurationForm />
            </Form>
            <Button type='primary' onClick={form.submit} loading={updater.isLoading}>Submit</Button>
          </Space>
        </Layout.Admin>
      </AdminGuard>
    </RouteGuard>
  )
}
