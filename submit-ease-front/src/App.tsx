
import { BrowserRouter, Route, Routes, } from 'react-router-dom'
import Login from './components/pages/login'
import SignUp from './components/pages/signup'
import Home from './components/pages/home'
import Wrapper from './layouts/wrapper'
import AuthLayout from './layouts/auth-layout'
import HomeLayout from './layouts/home-layout'
import NotFound from './components/pages/not-fount'

function App() {

  return (
   <BrowserRouter>
       <Routes>
          <Route element={<AuthLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
          </Route>

          <Route element={<Wrapper />}>
             
          </Route>

          <Route element={<HomeLayout />}>
             <Route path='/' element={<Home />} />
          </Route>
         
          <Route path="*" element={<NotFound />} />
       </Routes>
    </BrowserRouter>
  )
}

export default App
