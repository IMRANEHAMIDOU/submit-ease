import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/pages/login'
import SignUp from './components/pages/signup'
import Home from './components/pages/home'
import Wrapper from './layouts/wrapper'
import AuthLayout from './layouts/auth-layout'
import HomeLayout from './layouts/home-layout'
import AdminLayout from './layouts/admin-layout'
import NotFound from './components/pages/not-fount'
import Campaigns from './components/pages/campaign/campaigns'
import AdminOrganization from './components/pages/admin/admin-organization'
import SuperAdmin from './components/pages/super-admin/super-admin'
import OrganizationsList from './components/pages/super-admin/organizations-list'
import UsersList from './components/pages/super-admin/users-list'
import CanditateAdmin from './components/pages/candidate/canditate-admin'
import CampaignList from './components/pages/admin/campaign-list'
import ProfileUser from './components/pages/super-admin/ProfileUser'
import CampaignAdminShow from './components/pages/admin/campaign-show'
import Postule from './components/pages/candidate/postule'
import MyCampaigns from './components/pages/candidate/my-campaigns'


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
          <Route path="/c/:link" element={<CampaignAdminShow role='candidate' />} />
        </Route>

        {/* Admin and superadmin routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminOrganization />} />
          <Route path="/admin/campaigns" element={<CampaignList />} />
          <Route path="/admin/campaigns/:id" element={<CampaignAdminShow role='admin' />} />

          <Route path="/superadmin" element={<SuperAdmin />} />
          <Route path="/superadmin/organizations" element={<OrganizationsList />} />
          <Route path="/superadmin/users" element={<UsersList />} />
          {/* Tu peux continuer à ajouter tes autres routes */}

          <Route path="/candidate" element={<CanditateAdmin />} />
          <Route path="/candidate/campaigns" element={<Campaigns />} />
          <Route path="/candidate/mycampaigns" element={<MyCampaigns />} />
          <Route path="/candidate/c/:link" element={<Postule />} />
          <Route path="/candidate/profile" element={<ProfileUser />} />

          <Route path="/admin/profile" element={<ProfileUser />} />
          <Route path="/superadmin/profile" element={<ProfileUser />} />
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
