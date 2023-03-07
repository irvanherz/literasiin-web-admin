import { Input, InputProps } from 'antd'
import useCustomComponent from 'hooks/useCustomComponent'

type ConfigurationNameInputProps = Omit<InputProps, 'onChange' | 'value' | 'defaultValue'> & {
  value?: string
  defaultValue?: string
  onChange?: (v: string) => void
}
export default function ConfigurationNameInput ({ value, defaultValue, onChange, ...otherProps }: ConfigurationNameInputProps) {
  const [computedValue, triggerValueChange] = useCustomComponent({ value, defaultValue, onChange })

  const handleChange: InputProps['onChange'] = (e) => {
    let val = e.target.value || ''
    val = val.toLowerCase().replace(/[^a-zA-Z0-9-]/g, '')
    triggerValueChange(val)
  }
  return <Input {...otherProps} value={computedValue} onChange={handleChange} />
}
