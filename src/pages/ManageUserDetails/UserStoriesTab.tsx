import { List } from 'antd'
import { useQuery } from 'react-query'
import StoriesService from 'services/Stories'

type UserStoriesTabProps = {
  user: any
}
export default function UserStoriesTab ({ user }: UserStoriesTabProps) {
  const userId = user?.id
  const { data } = useQuery(`user[${userId}].stories`, () => StoriesService.findMany({ userId }), { enabled: !!userId })
  const stories: any[] = data?.data || []

  return (
    <List
      dataSource={stories}
      renderItem={story => (
        <List.Item>
          <List.Item.Meta
            title={story?.title}
            description={story?.description}
        />
        </List.Item>
      )}
    />
  )
}
