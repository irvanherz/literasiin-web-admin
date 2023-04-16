import { Drawer } from 'antd'
import ExtendedMediaPickerUploader from 'components/MediaPicker/ExtendedMediaPickerUploader'
import { cloneElement, ReactElement, useState } from 'react'

type CreateMediaButtonProps = {
  children: ReactElement
  afterCreated?: () => void
}

export default function CreateMediaButton ({ children, afterCreated }: CreateMediaButtonProps) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleAfterUploadDone = () => {
    handleClose()
    afterCreated && afterCreated()
  }
  return (
    <>
      {cloneElement(children, { onClick: handleOpen })}
      <Drawer
        open={open}
        onClose={handleClose}
        width={700}
      >
        <ExtendedMediaPickerUploader afterUploadDone={handleAfterUploadDone}/>
      </Drawer>
    </>
  )
}
