import { createContext } from 'react'
import { ListType } from 'src/types/ListType'

type BannerContextType = {
  bannerList: ListType[]
  handleCreate: (formValue: ListType) => void
  handleDelete: (idBanner: number) => void
  handleEdit: (idBanner: number, newFormValue: ListType) => void
}

const bannerContext: BannerContextType = {
  bannerList: [],
  handleCreate: () => {},
  handleDelete: () => {},
  handleEdit: () => {}
}

export const BannerContext = createContext(bannerContext)
