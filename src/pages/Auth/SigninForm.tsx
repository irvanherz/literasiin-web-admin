import { Form, Input } from 'antd'

export default function SigninForm () {
  // const form = Form.useFormInstance()
  return (
    <Form.Provider>
      <Form.Item
        label="Username or email"
        name='username'
        rules={[{ required: true, message: 'Username or email is required' }]}
      >
        <Input type="email" placeholder="Email"/>
      </Form.Item>
      <Form.Item
        label="Password"
        name='password'
        rules={[{ required: true, message: 'Password is required' }]}
      >
        <Input type="password" placeholder="Password"/>
      </Form.Item>
    </Form.Provider>
  )
}
