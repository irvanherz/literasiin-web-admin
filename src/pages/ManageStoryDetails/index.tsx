import { Tabs } from 'antd'
import AdminGuard from 'components/AdminGuard'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import { titleCase } from 'libs/common'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import StoriesService from 'services/Stories'
import StoryChaptersTab from './StoryChaptersTab'
import StoryDetailsTab from './StoryDetailsTab'
import StoryEditTab from './StoryEditTab'

export default function ManageStoryDetails () {
  const params = useParams()
  const navigate = useNavigate()
  const storyId = +(params?.storyId || 0)
  const sectionId = params?.sectionId || 'details'
  const { data, refetch } = useQuery(`stories[${storyId}]`, () => StoriesService.findById(storyId))
  const story: any = data?.data

  const handleChangeSection = (s: string) => {
    navigate(`/stories/${storyId}/${s}`, { replace: true })
  }

  return (
    <RouteGuard require='authenticated'>
      <AdminGuard>
        <Layout.Admin
          menuProps={{ defaultOpenKeys: ['stories'], selectedKeys: ['stories.items'] }}
          breadcrumb={[
            { title: 'Home', path: '/' },
            { title: 'Stories', path: '/stories' },
            { title: story?.title, path: `/${story?.id}` },
            { title: titleCase(sectionId || ''), path: `/${sectionId}` }
          ]}
        >
          <Tabs activeKey={sectionId} onChange={handleChangeSection}>
            <Tabs.TabPane key='details' tab='Details'>
              <StoryDetailsTab story={story} />
            </Tabs.TabPane>
            <Tabs.TabPane key='edit' tab='Edit'>
              <StoryEditTab story={story} afterUpdated={refetch} />
            </Tabs.TabPane>
            <Tabs.TabPane key='chapters' tab='Chapters'>
              <StoryChaptersTab story={story} />
            </Tabs.TabPane>
          </Tabs>
        </Layout.Admin>
      </AdminGuard>
    </RouteGuard>
  )
}
