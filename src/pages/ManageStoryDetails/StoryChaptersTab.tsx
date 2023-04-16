import { DeleteFilled, EditFilled, EyeFilled, PlusOutlined } from '@ant-design/icons'
import { Button, List, Space, Tag, Typography } from 'antd'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import StoriesService from 'services/Stories'
import StoryChapterCreateButton from './StoryChapterCreateButton'
import StoryChapterDeleteButton from './StoryChapterDeleteButton'

type StoryChaptersTabProps = {
  story: any
}
export default function StoryChaptersTab ({ story }: StoryChaptersTabProps) {
  const storyId = +(story?.id || 0)
  const { data, refetch } = useQuery(`stories[${storyId}].chapters`, () => StoriesService.Chapters.findMany({ storyId, status: 'any' }), { enabled: !!storyId })
  const chapters: any[] = data?.data || []
  return (
    <List
      dataSource={chapters}
      renderItem={chapter => (
        <List.Item
          extra={
            <Space>
              <Link to={`/stories/chapters/${chapter.id}/edit`}>
                <Button icon={<EditFilled />} shape='circle' />
              </Link>
              <Link to={`/stories/chapters/${chapter.id}`}>
                <Button icon={<EyeFilled />} shape='circle' />
              </Link>
              <StoryChapterDeleteButton story={chapter} afterDeleted={refetch}>
                <Button icon={<DeleteFilled />} danger shape='circle' />
              </StoryChapterDeleteButton>
            </Space>
          }
        >
          <List.Item.Meta
            title={
              <Space>
                <span>{chapter?.title}</span>
                {chapter?.status === 'draft' && <Tag color='red'>DRAFT</Tag>}
              </Space>
            }
            description={
              <Typography.Paragraph ellipsis={{ rows: 2 }}>{chapter.description}</Typography.Paragraph>
            }
          />
        </List.Item>
      )}
      footer={
        <div style={{ textAlign: 'center' }}>
          <StoryChapterCreateButton story={story} afterCreated={refetch}>
            <Button icon={<PlusOutlined />}>Add new Chapter</Button>
          </StoryChapterCreateButton>
        </div>
      }
    />
  )
}
