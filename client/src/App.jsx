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

  return (
    <>
      {isAdminRoute ? <AdminNavbar /> : isMedicalRoute ? <Navbar pos={'static'}/> : <Navbar pos={'fixed'}/> }
      {children}
      {!isAdminRoute && isMedicalRoute ? <Footer pos={'static'} isLoggedIn={isLoggedIn} onLogout={handleLogout} /> :<Footer pos={'fixed'} isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
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
          <Route path="/admin/home" element={<HomepageAdmin />}/>
          <Route path="/admin/addpatient" element={<Addpatient />}/>
          <Route path="/admin/addmedical" element={<Addmedical />}/>
          <Route path="/admin/updatepatient" element={<Updatepatient />}/>
          <Route path="/admin/updatemedical" element={<Updatemedical/>}/>
          <Route path="/admin/removepatient" element={<Removepatient/>}/>
          <Route path="/admin/removemedical" element={<Removemedical/>}/>

          <Route path="/medical/home" element={<Homepagemedical />}/>
          <Route path="/medical/ehr" element={<Ehrmedical />}/>
        </Routes>
      </LayoutWrapper>
    </Router>
    </>
  )
}

export default App
