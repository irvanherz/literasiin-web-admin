import { Form, Input, Select } from 'antd'
import ReactQuill, { Quill } from 'react-quill'

const BubbleTheme = Quill.import('themes/bubble')

class ExtendBubbleTheme extends BubbleTheme {
  constructor (quill: any, options: any) {
    super(quill, options)

    quill.on('selection-change', (range: any) => {
      if (range) {
        quill.theme.tooltip.show()
        quill.theme.tooltip.position(quill.getBounds(range))
      }
    })
  }
}

Quill.register('themes/bubble', ExtendBubbleTheme)

export default function StoryChapterForm () {
  return (
    <Form.Provider>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Title is required' }]}
      >
        <Input placeholder="Title" />
      </Form.Item>
      {/* <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Description is required' }]}
      >
        <Input.TextArea placeholder="Description..." rows={5} />
      </Form.Item> */}
      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: 'Content is required' }]}
      >
        <ReactQuill theme='bubble' placeholder='Write content here...'/>
      </Form.Item>
      <Form.Item
        label="Status"
        name='status'
        rules={[{ required: true, message: 'Description is required' }]}
      >
        <Select options={[{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }]} />
      </Form.Item>
    </Form.Provider>
  )
}
