import { Button, Form, message } from 'antd'
import UserForm from 'components/shared/UserForm'
import dayjs from 'dayjs'
import { useEffect, useMemo } from 'react'
import { useMutation } from 'react-query'
import UsersService from 'services/Users'

type UserEditTabProps = {
  user: any
  afterUpdated?: () => void
}
export default function UserEditTab ({ user, afterUpdated }: UserEditTabProps) {
  const userId = user?.id
  const [form] = Form.useForm()
  const updater = useMutation(data => UsersService.updateById(userId, data))

  const initialValues = useMemo(() => {
    const result = { ...user }
    result.dob = user?.dob ? dayjs(user.dob) : undefined
    return result
  }, [user])

  useEffect(() => {
    form.resetFields()
  }, [user])

  const handleSubmit = (values: any) => {
    updater.mutate(values, {
      onSuccess: () => {
        afterUpdated && afterUpdated()
        message.success('Profile updated')
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
      <UserForm />
      <Button type='primary' loading={updater.isLoading} onClick={form.submit}>Update</Button>
    </Form>
  )
}
