import { Form, message, Modal } from 'antd'
import KbCategoryForm from 'components/shared/KbCategoryForm'
import { cloneElement, ReactElement, useState } from 'react'
import { useMutation } from 'react-query'
import KbsService from 'services/Kbs'

type CreateKbButtonProps = {
  children: ReactElement
  afterCreated?: () => void
}

export default function KbCategoryCreateButton ({ children, afterCreated }: CreateKbButtonProps) {
  const creator = useMutation(payload => KbsService.Categories.create(payload))
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleFinish = (values: any) => {
    values.imageId = values.image?.id
    delete values.image
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
        title="Create Knowledge Base Category"
        centered
        onCancel={handleClose}
        confirmLoading={creator.isLoading}
        okText="Submit"
        onOk={form.submit}
      >
        <Form form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={handleFinish} onFinishFailed={handleFinishFailed}>
          <KbCategoryForm />
        </Form>
      </Modal>
    </>
  )
}
