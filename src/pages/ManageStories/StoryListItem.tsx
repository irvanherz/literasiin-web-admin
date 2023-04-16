import { CheckOutlined, DeleteFilled, EditFilled, EllipsisOutlined, EyeFilled, FileDoneOutlined, FileOutlined, MoreOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Button, Dropdown, List, MenuProps, message, Modal, Space, Tag, Typography } from 'antd'
import StoryCover from 'components/StoryCover'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import StoriesService from 'services/Stories'
import styled from 'styled-components'
import StoryShareButton from './StoryShareButton'

const StoryMetaWrapper = styled.div`
display: flex;
flex-wrap: wrap;
width: 100%;
max-width: 700px;
gap: 4px;
@media only screen and (max-width: 500px) {
  font-size: x-small;
}
.article-meta-item {
  flex: 1;
  &-title {
    font-weight: 500;
  }
  &-desc {
    font-weight: 800;
    color: rgba(0,0,0,0.85);
  }
}
`
type StoryMetaProps = { story: any }
function StoryMeta ({ story }: StoryMetaProps) {
  const authors = useMemo(() => {
    const writers: any[] = story?.writers || []
    return writers.reduce((a, c, i, arr) => {
      if (i === arr.length - 2) {
        a.push(<Link to={`/users/${c.id}`} className='header-author'>{c.fullName}</Link>)
        a.push(<span> and </span>)
      } else if (i !== arr.length - 1) {
        a.push(<Link to={`/users/${c.id}`} className='header-author'>{c.fullName}</Link>)
        a.push(<span>, </span>)
      } else {
        a.push(<Link to={`/users/${c.id}`} className='header-author'>{c.fullName}</Link>)
      }
      return a
    }, [])
  }, [story?.writers])
  return (
    <StoryMetaWrapper>
      <div className='article-meta-item'>
        <div className='article-meta-item-title'>Authors</div>
        <div className='article-meta-item-desc'>{authors}</div>
      </div>
      <div className='article-meta-item'>
        <div className='article-meta-item-title'>Category</div>
        <div className='article-meta-item-desc'>{story?.category?.name || <i>Uncategorized</i>}</div>
      </div>
      <div className='article-meta-item'>
        <div className='article-meta-item-title'>Reads</div>
        <div className='article-meta-item-desc'>{story?.meta?.numViews || 0}</div>
      </div>
      <div className='article-meta-item'>
        <div className='article-meta-item-title'>Votes</div>
        <div className='article-meta-item-desc'>{story?.meta?.numVotes || 0}</div>
      </div>
      <div className='article-meta-item'>
        <div className='article-meta-item-title'>Last updated</div>
        <div className='article-meta-item-desc'>{dayjs(story?.updatedAt).fromNow()}</div>
      </div>
    </StoryMetaWrapper>
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

type StoryListItemProps = {
  story: any
  afterDeleted?: () => void
  afterUpdated?: () => void
}

export default function StoryListItem ({ story, afterUpdated, afterDeleted }: StoryListItemProps) {
  const storyId = story.id
  const navigate = useNavigate()
  const updater = useMutation((payload: any) => StoriesService.updateById(storyId, payload))
  const remover = useMutation(() => StoriesService.deleteById(storyId))

  const handleView = () => navigate(`/stories/${storyId}`)
  const handleEdit = () => navigate(`/stories/${storyId}/edit`)
  const handleDelete = () => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this story?',
      centered: true,
      onOk: async () => {
        try {
          await remover.mutateAsync()
          if (afterDeleted) afterDeleted()
        } catch (err: any) {
          message.error(err?.message)
        }
      }
    })
  }

  const handleToggleStatus = () => {
    if (story.status === 'draft') {
      updater.mutate({ status: 'published' }, {
        onSuccess: () => {
          message.success('Story published')
          afterUpdated && afterUpdated()
        },
        onError: (err: any) => {
          message.error(err?.message)
        }
      })
    } else {
      updater.mutate({ status: 'draft' }, {
        onSuccess: () => {
          message.success('Story reverted to draft')
          afterUpdated && afterUpdated()
        },
        onError: (err: any) => {
          message.error(err?.message)
        }
      })
    }
  }

  const handleToggleHasCompleted = () => {
    if (story?.hasCompleted) {
      updater.mutate({ hasCompleted: false }, {
        onSuccess: () => {
          message.success('Story marked as uncompleted')
          afterUpdated && afterUpdated()
        },
        onError: (err: any) => {
          message.error(err?.message)
        }
      })
    } else {
      updater.mutate({ hasCompleted: true }, {
        onSuccess: () => {
          message.success('Story marked as completed')
          afterUpdated && afterUpdated()
        },
        onError: (err: any) => {
          message.error(err?.message)
        }
      })
    }
  }
  const menu: MenuProps = {
    items: [
      { key: 'view', icon: <EyeFilled />, label: 'View', onClick: handleView },
      { key: 'edit', icon: <EditFilled />, label: 'Edit', onClick: handleEdit },
      story.status === 'draft'
        ? { key: 'publish', icon: <FileDoneOutlined />, label: 'Publish', onClick: handleToggleStatus }
        : { key: 'draft', icon: <FileOutlined />, label: 'Revert to Draft', onClick: handleToggleStatus },
      story?.hasCompleted
        ? { key: 'mark-uncumpleted', icon: <EllipsisOutlined />, label: 'Mark as Uncompleted', onClick: handleToggleHasCompleted }
        : { key: 'mark-completed', icon: <CheckOutlined />, label: 'Mark as Completed', onClick: handleToggleHasCompleted },
      { key: 'edit', icon: <DeleteFilled />, label: 'Delete', onClick: handleDelete }
    ]
  }

  return (
    <StyledListItem
      extra={
        <div className='list-item-actions'>
          <Space>
            <Link to={`/stories/${story?.id}/edit`}>
              <Button shape='circle' icon={<EditFilled />} />
            </Link>
            <StoryShareButton story={story}>
              <Button shape='circle' icon={<ShareAltOutlined />} />
            </StoryShareButton>
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
            <StoryCover story={story} style={{ borderRadius: 8, overflow: 'hidden' }}/>
          </div>
        }
        title={
          <Space>
            <span>{story.title}</span>
            {story?.status === 'draft' && (<Tag color='red'>DRAFT</Tag>)}
            {story?.hasCompleted && (<Tag color='green'>COMPLETED</Tag>)}
          </Space>
        }
        description={
          <Space direction='vertical' style={{ width: '100%' }}>
            <div>{<Typography.Paragraph ellipsis={{ rows: 2 }}>{story.description || <i>No description</i>}</Typography.Paragraph>}</div>
            <div>
              <StoryMeta story={story} />
            </div>
          </Space>
        }
      />
    </StyledListItem>
  )
}
