import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import PerfumePage from './views/perfume/PerfumePage'
import Home from './views/home/Home'
import Login from './views/usuarios/Login'
import Register from './views/usuarios/Register'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/perfume' element={<PerfumePage/>}/>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/registro' element={<Register/>}></Route>
        </Routes>
        
      </BrowserRouter>
      
    </>
  )
}

export default App
