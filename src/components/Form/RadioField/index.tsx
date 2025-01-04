import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import RadioGroup from 'src/components/Radio'

interface RadioFieldProps<
  TFormValues extends FieldValues = FieldValues,
  TPath extends FieldPath<TFormValues> = FieldPath<TFormValues>
> extends React.InputHTMLAttributes<HTMLInputElement> {
  control?: Control<TFormValues>
  name: TPath
  options: {
    value: string
    label: string
  }[]
}

const RadioField = <TFormValues extends FieldValues, TPath extends FieldPath<TFormValues>>({
  name,
  control,
  ...inputProps
}: RadioFieldProps<TFormValues, TPath>) => {
  const {
    field // value, onchange, blur, focus
  } = useController({
    name,
    control
  })

  return (
    <div className='block'>
      <RadioGroup inputSize='small' {...field} {...inputProps}/>
    </div>
  )
}

export default RadioField
