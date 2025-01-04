import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BannerContext } from 'src/context/BannerContext'

const BannerList = () => {
  const { bannerList, handleDelete } = useContext(BannerContext)
  const arrayTitle = ['배너ID', '순번', '배너명', '링크', '텍스트', '등록일', '이미지', '수정', '삭제']

  const bannerColumnData = bannerList.map((banner) => {
    return {
      id: banner.id,
      order: banner.order,
      bannerName: banner.bannerName,
      link: banner.link,
      texts: banner.texts.length > 0 ? <div>{banner.texts.map((item) => item.text)}</div> : '-',
      dateRegister: banner.dateRegister,
      image: <img src={banner.image} className='w-64' />
    }
  })

  return (
    <>
      <div className='w-full h-full flex flex-col justify-center item-centers container'>
        <div className='flex justify-end mt-3 mr-3'>
          <Link to={'/create'} className='w-fit'>
            {/* Create new */}
            <button className='px-3 py-2 border-[1px] rounded-sm hover:bg-slate-400 hover:text-white'>등록</button>
          </Link>
        </div>

        <div className='w-full flex justify-center mt-4 px-3'>
          <table className='border border-collapse border-spacing-2'>
            <thead>
              <tr>
                {arrayTitle.map((title) => (
                  <th className='border p-4'>{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bannerColumnData.map((item) => (
                <tr>
                  {Object.values(item).map((element) => (
                    <td className='border text-center p-3'>{element}</td>
                  ))}
                  <td className='border text-center p-3'>
                    <Link to={`/edit/${item.id}`}>
                      <button className='bg-green-300 border-none px-2 py-1 rounded-md hover:bg-green-500 text-sm text-white'>
                      수정
                      </button>
                    </Link>
                  </td>
                  <td className='border text-center p-3'>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className='bg-red-400  border-none px-2 py-1 rounded-md hover:bg-red-600 text-sm text-white'
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default BannerList
