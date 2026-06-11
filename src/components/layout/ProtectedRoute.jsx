import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

function ProtectedRoute() {
  const { isAuth } = useAuthStore();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
