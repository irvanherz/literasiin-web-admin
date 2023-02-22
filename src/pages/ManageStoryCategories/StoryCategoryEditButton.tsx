import { Form, message, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import StoryCategoryForm from 'components/shared/StoryCategoryForm'
import { cloneElement, ReactElement, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import StoriesService from 'services/Stories'

type CreateStoryButtonProps = {
  category: any
  children: ReactElement
  afterUpdated?: () => void
}

export default function StoryCategoryEditButton ({ children, category, afterUpdated }: CreateStoryButtonProps) {
  const categoryId = category?.id
  const updater = useMutation(payload => StoriesService.Categories.updateById(categoryId, payload))
  const [open, setOpen] = useState(false)
  const [form] = useForm()
  const initialValues = category

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleFinish = (values: any) => {
    updater.mutate(values, {
      onSuccess: () => {
        form.resetFields()
        handleClose()
        if (afterUpdated) afterUpdated()
      },
      onError: (err: any) => {
        message.error(err?.message)
      }
    })
  }

  useEffect(() => {
    form.resetFields()
  }, [open, category])

  const handleFinishFailed = () => {
    message.error('Check all fields and try again')
  }

  return (
    <>
      {cloneElement(children, { onClick: handleOpen })}
      <Modal
        open={open}
        title="Update Story Category"
        centered
        onCancel={handleClose}
        confirmLoading={updater.isLoading}
        okText="Submit"
        onOk={form.submit}
      >
        <Form initialValues={initialValues} form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={handleFinish} onFinishFailed={handleFinishFailed}>
          <StoryCategoryForm />
        </Form>
      </Modal>
    </>
  )
}
