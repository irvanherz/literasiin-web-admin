import { message } from 'antd'
import { cloneElement, ReactElement } from 'react'
import { useMutation } from 'react-query'
import StoriesService from 'services/Stories'

type StoryChapterCreateButtonProps = {
  story: any
  children: ReactElement
  afterCreated?: (data: any) => void
}
export default function StoryChapterCreateButton ({ story, children, afterCreated }: StoryChapterCreateButtonProps) {
  const storyId = story?.id
  const creator = useMutation((payload:any) => StoriesService.Chapters.create(payload))

  const handleCreate = () => {
    creator.mutate({ storyId, title: 'Untitled Chapter' }, {
      onSuccess: (data) => {
        if (afterCreated) afterCreated(data?.data)
      },
      onError: (err: any) => {
        message.error(err?.message)
      }
    })
  }

  return (
    <>
      {cloneElement(children, { onClick: handleCreate, loading: creator.isLoading })}
    </>
  )
}
