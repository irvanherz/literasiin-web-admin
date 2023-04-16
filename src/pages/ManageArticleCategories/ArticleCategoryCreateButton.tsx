import { Form, message, Modal } from 'antd'
import ArticleCategoryForm from 'components/shared/ArticleCategoryForm'
import { cloneElement, ReactElement, useState } from 'react'
import { useMutation } from 'react-query'
import ArticlesService from 'services/Articles'

type CreateArticleButtonProps = {
  children: ReactElement
  afterCreated?: () => void
}

export default function ArticleCategoryCreateButton ({ children, afterCreated }: CreateArticleButtonProps) {
  const creator = useMutation(payload => ArticlesService.Categories.create(payload))
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()

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
        title="Create Article Category"
        centered
        onCancel={handleClose}
        confirmLoading={creator.isLoading}
        okText="Submit"
        onOk={form.submit}
      >
        <Form form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={handleFinish} onFinishFailed={handleFinishFailed}>
          <ArticleCategoryForm />
        </Form>
      </Modal>
    </>
  )
}
