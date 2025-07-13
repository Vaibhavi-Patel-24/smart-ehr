import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import LoginCommon from './pages/Login.common'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminNavbar from './components/admin/Navbar.admin'
import LoginAdmin from './pages/admin/Login.admin'
import HomepageAdmin from './pages/admin/Homepage.admin'
import Homepagemedical from './components/medical/Homepage.medical'

function LayoutWrapper({ children }) {
  const location = useLocation()

  // Check if the current path starts with "/admin"
  const isAdminRoute = location.pathname.startsWith('/admin')
  // const isMedicalRoute = location.pathname.startsWith('/medical')

  return (
    <>
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
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
          <Route path="/admin/login" element={<LoginAdmin />}/>
          <Route path="/admin/home" element={<HomepageAdmin />}/>
          <Route path="/medical/home" element={<Homepagemedical />}/>

        </Routes>
      </LayoutWrapper>
    </Router>
    </>
  )
}

export default App
