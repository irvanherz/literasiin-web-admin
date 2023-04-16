import { Form, Input } from 'antd'
import ReactQuill from 'react-quill'
import KbCategoryInput from './KbCategoryInput'

export default function KbForm () {
  return (
    <Form.Provider>
      <Form.Item
        label="Title"
        name='title'
        rules={[{ required: true, message: 'Title is required' }]}
      >
        <Input placeholder="Title..." maxLength={255} />
      </Form.Item>
      <Form.Item
        label="Description"
        name='description'
        rules={[{ required: true, message: 'Description is required' }]}
      >
        <Input.TextArea cols={5} placeholder="Content" maxLength={255} />
      </Form.Item>
      <Form.Item
        label="Category"
        name='categoryId'
        rules={[{ required: true, message: 'Category is required' }]}
      >
        <KbCategoryInput placeholder="Select category..." />
      </Form.Item>
      <Form.Item
        label="Content"
        name='content'
        rules={[{ required: true, message: 'Content is required' }]}
      >
        <ReactQuill theme='bubble' placeholder='Write content here...'/>
      </Form.Item>
    </Form.Provider>
  )
}
