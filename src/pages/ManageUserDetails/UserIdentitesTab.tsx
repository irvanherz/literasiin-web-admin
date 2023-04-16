import { DeleteFilled, PlusOutlined } from '@ant-design/icons'
import { Button, FloatButton, Form, List, message, Modal } from 'antd'
import IdentityForm from 'components/shared/IdentityForm'
import { cloneElement, ReactElement, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import UsersService from 'services/Users'

type IdentityCreateButtonProps = {
  user: any
  children: ReactElement
  afterCreated?: () => void
}

function IdentityCreateButton ({ user, children, afterCreated }: IdentityCreateButtonProps) {
  const userId = user.id
  const creator = useMutation(payload => UsersService.Identities.create(payload))
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleFinish = (payload: any) => {
    payload.meta = payload.meta ? JSON.parse(payload.meta) : null
    payload.userId = userId

    creator.mutate(payload, {
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
        title="Create User Identity"
        centered={true}
        onCancel={handleClose}
        onOk={form.submit}
        confirmLoading={creator.isLoading}
      >
        <Form form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={handleFinish} onFinishFailed={handleFinishFailed}>
          <IdentityForm />
        </Form>

      </Modal>
    </>
  )
}

type UserIdentitesItemProps = {
  identity: any
  afterDeleted?: () => void
}

function UserIdentitesItem ({ identity, afterDeleted }: UserIdentitesItemProps) {
  const identityId = identity?.id
  const deletor = useMutation(() => UsersService.Identities.deleteById(identityId))

  const handleDelete = () => {
    Modal.confirm({
      centered: true,
      title: 'Confirm',
      content: 'Are you sure you want to delete this identity?',
      onOk: async () => {
        try {
          await deletor.mutateAsync()
          if (afterDeleted) afterDeleted()
        } catch (err: any) {
          message.error(err?.message)
        }
      }
    })
  }

  return (
    <List.Item extra={<Button onClick={handleDelete} shape='circle' icon={<DeleteFilled />} />}>
      <List.Item.Meta
        title={identity.type}
        description={`KEY: ${identity.key}`}
      />
    </List.Item>
  )
}

type UserIdentitesTabProps = {
  user: any
}

export default function UserIdentitesTab ({ user }: UserIdentitesTabProps) {
  const userId = user?.id
  const { data, refetch } = useQuery(`user.identities.${userId}`, () => UsersService.Identities.findMany({ userId }))
  const identities: any[] = data?.data || []

  return (
    <>
      <List
        dataSource={identities}
        renderItem={identity => <UserIdentitesItem identity={identity} afterDeleted={refetch} />}
      />
      <IdentityCreateButton user={user} afterCreated={refetch}>
        <FloatButton icon={<PlusOutlined />} />
      </IdentityCreateButton>

    </>

  )
}
