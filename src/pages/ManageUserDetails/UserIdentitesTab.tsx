import { List } from 'antd'
import { useQuery } from 'react-query'
import UsersService from 'services/Users'

type UserIdentitesTabProps = {
  user: any
}
export default function UserIdentitesTab ({ user }: UserIdentitesTabProps) {
  const userId = user.id
  const { data } = useQuery(`user.identities.${userId}`, () => UsersService.Identities.findMany({ userId }))
  const identities: any[] = data?.data || []

  return (
    <List
      dataSource={identities}
      renderItem={identity => (
        <List.Item>
          <List.Item.Meta
            title={identity.type}
            description={`KEY: ${identity.key}`}
        />
        </List.Item>
      )}
    />
  )
}
