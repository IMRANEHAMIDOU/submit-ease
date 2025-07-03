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
import SuperAdmin from './components/pages/super-admin/super-admin'
import OrganizationsList from './components/pages/super-admin/organizations-list'
import UsersList from './components/pages/super-admin/users-list'
import CanditateAdmin from './components/pages/candidate/canditate-admin'
import CampaignList from './components/pages/admin/campaign-list'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* Public routes */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/:id" element={<CampaignDetail />} />
        </Route>

        {/* Admin and superadmin routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminOrganization />} />
          <Route path="/admin/campaigns" element={<CampaignList />} />

          <Route path="/superadmin" element={<SuperAdmin />} />
          <Route path="/superadmin/organizations" element={<OrganizationsList />} />
          <Route path="/superadmin/users" element={<UsersList />} />
          {/* Tu peux continuer à ajouter tes autres routes */}

          <Route path="/candidate" element={<CanditateAdmin />} />
        </Route>

        {/* Wrapper routes */}
        <Route element={<Wrapper />}>
          {/* Protected routes si besoin */}
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
