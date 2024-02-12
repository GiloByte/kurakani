import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts';

export function useLogout() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  return () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };
}
