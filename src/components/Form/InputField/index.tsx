import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import Input from 'src/components/Input'

interface InputTextFieldProps<
  TFormValues extends FieldValues = FieldValues,
  TPath extends FieldPath<TFormValues> = FieldPath<TFormValues>
> extends React.InputHTMLAttributes<HTMLInputElement> {
  control?: Control<TFormValues>
  name: TPath
}

const InputTextField = <TFormValues extends FieldValues, TPath extends FieldPath<TFormValues>>({
  name,
  control,
  ...inputProps
}: InputTextFieldProps<TFormValues, TPath>) => {
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control
  })
  const formError = error?.message

  return (
    <div className='block'>
      <Input id={name} data-invalid={!!formError} inputSize='small' {...field} {...inputProps} />
      {formError && <div className='text-red-500 h-4 text-xs mt-1'>{formError}</div>}
    </div>
  )
}

export default InputTextField
