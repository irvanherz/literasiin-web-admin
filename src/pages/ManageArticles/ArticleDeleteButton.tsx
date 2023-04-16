import { message, Modal } from 'antd'
import { cloneElement, ReactElement } from 'react'
import { useMutation } from 'react-query'
import ArticlesService from 'services/Articles'

type ArticleDeleteButtonProps = {
  article: any
  children: ReactElement
  afterDeleted?: () => void
}

export default function ArticleDeleteButton ({ article, children, afterDeleted }: ArticleDeleteButtonProps) {
  const articleId = article?.id
  const remover = useMutation(() => ArticlesService.deleteById(articleId))

  const handleClick = () => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this article?',
      centered: true,
      onOk: () => {
        remover.mutate(undefined, {
          onSuccess: () => {
            if (afterDeleted) afterDeleted()
          },
          onError: (err: any) => {
            message.error(err?.message)
          }
        })
        return Promise.resolve()
      }
    })
  }

  return (
    cloneElement(children, { onClick: handleClick, loading: remover.isLoading })
  )
}
