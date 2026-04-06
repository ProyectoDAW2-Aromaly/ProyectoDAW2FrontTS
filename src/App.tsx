import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import PerfumePage from './views/perfume/PerfumePage'
import Home from './views/home/Home'
import Login from './views/usuarios/Login'
import Register from './views/usuarios/Register'
import Navbar from './components/Navbar'
import { useState } from 'react'
import PerfumeForm from './views/perfume_form/PerfumeForm'
import Footer from './components/Footer'
import PerfumerPage from './views/perfumer/PerfumerPage'
import PerfumerForm from './views/perfumer_form/PerfumerForm'
import BrandsList from './views/brand/list/BrandsList'

export interface IUser {
  userName: string,
  // Profile picture
  pfp: string,
  rol: string
}

function App() {
   const [user, setUser] = useState<IUser>()

  return (
    <>
      <BrowserRouter>
        <Navbar user={user} />
        <Routes>

          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/registro' element={<Register/>}></Route>

          <Route path='/' element={<Home />} />
          <Route path='/perfume' element={<PerfumePage user={user} setUser={setUser} />} />
          <Route path='/perfume/form' element={<PerfumeForm />} />
          <Route path="/perfumer" element={<PerfumerPage user={user} setUser={setUser} />} />
          <Route path='/perfumer/form' element={<PerfumerForm />} />
          {/* Lista de marcas */}
          <Route path='/brands' element={<BrandsList />} />
          {/* Se filtra por marca */}
          {/* <Route path='/brand' element={<Brand />} /> */}

        </Routes>
        <Footer />

      </BrowserRouter>

    </>
  )
}

export default App
