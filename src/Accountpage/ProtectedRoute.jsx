import { Navigate } from 'react-router-dom';
import { isLoggedIn, isAdmin as checkAdmin } from '../auth';

export default function ProtectedRoute({ children, adminOnly = false }) {
  if (!isLoggedIn()) return <Navigate to="/Signin" replace />;
  if (adminOnly && !checkAdmin()) return <Navigate to="/Home" replace />;
  return children;
}
