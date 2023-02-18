import { Descriptions } from 'antd'
import moment from 'moment-timezone'

type UserIdentitesTabProps = {
  user: any
}
export default function UserSummaryTab ({ user }: UserIdentitesTabProps) {
  return (
    <Descriptions title="User Info" column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }} bordered>
      <Descriptions.Item label="ID">{user?.id}</Descriptions.Item>
      <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
      <Descriptions.Item label="Full Name">{user?.fullName || '-'}</Descriptions.Item>
      <Descriptions.Item label="Gender">{(user?.gender || '-').toUpperCase()}</Descriptions.Item>
      <Descriptions.Item label="Date of Birth">{user?.dob || '-'}</Descriptions.Item>
      <Descriptions.Item label="Registered Date">{moment(user?.createdAt).format('LLLL')}</Descriptions.Item>
    </Descriptions>
  )
}
