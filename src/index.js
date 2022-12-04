import { Login, LoginAuthomatic, Logout } from './components';
import { authomaticRedirect, authOptions } from './reducers';
import { Login as VoltoLogin } from '@plone/volto/components';

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
    { path: '/fallback_login', component: VoltoLogin },
    { path: '/login', component: Login },
    { path: '/**/login', component: Login },
    { path: '/logout', component: Logout },
    { path: '/**/logout', component: Logout },
    { path: '/register', component: Login },
    {
      path: `/(${config.settings?.supportedLanguages.join('|')})/register`,
      component: Login,
    },
    { path: '/login-authomatic/:provider', component: LoginAuthomatic },
  );
  return config;
};

export default applyConfig;
