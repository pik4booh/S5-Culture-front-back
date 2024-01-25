import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3.js')));

// ==============================|| MAIN ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <AuthLogin3 />
};

export default LoginRoutes;
