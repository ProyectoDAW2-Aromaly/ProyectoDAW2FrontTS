import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import PerfumePage from './views/perfume/PerfumePage'
import Home from './views/home/Home'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/perfumes' element={<PerfumePage/>}/>
        </Routes>
        
      </BrowserRouter>
      
    </>
  )
}

export default App
