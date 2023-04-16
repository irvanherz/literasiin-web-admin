import { Tabs } from 'antd'
import AdminGuard from 'components/AdminGuard'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import ArticlesService from 'services/Articles'
import ArticleDetailsTab from './ArticleDetailsTab'
import ArticleEditTab from './ArticleEditTab'

export default function ManageArticleDetails () {
  const params = useParams()
  const navigate = useNavigate()
  const articleId = +(params?.articleId || 0)
  const sectionId = params?.sectionId || 'details'
  const { data, refetch } = useQuery(`articles[${articleId}]`, () => ArticlesService.findById(articleId))
  const article: any = data?.data

  const handleChangeSection = (s: string) => {
    navigate(`/articles/${articleId}/${s}`, { replace: true })
  }

  return (
    <RouteGuard require='authenticated'>
      <AdminGuard>
        <Layout.Admin
          menuProps={{ defaultOpenKeys: ['articles'], selectedKeys: ['articles.items'] }}
          breadcrumb={[
            { title: 'Home', path: '/' },
            { title: 'Articles', path: '/articles' },
            { title: article?.title, path: `/articles/${article?.id}` }
          ]}
        >
          <Tabs activeKey={sectionId} onChange={handleChangeSection}>
            <Tabs.TabPane key='details' tab='Details'>
              <ArticleDetailsTab article={article} />
            </Tabs.TabPane>
            <Tabs.TabPane key='edit' tab='Edit'>
              <ArticleEditTab article={article} afterUpdated={refetch} />
            </Tabs.TabPane>
          </Tabs>
        </Layout.Admin>
      </AdminGuard>
    </RouteGuard>
  )
}
