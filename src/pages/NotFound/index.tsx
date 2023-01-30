import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function NotFound () {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }
  return (
    <Result
      status='404'
      title="Page Not Found"
      subTitle="The specified page that you requested was not found"
      extra={<Button onClick={handleBack}>Go Back</Button>}
    />
  )
}
