import { BrowserRouter, Route, Routes } from 'react-router'
import { useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BuyMeACoffee from './components/BuyMeACoffee'

import Inicio from './views/inicio/Inicio'
import Login from './views/usuarios/Login'
import Register from './views/usuarios/Register'
import ProfilePage from './views/perfil/ProfilePage'

import ListaPerfumes from './views/listadoPerfumes/ListaPerfumes'
import PaginaPerfume from './views/perfume/PaginaPerfume'
import FormularioPerfume from './views/formularioPerfume/FormularioPerfume'

import PaginaPerfumista from './views/perfumista/PaginaPerfumista'
import FormularioPerfumista from './views/formularioPerfumista/FormularioPerfumista'

import ListaMarcas from './views/marca/listaMarcas/ListaMarcas'
import PaginaMarca from './views/marca/marcaDetalles/PaginaMarca'

import ListasUsuarios from './views/lista/listasUsuarios/ListasUsuarios'
import Premium from './views/premium/Premium'

export interface IUser {
  userName: string;
  pfp: string;
  rol: string;
  token?: string;
}

function App() {
  const [user, setUser] = useState<IUser>();

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Register />} />
        <Route path='/perfil' element={<ProfilePage />} />

        <Route path='/perfumes' element={<ListaPerfumes />} />
        <Route path='/perfume/:id' element={<PaginaPerfume user={user} setUser={setUser} />} />
        <Route path='/perfume/form' element={<FormularioPerfume />} />

        <Route path='/perfumista/formulario' element={<FormularioPerfumista />} />
        <Route path='/perfumista/:id' element={<PaginaPerfumista user={user} setUser={setUser} />} />

        <Route path='/marcas' element={<ListaMarcas />} />
        <Route path='/marca/:nombre' element={<PaginaMarca />} />
        <Route path='/marca' element={<PaginaMarca />} />

        <Route path='/listas' element={<ListasUsuarios />} />
        <Route path='/premium' element={<Premium />} />
      </Routes>

      <BuyMeACoffee />
      <Footer />
    </BrowserRouter>
  )
}

export default App
