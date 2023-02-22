import { Input, List, Modal } from 'antd'
import useCustomComponent from 'hooks/useCustomComponent'
import { useState } from 'react'
import { useQuery } from 'react-query'
import UsersService from 'services/Users'

type UserInputProps = {
  value?: number
  defaultValue?: number
  onChange?: (v: number) => void
}
export default function UserIdInput ({ value, defaultValue, onChange }: UserInputProps) {
  const [computedValue, triggerValueChange] = useCustomComponent({ value, defaultValue, onChange })
  const [search, setSearch] = useState('')
  const userId = computedValue || 0
  const userQuery = useQuery(`users[${userId}]`, () => UsersService.findById(userId), { enabled: !!userId })
  const usersQuery = useQuery(`users[search:${search}]`, () => UsersService.findMany({ search }))
  const [open, setOpen] = useState(false)

  const currentUser = userQuery?.data?.data

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSelectUser = (user: any) => {
    triggerValueChange(user?.id || 0)
    handleClose()
  }

  const users = usersQuery.data?.data || []
  return (
    <>
      <Input
        disabled={userQuery.isLoading}
        value={currentUser?.fullName || '...'}
        readOnly
        placeholder='Select user'
        onClick={handleOpen}
      />
      <Modal
        centered
        open={open}
        title="Select User"
        onCancel={handleClose}
        footer={null}
      >
        <List
          header={<Input.Search onSearch={q => setSearch(q)} allowClear placeholder='Search...' />}
          dataSource={users}
          renderItem={(user: any) => (
            <List.Item style={{ cursor: 'pointer' }} onClick={() => handleSelectUser(user)}>
              <List.Item.Meta
                title={user.fullName}
                description={user.username}
              />
            </List.Item>
          )}
      />
      </Modal>
    </>

  )
}
