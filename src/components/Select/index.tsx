import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface InputProps
  extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  /**
   * How large should the input be?
   */
  inputSize?: 'small' | 'medium' | 'large'
  options: {
    value: string
    label: string
  }[]
}

/**
 * Primary UI component for user input
 */
const Select = React.forwardRef<HTMLSelectElement, InputProps>(({ inputSize = 'medium', options, ...props }, ref) => {
  const baseClasses = 'rounded-md border outline-none border-none ring-1 ring-gray-300 w-full'
  const sizeClasses = {
    small: 'h-6 text-sm px-2',
    medium: 'h-10 text-base px-3',
    large: 'h-12 text-lg px-4'
  }
  const focusStyle = 'focus:outline-none focus:ring-2 focus:ring-orange-500'
  const disableStyle = props.disabled ? 'disabled:opacity-50 disabled:cursor-not-allowed' : ''

  const inputStyle = twMerge(baseClasses, sizeClasses[inputSize], focusStyle, disableStyle)

  return (
    <select ref={ref} className={inputStyle} {...props}>
      <option value=''>
        <span className='text-slate-500'>배너그룹 선택</span>
      </option>
      {options.map((item) => (
        <option value={item.value} key={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  )
})

export default Select
