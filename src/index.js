import FallbackLogin from './components/FallbackLogin';
import Login from './components/Login/Login';
import conditionalPersistenceMiddleware from './middleware/conditionalPersistenceMiddleware';
import LoginAuthomatic from './components/LoginAuthomatic/LoginAuthomatic';
import LoginOIDC from './components/LoginOIDC/LoginOIDC';
import Logout from './components/Logout/Logout';
import { authomaticRedirect, authOptions, oidcLogout, oidcRedirect } from './reducers';

const applyConfig = (config) => {
  config.addonReducers = {
    ...config.addonReducers,
    authomaticRedirect,
    authOptions,
    oidcLogout,
    oidcRedirect,
  };

  config.settings.storeExtenders = [...(config.settings.storeExtenders || []), (middlewares) => [conditionalPersistenceMiddleware, ...middlewares]];
  config.settings.nonContentRoutes = [...config.settings.nonContentRoutes, /^\/login-authomatic\/.*$/, /^\/login-oidc\/.*$/];
  config.addonRoutes.push(
    { path: '/fallback_login', component: FallbackLogin },
    { path: '/**/fallback_login', component: FallbackLogin },
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
    { path: '/login-oidc/:provider', component: LoginOIDC },
  );
  return config;
};

export default applyConfig;
