import { ChangeEventHandler } from 'react'
import { twMerge } from 'tailwind-merge'

export interface InputProps {
  /**
   * How large should the input be?
   */
  inputSize?: 'small' | 'medium' | 'large'
  options: {
    value: string
    label: string
  }[]
  onChange: ChangeEventHandler<HTMLInputElement>
  value: string | number | readonly string[]
  name: string
}

/**
 * Primary UI component for user input
 */
const RadioGroup = ({ inputSize = 'medium', name, options, ...props }: InputProps) => {
  const baseClasses = 'rounded-md border outline-none border-none ring-gray-300 mr-1'
  const sizeClasses = {
    small: 'h-6 text-sm px-2',
    medium: 'h-8 text-base px-3',
    large: 'h-12 text-lg px-4'
  }

  const inputStyle = twMerge(baseClasses, sizeClasses[inputSize])

  return (
    <div className='flex flex-row gap-5'>
      {options.map((item) => (
        <div className='flex items-center' key={item.value}>
          <input
            type='radio'
            name={name}
            id={item.value}
            value={item.value}
            className={inputStyle}
            onChange={props?.onChange}
            checked={props.value === item.value}
          />
          <label htmlFor={item.value}>{item.label}</label>
        </div>
      ))}
    </div>
  )
}

export default RadioGroup
