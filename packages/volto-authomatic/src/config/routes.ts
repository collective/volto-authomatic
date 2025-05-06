import type { ConfigType } from '@plone/registry';
import Login from '@plone-collective/volto-authomatic/components/Login/Login';
import Authomatic from '@plone-collective/volto-authomatic/components/AuthBackends/Authomatic/Authomatic';
import OIDC from '@plone-collective/volto-authomatic/components/AuthBackends/OIDC/OIDC';
import Logout from '@plone-collective/volto-authomatic/components/Logout/Logout';
import VoltoLogin from '@plone/volto/components/theme/Login/Login';

export default function install(config: ConfigType) {
  config.settings.nonContentRoutes = [
    ...config.settings.nonContentRoutes,
    /^\/login-authomatic\/.*$/,
    /^\/login-oidc\/.*$/,
  ];
  config.addonRoutes.push(
    { path: '/fallback_login', exact: true, component: VoltoLogin },
    { path: '/failsafe_login', exact: true, component: VoltoLogin },
    { path: '/login', exact: true, component: Login },
    { path: '/**/login', exact: true, component: Login },
    { path: '/logout', exact: true, component: Logout },
    { path: '/**/logout', exact: true, component: Logout },
    { path: '/register', exact: true, component: Login },
    {
      path: `/(${config.settings?.supportedLanguages.join('|')})/register`,
      exact: true,
      component: Login,
    },
    {
      path: '/login-authomatic/:provider',
      exact: true,
      component: Authomatic,
    },
    { path: '/login-oidc/:provider', exact: true, component: OIDC },
  );
  return config;
}
