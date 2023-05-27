import { Tabs } from 'antd'
import AdminGuard from 'components/AdminGuard'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import useConfigurationByName from 'hooks/useConfigurationByName'
import usePublication from 'hooks/usePublication'
import { useNavigate, useParams } from 'react-router-dom'
import PublicationDetailsTab from './PublicationDetailsTab'
import PublicationEditTab from './PublicationEditTab'

export default function ManagePublicationDetails () {
  const params = useParams()
  const navigate = useNavigate()
  const publicationId = +(params?.publicationId || 0)
  const sectionId = params?.sectionId || 'details'
  const { data, refetch } = usePublication(publicationId, { includeAddress: true })
  const publication: any = data?.data
  const { data: dataConfig } = useConfigurationByName('publication-config')
  const config = dataConfig?.data?.value || {}

  const handleChangeSection = (s: string) => {
    navigate(`/publications/${publicationId}/${s}`, { replace: true })
  }

  return (
    <RouteGuard require='authenticated'>
      <AdminGuard>
        <Layout.Admin
          menuProps={{ defaultOpenKeys: ['publications'], selectedKeys: ['publications.items'] }}
          breadcrumb={[
            { title: 'Home', path: '/' },
            { title: 'Publications', path: '/publications' },
            { title: publication?.title, path: `/publications/${publication?.id}` }
          ]}
        >
          <Tabs activeKey={sectionId} onChange={handleChangeSection}>
            <Tabs.TabPane key='details' tab='Details'>
              <PublicationDetailsTab publication={publication} config={config}/>
            </Tabs.TabPane>
            <Tabs.TabPane key='edit' tab='Edit'>
              <PublicationEditTab publication={publication} afterUpdated={refetch} />
            </Tabs.TabPane>
          </Tabs>
        </Layout.Admin>
      </AdminGuard>
    </RouteGuard>
  )
}
