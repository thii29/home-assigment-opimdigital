import './App.css'
import Header from './components/Header'
import BannerProvider from './provider/BannerProvider'
import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify';

function App() {
  const routeElements = useRouteElements()
  return (
    <>
      <BannerProvider>
        <Header />
        {routeElements}
      </BannerProvider>
      <ToastContainer />
    </>
  )
}

export default App
