import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const RouteGuard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

  useEffect(() => {
    const path = location.pathname;

    if (!userSession) {
      // Redirect unauthenticated users trying to access protected paths except /CheckUser and /unauth-page
      if (
        path === '/CheckUser' &&
        path !== '/unauth-page' &&
        (path.startsWith('/admin') || path.startsWith('/nurse') || path.startsWith('/patient'))
      ) {
        navigate('/CheckUser', { replace: true });
      }
    } else {
      const role = userSession.user.role;

      // Prevent authenticated users from visiting /CheckUser or /auth/login (uncommented code)
     /* if (path === '/CheckUser') {
        switch (role) {
          case 'admin':
            navigate('/admin/dashboard', { replace: true });
            return;
          case 'nurse':
            navigate('/nurse/dashboard', { replace: true });
            return;
          case 'patient':
            navigate('/patient/home', { replace: true });
            return;
          default:
            break;
        }
      }*/

      // Unauthorized access for wrong roles
      if (
        (path.startsWith('/admin') && role !== 'admin') ||
        (path.startsWith('/nurse') && role !== 'nurse') ||
        (path.startsWith('/patient') && role !== 'customer')
      ) {
        navigate('/unauth-page', { replace: true });
      }
    }
  }, [location, navigate, userSession]);

  return null;
};

export default RouteGuard;
