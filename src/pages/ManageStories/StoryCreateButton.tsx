import { Form, message, Modal } from 'antd'
import UserIdInput from 'components/shared/UserIdInput'
import { cloneElement, ReactElement, useState } from 'react'
import { useMutation } from 'react-query'
import StoriesService from 'services/Stories'

type StoryCreateButtonProps = {
  children: ReactElement
  afterCreated?: (data: any) => void
}
export default function StoryCreateButton ({ children, afterCreated }: StoryCreateButtonProps) {
  const [open, setOpen] = useState(false)
  const [targetUserId, setTargetUserId] = useState()
  const creator = useMutation((payload:any) => StoriesService.create(payload))

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSubmit = () => {
    creator.mutate({ userId: targetUserId, title: 'Untitled Story' }, {
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
        title="Create a Story"
        centered
        open={open}
        onCancel={handleClose}
        onOk={handleSubmit}
        okButtonProps={{ disabled: !targetUserId }}
      >
        <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
          <Form.Item label="Story owner">
            <UserIdInput value={targetUserId} onChange={setTargetUserId} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
