import { useRoutes } from 'react-router-dom'
import BannerList from './pages/bannerlist'
import CreateBanner from './pages/CreateBanner'
import EditBanner from './pages/EditBanner'


export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <BannerList />
    },
    {
      path: '/create',
      element: <CreateBanner/>
    },{
      path: '/edit/:id',
      element: <EditBanner/>
    }
  ])
  return routeElements
}
