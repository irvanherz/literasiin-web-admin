import { Button, Drawer, Space } from 'antd'
import { cloneElement, ReactElement, useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import StoriesService from 'services/Stories'
import CategoryOrderInput, { CategoryItem } from './CategoryOrderInput'

type ReorderCategoriesButtonProps = {
  children: ReactElement
  categories: any[]
}

export default function ReorderCategoriesButton ({ children, categories }: ReorderCategoriesButtonProps) {
  const [open, setOpen] = useState(false)
  const [reorderedCategories, setReorderedCategories] = useState<CategoryItem[]>([])
  const orderSaver = useMutation(StoriesService.Categories.bulkUpdate)
  const queryClient = useQueryClient()

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
        await queryClient.invalidateQueries('stories.categories')
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
