import { Modal } from 'antd'
import MediaPickerInput from 'components/MediaPicker/MediaPickerInput'
import { cloneElement, ReactElement, useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import StoriesService from 'services/Stories'

type StoryCoverMediaInputProps = {
  children: ReactElement,
  story: any
  afterUpdated?: () => void
}
export default function StoryCoverMediaInput ({ children, story, afterUpdated }: StoryCoverMediaInputProps) {
  const queryClient = useQueryClient()
  const storyId = story.id
  const updater = useMutation(coverId => StoriesService.updateById(storyId, { coverId }))
  const [cover, setCover] = useState<any>()

  useEffect(() => {
    setCover(story?.cover || null)
  }, [story])

  const handleUpdate = async () => {
    const coverId = cover?.id
    await updater.mutate(coverId)
    await queryClient.invalidateQueries(`story[${storyId}]`)
    handleClose()
  }

  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      {cloneElement(children, { onClick: handleOpen })}
      <Modal
        title="Upload or select cover"
        onCancel={handleClose}
        open={open}
        centered
        okText="Update"
        onOk={handleUpdate}
      >
        <MediaPickerInput
          value={cover}
          onChange={setCover}
          filters={{ type: 'image', tag: 'story-cover' }}
          preset="story-cover"
          cropProps={{ aspect: 2 / 3 }}
      />
      </Modal>
    </>
  )
}
