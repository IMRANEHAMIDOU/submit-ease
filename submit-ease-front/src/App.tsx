
import { BrowserRouter, Route, Routes, } from 'react-router-dom'
import './App.css'
import Login from './components/pages/login'
import SignUp from './components/pages/signup'
import Home from './components/pages/home'
import Wrapper from './layouts/wrapper'
import AuthLayout from './layouts/auth-layout'

function App() {

  return (
   <BrowserRouter>
       <Routes>
          <Route element={<AuthLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
          </Route>

          <Route element={<Wrapper />}>
            <Route path='/' element={<Home />} />
          </Route>
       </Routes>
    </BrowserRouter>
  )
}

export default App
