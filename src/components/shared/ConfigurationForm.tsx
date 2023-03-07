import CodeEditor from '@uiw/react-textarea-code-editor'
import { Form, Input } from 'antd'
import ConfigurationNameInput from './ConfigurationNameInput'

function validateJSON (rule: any, value: any) {
  // eslint-disable-next-line prefer-promise-reject-errors
  if (!value) return Promise.reject('Value is required')
  try {
    JSON.parse(value)
    return Promise.resolve()
  } catch (err) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('Invalid JSON')
  }
}
export default function ConfigurationForm () {
  return (
    <Form.Provider>
      <Form.Item
        label="Name"
        name='name'
        rules={[{ required: true, message: 'Name is required' }]}
      >
        <ConfigurationNameInput placeholder="Name..." maxLength={255} />
      </Form.Item>
      <Form.Item
        label="Description"
        name='description'
      >
        <Input placeholder="Description..." maxLength={255} />
      </Form.Item>
      <Form.Item
        label="Value"
        name='value'
        rules={[{ validator: validateJSON }]}
      >
        <CodeEditor
          language="json"
          placeholder="Please input JSON configuration"
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
