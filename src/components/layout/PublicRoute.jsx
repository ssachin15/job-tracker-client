import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

function PublicRoute() {
  const { isAuth } = useAuthStore();

  if (isAuth) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;