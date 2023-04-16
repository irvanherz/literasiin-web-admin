import { Button, Image, Modal, Space } from 'antd'
import MediaPickerInput from 'components/MediaPicker/MediaPickerInput'
import useCustomComponent from 'hooks/useCustomComponent'
import { DEFAULT_IMAGE } from 'libs/variables'
import { useState } from 'react'

type ArticleImageInputProps = {
  value?: any
  defaultValue?: any
  onChange?: (v: any) => void
}

export default function KbCategoryImageInput ({ value, defaultValue, onChange }: ArticleImageInputProps) {
  const [open, setOpen] = useState(false)
  const [computedValue, triggerValueChange] = useCustomComponent({ value, defaultValue, onChange })
  const md = computedValue?.meta?.objects?.find((object: any) => object.id === 'md')

  const [selected, setSelected] = useState(computedValue)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = () => {
    handleOpen()
  }

  const handleConfirmSelect = () => {
    triggerValueChange(selected)
    handleClose()
  }

  return (
    <>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Image width={200} src={md?.url || DEFAULT_IMAGE} />
        <Button size='small' onClick={handleChange}>Change</Button>
      </Space>

      <Modal
        open={open}
        onCancel={handleClose}
        okText="Select"
        onOk={handleConfirmSelect}
      >
        <MediaPickerInput
          preset='asset'
          filters={{ type: 'image', tag: 'asset' }}
          value={selected}
          onChange={setSelected}
        />
      </Modal>
    </>

  )
}
