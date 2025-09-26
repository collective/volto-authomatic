import type { ConfigType } from '@plone/registry';

import installReducers from './config/reducers';
import installRoutes from './config/routes';
import installSettings from './config/settings';
import './styles.css';

export function applyConfig(config: ConfigType) {
  installReducers(config);
  installRoutes(config);
  installSettings(config);
  return config;
}

export default applyConfig;
