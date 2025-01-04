import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import Form from 'src/components/Form'
import { BannerContext } from 'src/context/BannerContext'

const EditBanner = () => {
  const { bannerList } = useContext(BannerContext)

  //1 take 'id' from url
  const { id } = useParams()
  console.log('id', typeof id)
  //2 find banner obj based on 'id' from banner list of BannerProvider
  const findMatchBanner = bannerList.find((item) => {
    return item.id === Number(id)
  })
  //3 take this data from BannerProvider to Form
  return (
    <>
      {findMatchBanner ? (
        <Form bannerValue={{ ...findMatchBanner, order: String(findMatchBanner?.order) }} isEdit={true} />
      ) : (
        'Not found'
      )}
    </>
  )
}

export default EditBanner
