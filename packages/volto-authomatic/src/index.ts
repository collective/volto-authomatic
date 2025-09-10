import type { ConfigType } from '@plone/registry';

import installReducers from './config/reducers';
import installRoutes from './config/routes';
import conditionalPersistenceMiddleware from './middleware/conditionalPersistenceMiddleware';
import './styles.css';

export function applyConfig(config: ConfigType) {
  installReducers(config);
  installRoutes(config);

  // Add middleware to prevent unnecessary localStorage for anonymous users
  config.settings.storeExtenders = [
    ...config.settings.storeExtenders,
    conditionalPersistenceMiddleware,
  ];

  return config;
}

export default applyConfig;
