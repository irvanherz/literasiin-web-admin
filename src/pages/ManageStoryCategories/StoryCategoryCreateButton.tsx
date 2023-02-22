import { Form, message, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import StoryCategoryForm from 'components/shared/StoryCategoryForm'
import { cloneElement, ReactElement, useState } from 'react'
import { useMutation } from 'react-query'
import StoriesService from 'services/Stories'

type CreateStoryButtonProps = {
  children: ReactElement
  afterCreated?: () => void
}

export default function StoryCategoryCreateButton ({ children, afterCreated }: CreateStoryButtonProps) {
  const creator = useMutation(payload => StoriesService.Categories.create(payload))
  const [open, setOpen] = useState(false)
  const [form] = useForm()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleFinish = (values: any) => {
    creator.mutate(values, {
      onSuccess: () => {
        form.resetFields()
        handleClose()
        if (afterCreated) afterCreated()
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
    <>
      {cloneElement(children, { onClick: handleOpen })}
      <Modal
        open={open}
        title="Create Story Category"
        centered
        onCancel={handleClose}
        confirmLoading={creator.isLoading}
        okText="Submit"
        onOk={form.submit}
      >
        <Form form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={handleFinish} onFinishFailed={handleFinishFailed}>
          <StoryCategoryForm />
        </Form>
      </Modal>
    </>
  )
}
