import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import PaginaPerfume from './views/perfume/PerfumePage'
import Inicio from './views/inicio/Inicio'
import Login from './views/usuarios/Login'
import Register from './views/usuarios/Register'
import Navbar from './components/Navbar'
import { useState } from 'react'
import FormularioPerfume from './views/formulario_perfume/FormularioPerfume'
import Footer from './components/Footer'
import PerfumerPage from './views/perfumista/PerfumerPage'
import FormularioPerfumista from './views/formulario_perfumista/FormularioPerfumista'
import BrandsList from './views/marca/brandlist/BrandsList'
import BrandPage from './views/marca/singlebrand/BrandPage'
import ListasUsuarios from './views/lista/listas_usuarios/UserLists'
import Premium from './views/premium/Premium'
import BuyMeACoffee from './components/BuyMeACoffee'
import ListaPerfumes from './views/listadoPerfumes/ListaPerfumes'

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

          <Route path='/' element={<Inicio/>}/>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/registro' element={<Register/>}></Route>

          <Route path='/perfumes' element={<ListaPerfumes />} />
          <Route path='/perfume/:id' element={<PaginaPerfume user={user} setUser={setUser} />} />
          <Route path='/perfume/form' element={<FormularioPerfume />} />
          <Route path='/perfumista/formulario' element={<FormularioPerfumista />} />
          <Route path="/perfumista/:id" element={<PerfumerPage user={user} setUser={setUser} />} />
          
          {/* Lista de marcas */}
          <Route path='/marcas' element={<BrandsList />} />
          {/* Se filtra por marca */}
          <Route path='/marca' element={<BrandPage />} />
          {/* Listado de las listas de usuarios */}
          <Route path='/listas' element={<ListasUsuarios />} />
          <Route path='/premium' element={<Premium />} />

        </Routes>
        <BuyMeACoffee/>
        <Footer />

      </BrowserRouter>

    </>
  )
}

export default App
