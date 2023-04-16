import { DeleteFilled, EyeFilled, InfoCircleFilled, PlusOutlined } from '@ant-design/icons'
import CodeEditor from '@uiw/react-textarea-code-editor'
import { Card, Col, Descriptions, FloatButton, Image, Input, List, message, Modal, Pagination, Row, Select, Space, Tag, Typography } from 'antd'
import AdminGuard from 'components/AdminGuard'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import UserIdInput from 'components/shared/UserIdInput'
import dayjs from 'dayjs'
import useMediaDelete from 'hooks/useMediaDelete'
import useMediaList from 'hooks/useMediaList'
import useQueryFilters, { FilterConfig } from 'hooks/useQueryFilters'
import { DEFAULT_IMAGE } from 'libs/variables'
import Media from 'models/Media'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import CreateMediaButton from './CreateMediaButton'

const MediaItemWrapper = styled.div`
height: 0;
position: relative;
width: 100%;
padding-bottom: 100%;
img {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.media-actions {
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  opacity: 0;
  &:hover {
    opacity: 1;
  }
  .media-action-item {
    color: #FFF;
    font-weight: 900;
    text-align: center;
    button {
      cursor: pointer;
      border: none;
      background: none;
      color: #FFF;
      font-weight: 900;
    }
  }
}
.media-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  background: rgba(0,0,0,0.5);
  color: #FFF;
}
.ant-modal-confirm-content {
  width: 100%;
}
`
type MediaItemProps = { media: any, afterDeleted: any }
function MediaItem ({ media, afterDeleted }: MediaItemProps) {
  const [showPreview, setShowPreview] = useState(false)
  const img = new Media(media)
  const wrapperRef = useRef(null)
  const deleter = useMediaDelete()

  const handleShowPreview = () => setShowPreview(true)
  const handleShowInfo = () => {
    Modal.info({
      width: 600,
      icon: null,
      getContainer: () => wrapperRef?.current as any,
      bodyStyle: { width: '100%' },
      content: (
        <Space direction='vertical' style={{ width: '100%' }}>
          <Descriptions title="Image Info" column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }} bordered>
            <Descriptions.Item label="ID">{media?.id}</Descriptions.Item>
            <Descriptions.Item label="Name">{media?.meta?.originalName}</Descriptions.Item>
            <Descriptions.Item label="Type">{media?.type}</Descriptions.Item>
            <Descriptions.Item label="Tags">{(media?.tags || []).map((tag: any) => <Tag key={tag}>{tag}</Tag>)}</Descriptions.Item>
            <Descriptions.Item label="Created at">{dayjs(media?.createdAt).fromNow()}</Descriptions.Item>
          </Descriptions>
          <Card
            title='Metadata'
            bodyStyle={{ padding: 0 }}
          >
            <CodeEditor
              value={JSON.stringify(media?.meta, null, 2)}
              readOnly
              rows={20}
              language="json"
              placeholder="Please input JSON configuration"
              padding={15}
              style={{
                fontSize: 10,
                backgroundColor: '#f5f5f5',
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                maxHeight: 300,
                overflow: 'auto'
              }}
            />
          </Card>
        </Space>

      )
    })
  }
  const handleDelete = () => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this media?',
      onOk: async () => {
        try {
          await deleter.mutateAsync(media.id)
          afterDeleted && afterDeleted()
        } catch (err: any) {
          message.error(err?.message)
        }
      }
    })
  }
  return (
    <MediaItemWrapper ref={wrapperRef}>
      <img src={img?.md?.url || DEFAULT_IMAGE} />
      <div className='media-actions'>
        <div className='media-action-item'>
          <button onClick={handleShowPreview}><EyeFilled /></button>
        </div>
        <div className='media-action-item'>
          <button onClick={handleShowInfo}><InfoCircleFilled /></button>
        </div>
        <div className='media-action-item'>
          <button onClick={handleDelete}><DeleteFilled /></button>
        </div>
      </div>
      <div className='media-info'>
        <div style={{ opacity: 0.7, fontSize: 'small' }}>Uploaded by</div>
        <div>{media?.user?.fullName}</div>
      </div>
      <Image src={img?.md?.url || DEFAULT_IMAGE} hidden preview={{ visible: showPreview, onVisibleChange: setShowPreview }}/>
    </MediaItemWrapper>
  )
}

const FILT: Record<string, FilterConfig> = {
  search: {
    match: /.*/,
    default: ''
  },
  type: {
    match: /(image|video|document)/,
    default: 'image'
  },
  userId: {
    match: /([0-9]+)|any/,
    default: 'any'
  },
  page: {
    match: /[0-9]+/,
    default: '1'
  },
  sort: {
    match: /(newest|oldest)/,
    default: 'newest',
    translate: value => {
      const MAP = {
        newest: { sortBy: 'createdAt', sortOrder: 'desc' },
        oldest: { sortBy: 'createdAt', sortOrder: 'asc' }
      }
      const key = value as keyof typeof MAP
      return MAP[key] || MAP.newest
    }
  }
}

const SORT_OPTIONS = [{ label: 'Newest', value: 'newest' }, { label: 'Oldest', value: 'oldest' }]
const TYPE_OPTIONS = [{ label: 'Image', value: 'image' }, { label: 'Video', value: 'video' }, { label: 'Document', value: 'document' }]

export default function ManageMedia () {
  const [filters, apiFilter, refilter] = useQueryFilters(FILT)
  const { data, refetch } = useMediaList(apiFilter)
  const meta = data?.meta || {}
  const media: any[] = data?.data || []
  return (
    <RouteGuard require='authenticated'>
      <AdminGuard>
        <Layout.Admin
          menuProps={{ selectedKeys: ['media'] }}
          applet={
            <Row gutter={8}>
              <Col span={5}>
                <Space direction='vertical' style={{ width: '100%' }}>
                  <Typography.Text>Search</Typography.Text>
                  <Input.Search allowClear defaultValue={filters.search} onSearch={q => refilter({ search: q, page: 1 })} placeholder='Search story...' />
                </Space>
              </Col>
              <Col span={5}>
                <Space direction='vertical' style={{ width: '100%' }}>
                  <Typography.Text>User</Typography.Text>
                  <UserIdInput defaultValue={filters.userId} onChange={v => refilter({ userId: v, page: 1 })} />
                </Space>
              </Col>
              <Col span={5}>
                <Space direction='vertical' style={{ width: '100%' }}>
                  <Typography.Text>Type</Typography.Text>
                  <Select defaultValue={filters.type} onChange={v => refilter({ type: v, page: 1 })} options={TYPE_OPTIONS} style={{ width: '100%' }} placeholder="Type..." />
                </Space>
              </Col>
              <Col span={5}>
                <Space direction='vertical' style={{ width: '100%' }}>
                  <Typography.Text>Sort</Typography.Text>
                  <Select defaultValue={filters.sort} onChange={v => refilter({ sort: v })} options={SORT_OPTIONS} style={{ width: '100%' }} placeholder="Sort..." />
                </Space>
              </Col>
            </Row>
          }
        >
          <Space direction='vertical' style={{ width: '100%' }}>
            <List
              dataSource={media}
              grid={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }}
              renderItem={m => (
                <MediaItem media={m} afterDeleted={refetch} />
              )}
              footer={
                <Pagination
                  pageSize={1}
                  total={meta?.numPages}
                  current={meta?.page || 0}
                  onChange={p => refilter({ page: p })}
              />
            }
          />
          </Space>
          <CreateMediaButton afterCreated={refetch}>
            <FloatButton icon={<PlusOutlined />} />
          </CreateMediaButton>
        </Layout.Admin>
      </AdminGuard>
    </RouteGuard>
  )
}
