import { DeleteFilled, EditFilled, EyeFilled, FileDoneOutlined, FileOutlined, MoreOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, List, MenuProps, message, Modal, Space, Tag, Typography } from 'antd'
import dayjs from 'dayjs'
import { DEFAULT_IMAGE } from 'libs/variables'
import Media from 'models/Media'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import ArticlesService from 'services/Articles'
import styled from 'styled-components'
import ArticleShareButton from './ArticleShareButton'

const ArticleMetaWrapper = styled.div`
display: flex;
flex-wrap: wrap;
width: 100%;
max-width: 600px;
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
type ArticleMetaProps = { article: any }
function ArticleMeta ({ article }: ArticleMetaProps) {
  return (
    <ArticleMetaWrapper>
      <div className='article-meta-item'>
        <div className='article-meta-item-title'>Author</div>
        <div className='article-meta-item-desc'><Link to={`/users/${article?.user?.id}`}>{article?.user?.fullName}</Link></div>
      </div>
      <div className='article-meta-item'>
        <div className='article-meta-item-title'>Category</div>
        <div className='article-meta-item-desc'>{article?.category?.name || <i>Uncategorized</i>}</div>
      </div>
      <div className='article-meta-item'>
        <div className='article-meta-item-title'>Reads</div>
        <div className='article-meta-item-desc'>{article?.meta?.numViews || 0}</div>
      </div>
      <div className='article-meta-item'>
        <div className='article-meta-item-title'>Upvotes</div>
        <div className='article-meta-item-desc'>{article?.meta?.numUpvotes || 0}</div>
      </div>
      <div className='article-meta-item'>
        <div className='article-meta-item-title'>Bookmarks</div>
        <div className='article-meta-item-desc'>{article?.meta?.numBookmarks || 0}</div>
      </div>
      <div className='article-meta-item'>
        <div className='article-meta-item-title'>Last updated</div>
        <div className='article-meta-item-desc'>{dayjs(article?.updatedAt).fromNow()}</div>
      </div>
    </ArticleMetaWrapper>
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
type ArticleListItemProps = {
  article: any
  afterDeleted?: () => void
  afterUpdated?: () => void
}

export default function ArticleListItem ({ article, afterUpdated, afterDeleted }: ArticleListItemProps) {
  const articleId = article.id
  const navigate = useNavigate()
  const updater = useMutation((payload: any) => ArticlesService.updateById(articleId, payload))
  const remover = useMutation(() => ArticlesService.deleteById(articleId))

  const handleView = () => navigate(`/articles/${articleId}`)
  const handleEdit = () => navigate(`/articles/${articleId}/edit`)
  const handleDelete = () => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this article?',
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
    if (article.status === 'draft') {
      updater.mutate({ status: 'published' }, {
        onSuccess: () => {
          message.success('Article published')
          afterUpdated && afterUpdated()
        },
        onError: (err: any) => {
          message.error(err?.message)
        }
      })
    } else {
      updater.mutate({ status: 'draft' }, {
        onSuccess: () => {
          message.success('Article reverted to draft')
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
      article.status === 'draft'
        ? { key: 'publish', icon: <FileDoneOutlined />, label: 'Publish', onClick: handleToggleStatus }
        : { key: 'draft', icon: <FileOutlined />, label: 'Revert to Draft', onClick: handleToggleStatus },
      { key: 'edit', icon: <DeleteFilled />, label: 'Delete', onClick: handleDelete }
    ]
  }

  const image = article?.image ? new Media(article.image) : null

  return (
    <StyledListItem
      extra={
        <div className='list-item-actions'>
          <Space>
            <Button shape='circle' icon={<EditFilled />} onClick={handleEdit} />
            <ArticleShareButton article={article}>
              <Button shape='circle' icon={<ShareAltOutlined />} />
            </ArticleShareButton>
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
        avatar={<Avatar shape='square' size={64} src={image?.md?.url || DEFAULT_IMAGE} />}
        title={
          <Space>
            <span>{article.title}</span>
            {article?.status === 'draft' && (<Tag color='red'>DRAFT</Tag>)}
          </Space>
        }
        description={
          <Space direction='vertical' style={{ width: '100%' }}>
            <div>{<Typography.Paragraph ellipsis={{ rows: 2 }}>{article.description || <i>No description</i>}</Typography.Paragraph>}</div>
            <div>
              <ArticleMeta article={article} />
            </div>
          </Space>
        }
      />
    </StyledListItem>
  )
}
