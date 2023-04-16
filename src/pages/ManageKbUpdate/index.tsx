import { Button, Form, message, Space } from 'antd'
import AdminGuard from 'components/AdminGuard'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import KbForm from 'components/shared/KbForm'
import { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import KbsService from 'services/Kbs'

export default function ManageKbUpdate () {
  const params = useParams()
  const kbId = +(params?.kbId || 0)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const updater = useMutation(payload => KbsService.updateById(kbId, payload))
  const kbQuery = useQuery(`kbs[${kbId}]`, () => KbsService.findById(kbId), { enabled: !!kbId })
  const kb = kbQuery.data?.data

  const handleFinish = (payload: any) => {
    if (payload.image) {
      payload.imageId = payload.image.id
    }
    delete payload.image
    updater.mutate(payload, {
      onSuccess: () => {
        message.success('Kb updated')
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

  const initialValues = kb

  useEffect(() => {
    if (initialValues) { form.resetFields() }
  }, [initialValues])

  return (
    <RouteGuard require='authenticated'>
      <AdminGuard>
        <Layout.Admin
          breadcrumb={[
            { title: 'Home', path: '/' },
            { title: 'Kbs', path: '/kbs' },
            { title: kb?.title || 'Untitled', path: `/kbs/${kbId}` },
            { title: 'Edit', path: `/kbs/${kbId}/edit` }
          ]}
        >
          <Space direction='vertical' style={{ width: '100%' }}>
            <Form initialValues={initialValues} form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={handleFinish} onFinishFailed={handleFinishFailed}>
              <KbForm />
            </Form>
            <Button type='primary' onClick={form.submit} loading={updater.isLoading}>Submit</Button>
          </Space>
        </Layout.Admin>
      </AdminGuard>
    </RouteGuard>
  )
}
