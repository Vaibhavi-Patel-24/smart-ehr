// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('token');

//   if (!token) {
//     // not logged in → redirect to login
//     return <Navigate to="/" />;
//   }

//   return children; // allow access
// };

// export default ProtectedRoute;
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    // No token → go to the correct login page
    switch (requiredRole) {
      case 'admin':
        return <Navigate to="/admin" />;
      case 'medical':
        return <Navigate to="/" />; // medical login is on common page
      case 'patient':
        return <Navigate to="/" />;
      default:
        return <Navigate to="/" />;
    }
  }

  if (requiredRole && role !== requiredRole) {
    // Has token, but wrong role
    switch (role) {
      case 'admin':
        return <Navigate to="/admin/home" />;
      case 'medical':
        return <Navigate to="/medical/home" />;
      case 'patient':
        return <Navigate to="/patient/home" />;
      default:
        return <Navigate to="/" />;
    }
  }

  return children;
};

export default ProtectedRoute;
