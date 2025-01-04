import { createContext } from 'react'
import { ListType } from 'src/types/ListType'

type BannerContextType = {
  bannerList: ListType[]
  handleCreate: (formValue: ListType) => void
  handleDelete: (idBanner: number)=> void
}

const bannerContext: BannerContextType = {
  bannerList: [],
  handleCreate: () => {},
  handleDelete: () => {}
}

export const BannerContext = createContext(bannerContext)
