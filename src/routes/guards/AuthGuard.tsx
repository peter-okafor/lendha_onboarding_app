import Cookies from 'js-cookie';
import { lazy, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { path } from '../path';

const DashboardLayout = lazy(() => import('@/components/layouts/DashboardLayout'));

const ProutectedRoutes = () => {
  const navigate = useNavigate();

  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      navigate(path.SIGNIN);
    }
  }, [navigate, token]);

  return token ? <DashboardLayout /> : null;
};

export default ProutectedRoutes;
