import { Card, Col, Menu, Row, Space, Typography } from 'antd'
import StoryCover from 'components/StoryCover'
import { DEFAULT_IMAGE } from 'libs/variables'

type StorySummaryTabProps = {
  story: any
}

export default function StorySummaryTab ({ story }: StorySummaryTabProps) {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <StoryCover src={DEFAULT_IMAGE} />
        </Col>
        <Col xs={24} md={18}>
          <Space direction='vertical' style={{ width: '100%' }}>
            <Card>
              <Typography.Title level={2} style={{ marginTop: 0 }}>{story?.title}</Typography.Title>
              <Typography.Paragraph>{story?.description}</Typography.Paragraph>
              <div>Copyright</div>
              <div>tags</div>
            </Card>
            <Card title="Chapters">
              <Menu items={[{ key: '1', label: 'Chapter 1' }, { key: '2', label: 'Chapter 2' }]} />
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  )
}
