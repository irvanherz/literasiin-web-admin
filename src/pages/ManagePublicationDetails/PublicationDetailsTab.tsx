import { Col, Descriptions, Divider, Row } from 'antd'
import PublicationCover from 'components/PublicationCover'
import { useMemo } from 'react'

type PublicationDetailsTabProps = {
  publication: any
  config: any
}

export default function PublicationDetailsTab ({ publication, config }: PublicationDetailsTabProps) {
  const indiePublishingPackages: any[] = config?.indiePublishingPackages || []
  const renderedMeta = useMemo(() => {
    const meta = publication?.meta || {}

    if (publication?.type === 'indie') {
      const packageId = meta?.packageId
      const packageConfig = indiePublishingPackages.find(pkg => pkg.id === packageId)
      const shipping = meta.shipping || {}
      return (
        <Descriptions layout="vertical">
          <Descriptions.Item label='Publishing Package'>{packageConfig?.name || <i>Not yet selected</i>}</Descriptions.Item>
          <Descriptions.Item label='Shipping Method'>{shipping?.courier_name ? `${shipping.courier_name} - ${shipping.courier_service_name}` : <i>Not yet selected</i>}</Descriptions.Item>
          <Descriptions.Item label='Shipping Address'>{publication?.address?.address || <i> Not selected yet</i>}</Descriptions.Item>
        </Descriptions>
      )
    } else if (publication?.type === 'selfpub') {
      const shipping = meta.shipping || {}
      return (
        <Descriptions layout="vertical">
          <Descriptions.Item label='Paper Type'>{meta?.paperType || <i>Not selected yet</i>}</Descriptions.Item>
          <Descriptions.Item label='Number of Black-White Pages'>{meta?.numBwPages || 0}</Descriptions.Item>
          <Descriptions.Item label='Number of Color Pages'>{meta?.numColorPages || 0}</Descriptions.Item>
          <Descriptions.Item label='Number of Copies'>{meta?.numCopies || 0}</Descriptions.Item>
          <Descriptions.Item label='Shipping Method'>{shipping?.courier_name ? `${shipping.courier_name} - ${shipping.courier_service_name}` : <i>Not yet selected</i>}</Descriptions.Item>
          <Descriptions.Item label='Shipping Address'>{publication?.address?.address || <i> Not selected yet</i>}</Descriptions.Item>
        </Descriptions>
      )
    } else { return null }
  }, [publication, config])
  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <PublicationCover publication={publication} />
      </Col>
      <Col span={18}>
        <Descriptions layout="vertical">
          <Descriptions.Item label='Title'>{publication?.title || <i>Not filled yet</i>}</Descriptions.Item>
          <Descriptions.Item label='Author'>{publication?.author || <i>Not filled yet</i>}</Descriptions.Item>
          <Descriptions.Item label='Type'>{publication?.type || <i>Not filled yet</i>}</Descriptions.Item>
          <Descriptions.Item label='Status'>{publication?.status}</Descriptions.Item>
          <Descriptions.Item label='Royalty'>{publication?.royalty}</Descriptions.Item>
        </Descriptions>
        <Divider />
        {renderedMeta}
      </Col>
    </Row>
  )
}
