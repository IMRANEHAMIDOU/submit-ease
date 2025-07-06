import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/auth/login'
import SignUp from './pages/auth/signup'
import Home from './pages/home'
import NotFound from './pages/not-fount'
import Campaigns from './pages/public/campaigns'
import CampaignList from './pages/admin/campaign-list'
import CampaignAdminShow from './pages/admin/campaign-admin-show'
import OrganizationsList from './pages/superadmin/organization-list'
import UsersList from './pages/superadmin/users-list'
import SuperAdminDashboard from './pages/superadmin/super-admin'
import MyCampaigns from './pages/candidate/my-campaigns'
import Postule from './pages/candidate/postule'

import AuthLayout from './layouts/auth-layout'
import HomeLayout from './layouts/home-layout'
import AdminDashboard from './pages/admin/admin-dashboard'
import CampaignPublicShow from './pages/public/campaign-public-show'
import CandidateDashboard from './pages/candidate/candidate-dashboard'
import ProfileUser from './pages/shared/profile-user'
import RequireAuth from './layouts/RequireAuth'
import BaseLayout from './layouts/BaseLayout'

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
          <Route path="/c/:link" element={<CampaignPublicShow />} />
        </Route>

        {/* Connected routes (BaseLayout commun) */}
        <Route element={<RequireAuth allowedRoles={['admin', 'superadmin', 'candidate']}>
          <BaseLayout /></RequireAuth>}>

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/campaigns" element={<CampaignList />} />
          <Route path="/admin/campaigns/:id" element={<CampaignAdminShow />} />
          <Route path="/admin/profile" element={<ProfileUser />} />

          {/* Candidate */}
          <Route path="/candidate/dashboard" element={<CandidateDashboard/>} />
          <Route path="/candidate/campaigns" element={<Campaigns />} />
          <Route path="/candidate/mycampaigns" element={<MyCampaigns />} />
          <Route path="/candidate/c/:link" element={<Postule />} />
          <Route path="/candidate/profile" element={<ProfileUser />} />

          {/* SuperAdmin */}
          <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
          <Route path="/superadmin/organizations" element={<OrganizationsList />} />
          <Route path="/superadmin/users" element={<UsersList />} />
          <Route path="/superadmin/profile" element={<ProfileUser />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
