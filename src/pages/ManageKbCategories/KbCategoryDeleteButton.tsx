import { message, Modal } from 'antd'
import { cloneElement, ReactElement } from 'react'
import { useMutation } from 'react-query'
import KbsService from 'services/Kbs'

type KbCategoryDeleteButtonProps = {
  category: any
  children: ReactElement
  afterDeleted?: () => void
}

export default function KbCategoryDeleteButton ({ category, children, afterDeleted }: KbCategoryDeleteButtonProps) {
  const categoryId = category?.id
  const remover = useMutation(() => KbsService.Categories.deleteById(categoryId))

  const handleClick = () => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this category?',
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
