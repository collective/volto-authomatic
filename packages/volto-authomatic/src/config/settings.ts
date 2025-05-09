import type { ConfigType } from '@plone/registry';

declare module '@plone/types' {
  export interface SettingsConfig {
    showPloneLogin: boolean;
  }
}

export default function install(config: ConfigType) {
  config.settings.showPloneLogin = false;
  return config;
}
