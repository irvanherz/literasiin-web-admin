import { Form, Input } from 'antd'
import RichTextInput from 'components/RichTextInput'
import ArticleCategoryInput from './ArticleCategoryInput'
import ArticleImageInput from './ArticleImageInput'
import UserIdInput from './UserIdInput'

export default function ArticleForm () {
  return (
    <Form.Provider>
      <Form.Item
        label="User"
        name='userId'
        rules={[{ required: true, message: 'User is required' }]}
      >
        <UserIdInput />
      </Form.Item>
      <Form.Item
        label="Image"
        name='image'
        wrapperCol={{ style: { maxWidth: 360 } }}
      >
        <ArticleImageInput />
      </Form.Item>
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
        <ArticleCategoryInput placeholder="Select category..." />
      </Form.Item>
      <Form.Item
        label="Content"
        name='content'
        rules={[{ required: true, message: 'Content is required' }]}
      >
        <RichTextInput placeholder='Write content here...' />
      </Form.Item>
    </Form.Provider>
  )
}
