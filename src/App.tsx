import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import PaginaPerfume from './views/perfume/PaginaPerfume'
import Inicio from './views/inicio/Inicio'
import Login from './views/usuarios/Login'
import Register from './views/usuarios/Register'
import Navbar from './components/Navbar'
import { useState } from 'react'
import FormularioPerfume from './views/formularioPerfume/FormularioPerfume'
import Footer from './components/Footer'
import PaginaPerfumista from './views/perfumista/PaginaPerfumista'
import FormularioPerfumista from './views/formularioPerfumista/FormularioPerfumista'
import ListaMarcas from './views/marca/listaMarcas/ListaMarcas'
import PaginaMarca from './views/marca/marcaDetalles/PaginaMarca'
import ListasUsuarios from './views/lista/listasUsuarios/ListasUsuarios'
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
          <Route path="/perfumista/:id" element={<PaginaPerfumista user={user} setUser={setUser} />} />
          
          {/* Lista de marcas */}
          <Route path='/marcas' element={<ListaMarcas />} />
          {/* Se filtra por marca */}
          <Route path='/marca' element={<PaginaMarca />} />
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
