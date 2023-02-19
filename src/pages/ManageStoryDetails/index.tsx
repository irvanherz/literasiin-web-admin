import { Space, Tabs } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import StoriesService from 'services/Stories'
import StoryChaptersTab from './StoryChaptersTab'
import StoryEditTab from './StoryEditTab'
import StorySummaryTab from './StorySummaryTab'

export default function ManageStoryDetails () {
  const params = useParams()
  const storyId = +(params?.id || 0)
  const { data } = useQuery(`story[${storyId}]`, () => StoriesService.findById(storyId))
  const story: any = data?.data

  return (
    <RouteGuard require='authenticated'>
      <Layout.Admin
        breadcrumb={[
          { breadcrumbName: 'Home', path: '/' },
          { breadcrumbName: 'Stories', path: '/stories' },
          { breadcrumbName: story?.title, path: `/stories/${story?.id}` }
        ]}
      >
        <Space direction='vertical' style={{ width: '100%' }}>
          <Tabs>
            <Tabs.TabPane key="a" tab="Summary">
              <StorySummaryTab story={story}/>
            </Tabs.TabPane>
            <Tabs.TabPane key="b" tab="Edit">
              <StoryEditTab story={story} />
            </Tabs.TabPane>
            <Tabs.TabPane key="c" tab="Chapters">
              <StoryChaptersTab story={story} />
            </Tabs.TabPane>
          </Tabs>
        </Space>
      </Layout.Admin>
    </RouteGuard>
  )
}
