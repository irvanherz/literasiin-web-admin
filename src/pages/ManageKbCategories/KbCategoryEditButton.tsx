import { Form, message, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import KbCategoryForm from 'components/shared/KbCategoryForm'
import { cloneElement, ReactElement, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import KbsService from 'services/Kbs'

type CreateArticleButtonProps = {
  category: any
  children: ReactElement
  afterUpdated?: () => void
}

export default function ArticleCategoryEditButton ({ children, category, afterUpdated }: CreateArticleButtonProps) {
  const categoryId = category?.id
  const updater = useMutation(payload => KbsService.Categories.updateById(categoryId, payload))
  const [open, setOpen] = useState(false)
  const [form] = useForm()
  const initialValues = category

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleFinish = (values: any) => {
    values.imageId = values.image?.id
    delete values.image
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
        title="Update Article Category"
        centered
        onCancel={handleClose}
        confirmLoading={updater.isLoading}
        okText="Submit"
        onOk={form.submit}
      >
        <Form initialValues={initialValues} form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={handleFinish} onFinishFailed={handleFinishFailed}>
          <KbCategoryForm />
        </Form>
      </Modal>
    </>
  )
}
