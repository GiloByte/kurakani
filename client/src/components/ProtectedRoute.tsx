import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../contexts';

export const ProtectedRoute = () => {
  const { user } = useUser();
  return user && user.token ? <Outlet /> : <Navigate to="/" replace />;
};
