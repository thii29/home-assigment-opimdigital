import dayjs from 'dayjs'
import { PropsWithChildren, useState } from 'react'
import { toast } from 'react-toastify'
import { BannerContext } from 'src/context/BannerContext'
import { ListType } from 'src/types/ListType'

const BannerProvider = ({ children }: PropsWithChildren) => {
  const initData: ListType[] = [
    {
      id: 1345678,
      order: 1,
      bannerName: 'Main Banner 1',
      link: 'https://example.com',
      texts: [{ text: 'this is text line' }, { text: '' }, { text: '' }],
      dateRegister: dayjs(Date.now()).format('YYYY-MM-DD'),
      image:
        'https://img.freepik.com/free-photo/creative-crystal-lens-ball-photography-lake-with-greenery-around-dawn_181624-29379.jpg',
      bannerType: 'bannerType1',
      status: '0'
    },
    {
      id: 2134987,
      order: 2,
      bannerName: 'Main Banner 1',
      link: 'https://example.com',
      texts: [],
      dateRegister: dayjs(Date.now()).format('YYYY-MM-DD'),
      image:
        'https://img.freepik.com/free-photo/creative-crystal-lens-ball-photography-lake-with-greenery-around-dawn_181624-29379.jpg',
      bannerType: 'bannerType1',
      status: '0'
    }
  ]
  const [bannerList, setBannerList] = useState<ListType[]>(initData)

  const handleCreate = (formValue: ListType) => {
    setBannerList((prev) => [...prev, formValue])
  }

  const handleDelete = (idBanner: number) => {
    const newBannerList = bannerList.filter((banner) => {
      return banner.id !== idBanner
    })
    setBannerList(newBannerList)
    toast.success('Delete success!', {
      position: 'top-right'
    })
  }

  return <BannerContext.Provider value={{ bannerList, handleCreate, handleDelete }}>{children}</BannerContext.Provider>
}

export default BannerProvider
