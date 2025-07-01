import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/pages/login'
import SignUp from './components/pages/signup'
import Home from './components/pages/home'
import Wrapper from './layouts/wrapper'
import AuthLayout from './layouts/auth-layout'
import HomeLayout from './layouts/home-layout'
import AdminLayout from './layouts/admin-layout'
import NotFound from './components/pages/not-fount'
import Campaigns from './components/pages/campaigns'
import CampaignDetail from './components/pages/campaingn-details'
import AdminOrganization from './components/pages/admin/admin-organization'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes d'authentification */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* Routes publiques avec HomeLayout */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/:id" element={<CampaignDetail />} />
        </Route>

        {/* Routes administrateur */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminOrganization />} />
          <Route path='/admin/profile' />
          <Route path='/admin/campaigns' />
          <Route path="/admin/campaigns/new" />
          <Route path="/admin/campaigns/1" />
          <Route path="/admin/campaigns/1/edit" />
          <Route path='/admin/campaigns/1/applications' />
          <Route path='/admin/campaigns/1/applications/1' />

        </Route>

        {/* Wrapper pour routes protégées supplémentaires si nécessaire */}
        <Route element={<Wrapper />}>
          {/* Ajoutez ici d'autres routes protégées */}
        </Route>

        {/* Page 404 - doit être en dernier */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App