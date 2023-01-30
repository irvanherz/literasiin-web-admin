import { Button, Form, message } from 'antd'
import { useMutation } from 'react-query'
import AuthService from 'services/Auth'
import SignupForm from './SignupForm'

export default function Signup () {
  const signup = useMutation<any, any, any>(AuthService.signup)
  const [form] = Form.useForm()

  const handleSubmit = (values: any) => {
    delete values.passwordConfirmation
    signup.mutate(values, {
      onError: () => {
        message.error('Oops, something went wrong')
      }
    })
  }

  const handleValidationFailed = () => {
    message.error('Check all fields and then try again')
  }

  return (
    <div>
      <Form
        form={form}
        wrapperCol={{ span: 24 }}
        labelCol={{ span: 24 }}
        onFinish={handleSubmit} onFinishFailed={handleValidationFailed}
        style={{ textAlign: 'left' }}
      >
        <SignupForm />
      </Form>
      <Button type="primary" onClick={form.submit}>Sign Up</Button>
    </div>
  )
}
