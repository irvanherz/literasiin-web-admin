import { Typography } from 'antd'

type StoryChapterDetailsTabProps = {
  chapter: any
}
export default function StoryChapterDetailsTab ({ chapter }: StoryChapterDetailsTabProps) {
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <Typography.Title>{chapter?.title}</Typography.Title>
        <Typography.Text>{chapter?.description}</Typography.Text>
      </div>
      <div dangerouslySetInnerHTML={{ __html: chapter?.content || '' }}></div>
    </div>
  )
}
