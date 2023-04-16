import { Form, message, Modal } from 'antd'
import UserIdInput from 'components/shared/UserIdInput'
import { cloneElement, ReactElement, useState } from 'react'
import { useMutation } from 'react-query'
import ArticlesService from 'services/Articles'

type ArticleCreateButtonProps = {
  children: ReactElement
  afterCreated?: (data: any) => void
}
export default function ArticleCreateButton ({ children, afterCreated }: ArticleCreateButtonProps) {
  const [open, setOpen] = useState(false)
  const [targetUserId, setTargetUserId] = useState()
  const creator = useMutation((payload:any) => ArticlesService.create(payload))

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSubmit = () => {
    creator.mutate({ userId: targetUserId, title: 'Untitled Article' }, {
      onSuccess: (data) => {
        handleClose()

        if (afterCreated) afterCreated(data?.data)
      },
      onError: (err: any) => {
        message.error(err?.message)
      }
    })
  }

  return (
    <>
      {cloneElement(children, { onClick: handleOpen, loading: creator.isLoading })}
      <Modal
        title="Create an Article"
        centered
        open={open}
        onCancel={handleClose}
        onOk={handleSubmit}
        okButtonProps={{ disabled: !targetUserId }}
      >
        <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
          <Form.Item label="Article owner">
            <UserIdInput value={targetUserId} onChange={setTargetUserId} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
