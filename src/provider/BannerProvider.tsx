import dayjs from 'dayjs'
import { PropsWithChildren, useState } from 'react'
import { toast } from 'react-toastify'
import { BannerContext } from 'src/context/BannerContext'
import { ListType } from 'src/types/ListType'

const BannerProvider = ({ children }: PropsWithChildren) => {
  const initData: ListType[] = [
    {
      id: 1736003443001,
      order: 1,
      bannerName: 'Main Banner 1',
      link: 'https://example.com',
      texts: [{ text: 'this is text line' }, { text: 'abc' }, { text: 'xyz' }],
      dateRegister: dayjs(Date.now()).format('YYYY-MM-DD'),
      image:
        'https://img.freepik.com/free-photo/creative-crystal-lens-ball-photography-lake-with-greenery-around-dawn_181624-29379.jpg',
      bannerType: 'bannerType1',
      status: '0'
    },
    {
      id: 1736003443002,
      order: 2,
      bannerName: 'Main Banner 2',
      link: 'https://example.com',
      texts: [],
      dateRegister: dayjs(Date.now()).format('YYYY-MM-DD'),
      image:
        'https://img.freepik.com/free-photo/creative-crystal-lens-ball-photography-lake-with-greenery-around-dawn_181624-29379.jpg',
      bannerType: 'bannerType2',
      status: '1'
    }
  ]
  const [bannerList, setBannerList] = useState<ListType[]>(initData)

  const handleCreate = (formValue: ListType) => {
    setBannerList((prev) => [...prev, formValue])
  }

  const handleEdit = (idBanner: number, newFormValue: ListType) => {
    //take newest values from submit form
    const newestValue = newFormValue
    //find and replace data in banner list based on idBanner
    const newBannerList = bannerList.map((item) => {
      if (item.id === idBanner) {
        return newestValue
      }
      return item
    })
    setBannerList(newBannerList)
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

  return (
    <BannerContext.Provider value={{ bannerList, handleCreate, handleEdit, handleDelete }}>
      {children}
    </BannerContext.Provider>
  )
}

export default BannerProvider
