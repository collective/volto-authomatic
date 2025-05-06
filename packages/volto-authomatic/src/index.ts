import type { ConfigType } from '@plone/registry';

import installReducers from './config/reducers';
import installRoutes from './config/routes';
import './styles.css';

export function applyConfig(config: ConfigType) {
  installReducers(config);
  installRoutes(config);
  return config;
}

export default applyConfig;
