import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import { useContext, useMemo, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BannerContext } from 'src/context/BannerContext'
import { ListType } from 'src/types/ListType'
import { createBannerSchema, CreateBannerSchemaType } from 'src/utils/rules'
import InputFile from '../ImageInput'
import InputTextField from './InputField'
import RadioField from './RadioField'
import SelectTextField from './SelectField'

interface FormProps {
  isEdit?: boolean
  bannerValue?: CreateBannerSchemaType
}

function Form({ isEdit = false, bannerValue }: FormProps) {
  const tdTitleClassName = 'w-[200px] bg-slate-100 p-2 border text-center'
  const [file, setFile] = useState<File>()
  const [imgUrl, setImgUrl] = useState('')
  const previewImg = useMemo(() => {
    return file ? URL.createObjectURL(file) : bannerValue?.image || ''
  }, [file])
  const { handleCreate, handleEdit } = useContext(BannerContext)
  const navigate = useNavigate()
  const defaultValue = bannerValue
    ? bannerValue
    : {
        bannerName: '',
        link: '',
        order: '0',
        texts: [{ text: '' }, { text: '' }, { text: '' }],
        bannerType: '',
        status: '0'
      }
  const { control, handleSubmit } = useForm<CreateBannerSchemaType>({
    resolver: yupResolver(createBannerSchema),
    mode: 'onBlur',
    values: defaultValue
  })

  const { fields, append } = useFieldArray({
    control,
    name: 'texts'
  })

  const handleChangeFile = (file?: File) => {
    setFile(file)
    if (file) {
      const fileReader = new FileReader()
      fileReader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          setImgUrl(event?.target?.result.toString())
        }
      }
      fileReader.readAsDataURL(file)
    }
  }
  const onSubmit = (values: CreateBannerSchemaType) => {
    const bannerDataSubmit: ListType = {
      ...values,
      id: defaultValue?.id ? defaultValue.id : Date.now(),
      order: Number(values.order),
      dateRegister: dayjs(Date.now()).format('YYYY-MM-DD'),
      image: imgUrl || defaultValue?.image || ''
    }
    if (isEdit && defaultValue.id) {
      handleEdit(defaultValue?.id, bannerDataSubmit)
      toast.success('Edit success!', {
        position: 'top-right'
      })
    } else {
      handleCreate(bannerDataSubmit)
      toast.success('Register success!', {
        position: 'top-right'
      })
    }
    navigate('/')
  }
  return (
    <div className='w-full flex flex-col justify-center items-center px-4 container'>
      <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
        <table className='min-w-full border border-collapse border-spacing-2 mt-3'>
          <tbody>
            <tr>
              {/* Banner group */}
              <td className={tdTitleClassName}>배너그룹</td>
              <td className='p-2 border'>
                <div className='max-w-xs'>
                  <SelectTextField
                    name='bannerType'
                    control={control}
                    options={[
                      { value: 'bannerType1', label: '메인베너 테스트 1' },
                      { value: 'bannerType2', label: '메인베너 테스트 2' }
                    ]}
                  />
                </div>
              </td>
            </tr>
            <tr>
              {/* Banner name */}
              <td className={tdTitleClassName}>배너명</td>
              <td className='p-2 border'>
                <div className='max-w-md'>
                  <InputTextField name='bannerName' control={control} placeholder='메인배너 테스트 01' />
                </div>
              </td>
            </tr>
            <tr>
              {/* Link */}
              <td className={tdTitleClassName}>링크</td>
              <td className='p-2 border'>
                <div className='max-w-md'>
                  <InputTextField name='link' control={control} placeholder='링크 주소 입력' />
                </div>
              </td>
            </tr>
            <tr>
              {/* Order */}
              <td className={tdTitleClassName}>순서</td>
              <td className='p-2 border'>
                <div className='flex flex-row gap-3 items-center'>
                  <div className='max-w-xs '>
                    <InputTextField name='order' control={control} inputMode='numeric' type='number' min={0} />
                  </div>
                  <span>*숫자가 높을수록 먼저 출력됩니다.</span>
                </div>
              </td>
            </tr>
            {/* Texts */}
            {fields.map((_, index) => (
              <>
                <tr>
                  <td className={tdTitleClassName}>텍스트{index + 1}</td>
                  <td className='p-2 border text-center'>
                    <div className='max-w-md'>
                      <InputTextField
                        control={control}
                        name={`texts.${index}.text`}
                        placeholder={`텍스트${index + 1} 입력`}
                      />
                    </div>
                  </td>
                </tr>
              </>
            ))}

            <tr className={tdTitleClassName}>
              {/* Add text button */}
              <td colSpan={2}>
                <button
                  type='button'
                  className='w-full p-1 font-bold disabled:cursor-not-allowed disabled:text-gray-400'
                  onClick={() => append({ text: '' })}
                  disabled={fields.length === 6}
                >
                  텍스트 추가 +
                </button>
              </td>
            </tr>
            <tr>
              {/* Image */}
              <td className={tdTitleClassName}>이미지</td>
              <td className='p-2 border'>
                <div className='flex flex-row gap-3 items-center'>
                  <InputFile onChange={handleChangeFile} /> <span className='text-sm'>파일을 업로드 해주세요</span>
                </div>
                {previewImg && (
                  <div className='my-5 max-h-96 max-w-xs'>
                    <img src={previewImg} alt='' className='w-full h-full object-cover' />
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td className={tdTitleClassName}>상태</td>
              <td className='p-2 border'>
                <RadioField
                  name='status'
                  control={control}
                  options={[
                    { value: '1', label: '노출' },
                    { value: '0', label: '일시정지' }
                  ]}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className='w-full flex justify-end mt-3'>
          {/* Back to Banner List */}
          <Link to='/'>
            <button className='mr-2 px-5 py-2 border-[1.5px] border-blue-950 rounded-md hover:bg-blue-950 hover:text-white'>
              목록
            </button>
          </Link>
          {/* Register Button */}
          <button
            type='submit'
            className='px-5 py-2 border-neutral-300 bg-blue-950 rounded-md text-white hover:text-black hover:bg-slate-300'
          >
            {isEdit ? 'Edit' : '등록'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form
