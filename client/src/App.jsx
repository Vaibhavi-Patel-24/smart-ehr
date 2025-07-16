import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import React, { useState } from 'react';
import LoginCommon from './pages/Login.common'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminNavbar from './components/admin/Navbar.admin'
import LoginAdmin from './pages/admin/Login.admin'
import HomepageAdmin from './pages/admin/Homepage.admin'
import Addpatient from './pages/admin/Addpatient.admin'
import Addmedical from './pages/admin/Addmedical.admin'
import Homepagemedical from './components/medical/Homepage.medical';
import Updatemedical from './pages/admin/Updatemedical.admin';
import Updatepatient from './pages/admin/Updatepatient.admin';
import Removepatient from './pages/admin/Removepatient.admin';
import Removemedical from './pages/admin/Removemedical.admin';
import Ehrmedical from './pages/medical/Ehr.medical';
import HomepagePatient from './pages/patient/Homepage.patient';
import Notification from './pages/medical/Notification.admin';
import ProtectedRoute from './components/ProtectedRoute';
function LayoutWrapper({ children }) {
  const location = useLocation()
    const [isLoggedIn, setIsLoggedIn] = useState(true);
      const handleLogout = () => {
    // Your logout logic here
        setIsLoggedIn(false);
      };
  // Check if the current path starts with "/admin"
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isMedicalRoute = location.pathname.startsWith('/medical')
  const isPatientlRoute = location.pathname.startsWith('/patient')

  return (
    <>
      {isAdminRoute ? <AdminNavbar /> : isMedicalRoute | isPatientlRoute ? <Navbar pos={'static'}/> : <Navbar pos={'fixed'}/> }
      {children}
      {!isAdminRoute && isMedicalRoute || isPatientlRoute ? <Footer pos={'static'} isLoggedIn={isLoggedIn} onLogout={handleLogout} /> :<Footer pos={'fixed'} isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
    </>
  )
}

function App() {

  return (
    <>
      <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<LoginCommon />} />
          <Route path="/admin" element={<LoginAdmin />}/>
          <Route path="/admin/home" element={<ProtectedRoute requiredRole="admin"><HomepageAdmin /></ProtectedRoute>}/>
          <Route path="/admin/addpatient" element={<ProtectedRoute requiredRole="admin"><Addpatient /></ProtectedRoute>}/>
          <Route path="/admin/addmedical" element={<ProtectedRoute requiredRole="admin"><Addmedical /></ProtectedRoute>}/>
          <Route path="/admin/updatepatient" element={<ProtectedRoute requiredRole="admin"><Updatepatient /></ProtectedRoute>}/>
          <Route path="/admin/updatemedical" element={<ProtectedRoute requiredRole="admin"><Updatemedical/></ProtectedRoute>}/>
          <Route path="/admin/removepatient" element={<ProtectedRoute requiredRole="admin"><Removepatient/></ProtectedRoute>}/>
          <Route path="/admin/removemedical" element={<ProtectedRoute requiredRole="admin"><Removemedical/></ProtectedRoute>}/>
          <Route path="/medical/home" element={<ProtectedRoute requiredRole="medical"><Homepagemedical /></ProtectedRoute>}/>
<Route path="/medical/ehr/:patientId" element={<ProtectedRoute requiredRole="medical"><Ehrmedical /></ProtectedRoute>} />
          <Route path="/patient/home" element={<ProtectedRoute requiredRole="patient"><HomepagePatient /></ProtectedRoute>}/>
          <Route path='/medical/notification' element={<ProtectedRoute requiredRole="medical"><Notification/></ProtectedRoute>}/>
        </Routes>
      </LayoutWrapper>
    </Router>
    </>
  )
}

export default App
