import HeadBar from './component/HeadBar/HeadBar'
import Dashboard from './component/Dashboard/Dashboard'
import Compare from './component/Compare/CompareList'
import ItemPage from './component/ItemPage/ItemPage'
import Footer from './component/Footer/Footer'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div>
      <HeadBar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/compareItem' element={<Compare />} />
          <Route path='/ItemPage' element={ <ItemPage />} /> 
          <Route path='/ItemPage/:id' element={ <ItemPage />} /> 
        </Routes>
      <Footer />
    </div>
  )
}

export default App
