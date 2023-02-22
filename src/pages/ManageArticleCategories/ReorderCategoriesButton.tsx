import { Button, Drawer, message, Space } from 'antd'
import { cloneElement, ReactElement, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import ArticlesService from 'services/Articles'
import CategoryOrderInput, { CategoryItem } from './CategoryOrderInput'

type ReorderCategoriesButtonProps = {
  children: ReactElement
  categories: any[]
  afterUpdated?: () => void
}

export default function ReorderCategoriesButton ({ children, categories, afterUpdated }: ReorderCategoriesButtonProps) {
  const [open, setOpen] = useState(false)
  const [reorderedCategories, setReorderedCategories] = useState<CategoryItem[]>([])
  const orderSaver = useMutation((payload: any[]) => ArticlesService.Categories.bulkUpdate(payload))

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    if (open) { setReorderedCategories(categories) }
  }, [open, categories])

  const handleSave = () => {
    const payload = reorderedCategories.map((cat, priority) => ({ id: cat.id, priority }))
    orderSaver.mutate(payload, {
      onSuccess: async () => {
        handleClose()
        if (afterUpdated) afterUpdated()
      },
      onError: (err: any) => {
        message.error(err?.message)
      }
    })
  }

  return (
    <>
      {cloneElement(children, { onClick: handleOpen })}
      <Drawer
        open={open}
        onClose={handleClose}
      >
        <Space direction='vertical' style={{ width: '100%' }}>
          <CategoryOrderInput value={reorderedCategories} onChange={setReorderedCategories} />
          <Button loading={orderSaver.isLoading} onClick={handleSave}>Save</Button>
        </Space>

      </Drawer>
    </>
  )
}
