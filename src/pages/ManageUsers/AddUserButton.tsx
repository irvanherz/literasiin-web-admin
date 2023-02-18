import { Form, message, Modal } from 'antd'
import UserForm from 'components/shared/UserForm'
import { cloneElement, ReactElement, useState } from 'react'
import { useMutation } from 'react-query'
import UsersService from 'services/Users'

type AddUserButtonProps = {
  children: ReactElement
  afterCreated?: () => void
}

export default function AddUserButton ({ children, afterCreated } : AddUserButtonProps) {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const creator = useMutation(UsersService.create)

  const handleClick = () => setOpen(!open)

  const handleSubmit = (values: any) => {
    creator.mutate(values, {
      onSuccess: () => {
        afterCreated && afterCreated()
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
    <>
      {cloneElement(children, { onClick: handleClick })}
      <Modal
        title="Create User"
        centered
        open={open}
        onCancel={handleClick}
        maskClosable={false}
        onOk={form.submit}
      >
        <Form form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={handleSubmit} onFinishFailed={handleValidationError}>
          <UserForm />
        </Form>
      </Modal>
    </>
  )
}
