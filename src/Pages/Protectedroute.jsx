// components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Authcontext/Context';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    // Redirect to login if there's no user
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;