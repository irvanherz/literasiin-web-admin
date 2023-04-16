import { Descriptions } from 'antd'
import dayjs from 'dayjs'

type UserIdentitesTabProps = {
  user: any
}
export default function UserSummaryTab ({ user }: UserIdentitesTabProps) {
  return (
    <Descriptions title="User Info" column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }} bordered>
      <Descriptions.Item label="ID">{user?.id}</Descriptions.Item>
      <Descriptions.Item label="Username">{user?.username}</Descriptions.Item>
      <Descriptions.Item label="Role">{user?.role}</Descriptions.Item>
      <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
      <Descriptions.Item label="Full Name">{user?.fullName || '-'}</Descriptions.Item>
      <Descriptions.Item label="Gender">{(user?.gender || '-').toUpperCase()}</Descriptions.Item>
      <Descriptions.Item label="Date of Birth">{user?.dob || '-'}</Descriptions.Item>
      <Descriptions.Item label="Registered Date">{dayjs(user?.createdAt).fromNow()}</Descriptions.Item>
    </Descriptions>
  )
}
