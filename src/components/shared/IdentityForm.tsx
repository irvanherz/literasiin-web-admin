import CodeEditor from '@uiw/react-textarea-code-editor'
import { Form, Input, Select, SelectProps } from 'antd'

function validateJSON (rule: any, value: any) {
  if (!value) return Promise.resolve()
  try {
    JSON.parse(value)
    return Promise.resolve()
  } catch (err) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('Invalid JSON')
  }
}

const OPTIONS: SelectProps['options'] = [
  { label: 'Password', value: 'password' },
  { label: 'Google', value: 'google' },
  { label: 'Facebook', value: 'facebook' }
]
export default function IdentityForm () {
  return (
    <Form.Provider>
      <Form.Item
        label="Type"
        name="type"
        rules={[{ required: true, message: 'Type is required' }]}
      >
        <Select placeholder="Type..." options={OPTIONS} />
      </Form.Item>
      <Form.Item
        label="Key"
        tooltip="Password or social account identifier"
        name="key"
        rules={[{ required: true, message: 'Key is required' }]}
      >
        <Input placeholder='Key...' />
      </Form.Item>
      <Form.Item
        label="Metadata"
        name="meta"
        rules={[{ validator: validateJSON }]}
      >
        <CodeEditor
          language="json"
          placeholder="Metadata in JSON format..."
          padding={15}
          style={{
            fontSize: 12,
            backgroundColor: '#f5f5f5',
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace'
          }}
        />
      </Form.Item>
    </Form.Provider>
  )
}
