import type { ConfigType } from '@plone/registry';

declare module '@plone/types' {
  export interface SettingsConfig {
    showPloneLogin: boolean;
    displayLogout: boolean;
  }
}

export default function install(config: ConfigType) {
  config.settings.showPloneLogin = false;
  config.settings.displayLogout = true;
  return config;
}
