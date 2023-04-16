import { Typography } from 'antd'
import StoryCover from 'components/StoryCover'

type StoryDetailsTabProps = {
  story: any
}
export default function StoryDetailsTab ({ story }: StoryDetailsTabProps) {
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <Typography.Title>{story?.title}</Typography.Title>
        <Typography.Text>{story?.description}</Typography.Text>
      </div>
      <div style={{ maxWidth: 500, margin: '0 auto' }}><StoryCover story={story} /></div>
      <div dangerouslySetInnerHTML={{ __html: story?.content || '' }}></div>
    </div>
  )
}
