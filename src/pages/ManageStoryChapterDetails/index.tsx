import { Tabs } from 'antd'
import AdminGuard from 'components/AdminGuard'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import { titleCase } from 'libs/common'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import StoriesService from 'services/Stories'
import StoryChapterDetailsTab from './StoryChapterDetailsTab'
import StoryChapterEditTab from './StoryChapterEditTab'

export default function ManageStoryChapterDetails () {
  const params = useParams()
  const navigate = useNavigate()
  const chapterId = +(params?.chapterId || 0)
  const sectionId = params?.sectionId || 'details'
  const { data, refetch } = useQuery(`story.chapters[${chapterId}]`, () => StoriesService.Chapters.findById(chapterId, { includeStory: true }), { enabled: !!chapterId })
  const chapter: any = data?.data

  const handleChangeSection = (s: string) => {
    navigate(`/stories/chapters/${chapterId}/${s}`, { replace: true })
  }

  return (
    <RouteGuard require='authenticated'>
      <AdminGuard>
        <Layout.Admin
          menuProps={{ defaultOpenKeys: ['chapters'], selectedKeys: ['chapters.items'] }}
          breadcrumb={[
            { title: 'Home', path: '/' },
            { title: 'Stories', path: '/stories' },
            { title: chapter?.title, path: `/chapters/${chapter?.id}` },
            { title: titleCase(sectionId || ''), path: `/${sectionId}` }
          ]}
        >
          <Tabs activeKey={sectionId} onChange={handleChangeSection}>
            <Tabs.TabPane key='details' tab='Details'>
              <StoryChapterDetailsTab chapter={chapter} />
            </Tabs.TabPane>
            <Tabs.TabPane key='edit' tab='Edit'>
              <StoryChapterEditTab chapter={chapter} afterUpdated={refetch}/>
            </Tabs.TabPane>
          </Tabs>
        </Layout.Admin>
      </AdminGuard>
    </RouteGuard>
  )
}
