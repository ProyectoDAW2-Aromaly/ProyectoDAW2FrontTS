import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BuyMeACoffee from './components/BuyMeACoffee'

import Inicio from './views/inicio/Inicio'
import Login from './views/usuarios/Login'
import Register from './views/usuarios/Register'
import ProfilePage from './views/perfil/ProfilePage'
import NotFoundPage from './views/not-found/NotFoundPage'

import ListaPerfumes from './views/listadoPerfumes/ListaPerfumes'
import PaginaPerfume from './views/perfume/PaginaPerfume'
import FormularioPerfume from './views/formularioPerfume/FormularioPerfume'

import PaginaPerfumista from './views/perfumista/PaginaPerfumista'
import FormularioPerfumista from './views/formularioPerfumista/FormularioPerfumista'

import ListaMarcas from './views/marca/listaMarcas/ListaMarcas'
import PaginaMarca from './views/marca/marcaDetalles/PaginaMarca'

import ListasUsuarios from './views/lista/listasUsuarios/ListasUsuarios'
import ListDetailPage from './views/lista/ListDetailPage'
import Premium from './views/premium/Premium'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop/>

      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Register />} />
        <Route path='/perfil' element={<ProfilePage />} />

        <Route path='/perfumes' element={<ListaPerfumes />} />
        <Route path='/perfume/formulario' element={<FormularioPerfume />} />

        <Route path='/perfume/:id' element={<PaginaPerfume />} />

        <Route path='/perfumista/formulario' element={<FormularioPerfumista />} />
        <Route path='/perfumista/:id' element={<PaginaPerfumista />} />

        <Route path='/marcas' element={<ListaMarcas />} />
        <Route path='/marca/:nombre' element={<PaginaMarca />} />
        <Route path='/marca' element={<PaginaMarca />} />

        <Route path='/listas' element={<ListasUsuarios />} />
        <Route path='/listas/:idLista' element={<ListDetailPage />} />
        <Route path='/premium' element={<Premium />} />
        <Route path='/not-found' element={<NotFoundPage />} />
      </Routes>

      <BuyMeACoffee />
      <Footer />
    </BrowserRouter>
  )
}

export default App
