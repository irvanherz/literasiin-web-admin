import { Select, SelectProps } from 'antd'
import { useQuery } from 'react-query'
import KbsService from 'services/Kbs'

type KbCategoryInputProps = SelectProps
export default function KbCategoryInput (props: KbCategoryInputProps) {
  const { data, isLoading } = useQuery('kbs.categories', () => KbsService.Categories.findMany())
  const categories: any[] = data?.data || []

  const options = categories.map(cat => ({ key: cat.id, label: cat.name, value: cat.id }))

  return (
    <Select {...props} loading={isLoading} options={options} />
  )
}
