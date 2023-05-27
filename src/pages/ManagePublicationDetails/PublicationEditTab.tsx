import { Result } from 'antd'

type PublicationEditTabProps = {
  publication: any
  afterUpdated?: () => void
}
export default function PublicationEditTab ({ publication, afterUpdated }: PublicationEditTabProps) {
  return (
    <Result
      status='warning'
      title="Maintenance"
      subTitle="This page currently under maintenance"
    />
  )
  // const publicationId = publication?.id
  // const [form] = Form.useForm()
  // const updater = useMutation(data => PublicationsService.updateById(publicationId, data))

  // const initialValues = useMemo(() => {
  //   const result = { ...publication }
  //   return result
  // }, [publication])

  // useEffect(() => {
  //   form.resetFields()
  // }, [publication])

  // const handleSubmit = (payload: any) => {
  //   payload.imageId = payload?.image?.id
  //   delete payload.image

  //   updater.mutate(payload, {
  //     onSuccess: () => {
  //       afterUpdated && afterUpdated()
  //       message.success('Publication updated')
  //     },
  //     onError: (err: any) => {
  //       message.error(err?.message || 'Something wrong')
  //     }
  //   })
  // }

  // const handleValidationError = () => {
  //   message.error('Validation error')
  // }
  // return (
  //   <Form initialValues={initialValues} form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={handleSubmit} onFinishFailed={handleValidationError}>
  //     <PublicationForm />
  //     <Button type='primary' loading={updater.isLoading} onClick={form.submit}>Update</Button>
  //   </Form>
  // )
}
