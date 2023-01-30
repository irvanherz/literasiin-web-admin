import { Button, Form, message } from 'antd'
import useAuthContext from 'hooks/useAuthContext'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AuthService from 'services/Auth'
import SigninForm from './SigninForm'

export default function Signin () {
  const auth = useAuthContext()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [form] = Form.useForm()
  const signin = useMutation<any, any, any>(AuthService.signin)

  const handleSubmit = (values: any) => {
    signin.mutate(values, {
      onError: () => {
        message.error('Oops, something went wrong')
      },
      onSuccess: (result) => {
        const { token, refreshToken } = result.meta
        auth.setToken(token, refreshToken)
      }
    })
  }

  useEffect(() => {
    if (auth.status === 'authenticated') {
      const redirect = searchParams.get('redirect') || '/'
      navigate(redirect, { replace: true })
    }
  }, [auth.status])

  return (
    <div>
      <Form
        form={form}
        wrapperCol={{ span: 24 }} labelCol={{ span: 24 }}
        onFinish={handleSubmit}
        style={{ textAlign: 'left' }}
      >
        <SigninForm />
      </Form>
      <Button type="primary" onClick={form.submit} loading={signin.isLoading}>Sign In</Button>
    </div>
  )
}
