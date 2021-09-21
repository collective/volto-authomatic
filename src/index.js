import { Login, LoginAuthomatic, Logout } from './components';
import { authomaticRedirect, authOptions } from './reducers';

const applyConfig = (config) => {
  config.addonReducers = {
    ...config.addonReducers,
    authomaticRedirect,
    authOptions,
  };
  config.settings.persistentReducers = [
    ...config.settings.persistentReducers,
    'authomaticRedirect',
  ];
  config.settings.nonContentRoutes = [
    ...config.settings.nonContentRoutes,
    /^\/login-authomatic\/.*$/,
  ];
  config.addonRoutes.push(
    { path: '/login', component: Login },
    { path: '/logout', component: Logout },
    { path: '/register', component: Login },
    { path: '/login-authomatic/:provider', component: LoginAuthomatic },
  );
  return config;
};

export default applyConfig;
