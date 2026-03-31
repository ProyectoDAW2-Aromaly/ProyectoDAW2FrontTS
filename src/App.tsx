import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import PerfumePage from './views/perfume/PerfumePage'
import Home from './views/home/Home'
import Navbar from './components/Navbar'
import { useState } from 'react'

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
          <Route path='/' element={<Home />} />
          <Route path='/perfume' element={<PerfumePage user={user} setUser={setUser} />} />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
