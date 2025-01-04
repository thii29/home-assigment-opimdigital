import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import Select from 'src/components/Select'

interface SelectTextFieldProps<
  TFormValues extends FieldValues = FieldValues,
  TPath extends FieldPath<TFormValues> = FieldPath<TFormValues>
> extends React.InputHTMLAttributes<HTMLSelectElement> {
  control?: Control<TFormValues>
  name: TPath
  options: {
    value: string
    label: string
  }[]
}

const SelectTextField = <TFormValues extends FieldValues, TPath extends FieldPath<TFormValues>>({
  name,
  control,
  ...inputProps
}: SelectTextFieldProps<TFormValues, TPath>) => {
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
      <Select id={name} data-invalid={!!formError} inputSize='small' {...field} {...inputProps} />
      {formError && <div className='text-red-500 h-4 text-xs mt-1'>{formError}</div>}
    </div>
  )
}

export default SelectTextField
