import { Col, Form, Input, Row, Select } from 'antd'
import StoryTagsEditor from 'components/StoryTagsEditor'
import { useQuery } from 'react-query'
import StoriesService from 'services/Stories'
import StoryCoverInput from './StoryCoverInput'

type StoryFormProps = {
  story?: any
}
export default function StoryForm ({ story }: StoryFormProps) {
  const { data } = useQuery('stories.categories', () => StoriesService.Categories.findMany())
  const categories = data?.data || []

  const categoryOptions: any[] = categories.map((cat: any) => ({ value: cat.id, label: cat.name }))

  return (
    <Form.Provider>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8} lg={6} xl={6} xxl={6}>
          <Form.Item
            name="cover"
          >
            <StoryCoverInput />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={16} lg={18} xl={18} xxl={18}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Title is required' }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Description is required' }]}
          >
            <Input.TextArea placeholder="Description..." rows={5} />
          </Form.Item>
          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: 'Category is required' }]}
          >
            <Select placeholder="Select category" options={categoryOptions}/>
          </Form.Item>
          {!!story && (
            <Form.Item
              label="Tags"
            >
              <StoryTagsEditor story={story} />
            </Form.Item>
          )}
          <Form.Item
            label="Status"
            name='status'
            rules={[{ required: true, message: 'Description is required' }]}
          >
            <Select options={[{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }]} />
          </Form.Item>
        </Col>
      </Row>
    </Form.Provider>
  )
}
