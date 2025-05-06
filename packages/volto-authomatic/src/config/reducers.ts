import type { ConfigType } from '@plone/registry';

import authomaticRedirect from '@plone-collective/volto-authomatic/reducers/auth/authomaticRedirect';
import authOptions from '@plone-collective/volto-authomatic/reducers/auth/authOptions';
import oidcLogout from '@plone-collective/volto-authomatic/reducers/auth/oidcLogout';
import oidcRedirect from '@plone-collective/volto-authomatic/reducers/auth/oidcRedirect';

export default function install(config: ConfigType) {
  config.addonReducers = {
    ...config.addonReducers,
    authomaticRedirect,
    authOptions,
    oidcLogout,
    oidcRedirect,
  };
  config.settings.persistentReducers = [
    ...config.settings.persistentReducers,
    'authomaticRedirect',
    'oidcLogout',
    'oidcRedirect',
  ];
  return config;
}
