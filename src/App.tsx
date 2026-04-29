import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { useContext } from 'react'

import UserContext from './context/UserContext'

import PaginaPerfume from './views/perfume/PaginaPerfume'
import Home from './views/inicio/Home'
import Login from './views/usuarios/Login'
import Register from './views/usuarios/Register'
import Navbar from './components/Navbar'
import PerfumeForm from './views/formularioPerfume/PerfumeForm'
import Footer from './components/Footer'
import PerfumerPage from './views/perfumer/PerfumerPage'
import PerfumerForm from './views/formularioPerfumista/PerfumerForm'
import BrandsList from './views/brand/brandlist/BrandsList'
import BrandPage from './views/brand/singlebrand/BrandPage'
import UserLists from './views/lista/userlists/UserLists'
import ListDetailPage from './views/lista/ListDetailPage'
import Premium from './views/premium/Premium'
import BuyMeACoffee from './components/BuyMeACoffee'
import ListPerfumes from './views/listadoPerfumes/ListPerfumes'
import ProfilePage from './views/perfil/ProfilePage'
import NotFoundPage from './views/not-found/NotFoundPage'

function App() {
  const userContext = useContext(UserContext);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Register />} />
        <Route path='/perfil' element={<ProfilePage />} />

        <Route path='/perfumes' element={<ListPerfumes />} />
        <Route
          path='/perfume'
          element={
            <PaginaPerfume
              user={userContext?.user ?? undefined}
            />
          }
        />

        <Route
          path='/perfumer'
          element={
            <PerfumerPage
              user={userContext?.user ?? undefined}
            />
          }
        />

        <Route path='/perfume/form' element={<PerfumeForm />} />

       
        <Route path='/perfumer/form' element={<PerfumerForm />} />

        <Route path='/brands' element={<BrandsList />} />
        <Route path='/brand' element={<BrandPage />} />
        <Route path='/lists' element={<UserLists />} />
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
