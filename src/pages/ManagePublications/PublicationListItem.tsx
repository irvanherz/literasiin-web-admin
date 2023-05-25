import { DeleteFilled, EditFilled, MoreOutlined, SendOutlined } from '@ant-design/icons'
import { Button, Descriptions, Dropdown, List, MenuProps, message, Modal, Space, Tag } from 'antd'
import PublicationCover from 'components/PublicationCover'
import usePublicationDelete from 'hooks/usePublicationDelete'
import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

type PublicationMetaProps = { publication: any }
function PublicationMeta ({ publication }: PublicationMetaProps) {
  const renderedPublicationType = ({ indie: 'Indie Publishing', selfpub: 'Self Publishing' } as any)[publication.type] || <i>Not yet filled</i>
  const renderedPublicationStatus = ({ draft: 'DRAFT', payment: 'Waiting Payment', publishing: 'Publishing', shipping: 'Shipping', published: 'Published' } as any)[publication.status] || <i>N/A</i>

  return (
    <Descriptions >
      <Descriptions.Item label="Author">{publication.author || <i>Not yet filled</i>}</Descriptions.Item>
      <Descriptions.Item label="Type">{renderedPublicationType}</Descriptions.Item>
      <Descriptions.Item label="Status">{renderedPublicationStatus}</Descriptions.Item>
      <Descriptions.Item label="Shipping Address">{publication.address?.address || <i>Not yet selected</i>}</Descriptions.Item>
    </Descriptions>
  )
}

const StyledListItem = styled(List.Item)`
@media only screen and (max-width: 500px) {
  flex-direction: column;
  .ant-list-item-meta {
    width: 100%;
  }
  .list-item-actions {
    padding-top: 16px;
  }
}
.ant-list-item-meta-avatar {
  place-self: start;
}
.ant-list-item-meta-title {
  margin-top: 0;
}
`

type PublicationListItemProps = {
  publication: any
  afterDeleted?: () => void
  afterUpdated?: () => void
}

export default function PublicationListItem ({ publication, afterUpdated, afterDeleted }: PublicationListItemProps) {
  const publicationId = publication.id
  const navigate = useNavigate()
  const remover = usePublicationDelete()

  const handleEdit = () => navigate(`/publications/${publicationId}/edit`)
  const handleDelete = () => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this publication?',
      centered: true,
      onOk: async () => {
        try {
          await remover.mutateAsync(publicationId)
          if (afterDeleted) afterDeleted()
        } catch (err: any) {
          message.error(err?.message)
        }
      }
    })
  }

  const handleProcessShipping = () => {
    Modal.confirm({
      centered: true,
      title: 'Confirm',
      content: 'Are you sure you want to process shipping?'
    })
  }

  const menu: MenuProps = useMemo(() => {
    const items = [
      { key: 'edit', icon: <EditFilled />, label: 'Edit', onClick: handleEdit }
    ]
    if (publication.status === 'publishing') { items.push({ key: 'ship', icon: <SendOutlined />, label: 'Process shipping', onClick: handleProcessShipping }) }
    items.push({ key: 'delete', icon: <DeleteFilled />, label: 'Delete', onClick: handleDelete })
    return { items }
  }, [publication])

  return (
    <StyledListItem
      extra={
        <div className='list-item-actions'>
          <Space>
            <Dropdown
              menu={menu}
            >
              <Button shape='circle' icon={<MoreOutlined />} />
            </Dropdown>
          </Space>
        </div>
      }
    >
      <List.Item.Meta
        style={{ alignItems: 'center' }}
        avatar={
          <div style={{ minWidth: 72 }}>
            <PublicationCover publication={publication} style={{ borderRadius: 8, overflow: 'hidden' }}/>
          </div>
        }
        title={
          <Space>
            <span>{publication.title}</span>
            {publication?.status === 'draft' && (<Tag color='red'>DRAFT</Tag>)}
          </Space>
        }
        description={
          <Space direction='vertical' style={{ width: '100%' }}>
            <div>By <Link to={`/users/${publication.userId}`}>{publication.user?.fullName || 'Unknown'}</Link></div>
            <div>
              <PublicationMeta publication={publication} />
            </div>
          </Space>
        }
      />
    </StyledListItem>
  )
}
