import { Card, Form, Segmented, Space, UploadProps } from 'antd'
import UserIdInput from 'components/shared/UserIdInput'
import { useState } from 'react'
import MediaPickerUploader from './MediaPickerUploader'

type ExtendedMediaPickerUploaderProps = {
  afterUploadDone?: UploadProps['onChange']
}
export default function ExtendedMediaPickerUploader ({ afterUploadDone }: ExtendedMediaPickerUploaderProps) {
  const [preset, setPreset] = useState<any>('photo')
  const [userId, setUserId] = useState(undefined)
  return (
    <Card>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
          <Form.Item
            label="User ID"
            tooltip='If empty, upload as current user'
          >
            <UserIdInput value={userId} onChange={setUserId} />
          </Form.Item>
          <Form.Item
            label="Preset"
            tooltip='Image type'
          >
            <Segmented
              value={preset}
              onChange={setPreset}
              options={[
                { value: 'photo', label: 'Photo' },
                { value: 'story-cover', label: 'Story Cover' },
                { value: 'article-image', label: 'Article Image' },
                { value: 'asset', label: 'Asset' }
              ]}
          />
          </Form.Item>
        </Form>
        <MediaPickerUploader
          preset={preset}
          additionalData={userId ? { userId } : undefined}
          afterUploadDone={afterUploadDone}
        />
      </Space>
    </Card>
  )
}
