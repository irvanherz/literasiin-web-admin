import { List } from 'antd'
import { useQuery } from 'react-query'
import StoriesService from 'services/Stories'

type StoryChaptersTabProps = {
  story: any
}
export default function StoryChaptersTab ({ story }: StoryChaptersTabProps) {
  const storyId = story?.id
  const { data } = useQuery('stories.chapters', () => StoriesService.Chapters.findMany({ storyId }), { enabled: !!storyId })
  const chapters: any[] = data?.data || []

  return (
    <List
      dataSource={chapters}
      renderItem={chapter => (
        <List.Item>
          <List.Item.Meta
            title={chapter.title}
            description={chapter.description || <i>No description</i>}
          />
        </List.Item>
      )}
    />
  )
}
