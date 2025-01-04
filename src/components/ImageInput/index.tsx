import { Fragment, useRef } from 'react'
import { toast } from 'react-toastify'

interface Props {
  onChange?: (file?: File) => void
}

export default function InputFile({ onChange }: Props) {
  const fileInput = useRef<HTMLInputElement>(null)

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromlocal = event.target.files?.[0]
    //10485670 byte = 10mb
    if (fileFromlocal && (fileFromlocal.size >= 10485670 || !fileFromlocal.type.includes('image'))) {
      toast.error('File không đúng định dạng được quy định', {
        position: 'top-center'
      })
    } else {
      onChange?.(fileFromlocal)
    }
  }

  const handleUpload = () => {
    fileInput.current?.click()
  }
  return (
    <Fragment>
      <input
        type='file'
        name=''
        id=''
        accept='.jpg, .jpeg, .png'
        className='hidden'
        ref={fileInput}
        onChange={onFileChange}
        onClick={(event) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(event.target as any).value = null
        }}
      />
      <button
        type='button'
        className='flex h-8 items-center justify-end rounded-sm border bg-white text-sm px-6 text-gray-600 shadow-sm hover:border-orange'
        onClick={handleUpload}
      >
        파일선택
      </button>
    </Fragment>
  )
}
