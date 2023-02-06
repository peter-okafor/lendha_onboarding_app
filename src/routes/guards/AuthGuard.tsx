import { lazy, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { path } from '../path';

const DashboardLayout = lazy(() => import('@/components/layouts/DashboardLayout'));

const AuthGuard = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useLocalStorage('email', '');

  useEffect(() => {
    if (!email) {
      setEmail('');
      navigate(path.SIGNIN);
    }
  }, [email, navigate, setEmail]);

  return email ? <DashboardLayout /> : null;
};

export default AuthGuard;
