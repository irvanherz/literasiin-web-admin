import { List } from 'antd'
import useWallets from 'hooks/useWallets'

type UserWalletsTabProps = {
  user: any
}

const formatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })

export default function UserWalletsTab ({ user }: UserWalletsTabProps) {
  const userId = user?.id
  const { data } = useWallets({ userId }, { enabled: !!userId })
  const wallets: any[] = data?.data || []

  return (
    <List
      dataSource={wallets}
      renderItem={wallet => (
        <List.Item>
          <List.Item.Meta
            title={'Wallet'}
            description={formatter.format(+wallet?.balance)}
        />
        </List.Item>
      )}
    />
  )
}
