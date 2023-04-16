import { message, Modal } from 'antd'
import { cloneElement, ReactElement } from 'react'
import { useMutation } from 'react-query'
import StoriesService from 'services/Stories'

type StoryDeleteButtonProps = {
  story: any
  children: ReactElement
  afterDeleted?: () => void
}

export default function StoryDeleteButton ({ story, children, afterDeleted }: StoryDeleteButtonProps) {
  const storyId = story?.id
  const remover = useMutation(() => StoriesService.deleteById(storyId))

  const handleClick = () => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this story?',
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
