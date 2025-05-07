/**
 * AuthProvider container.
 * @module components/Providers/AuthProvider
 */
import React from 'react';
import { Button } from '@plone/components';
import { useIntl } from 'react-intl';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import icons from '@plone-collective/volto-authomatic/icons/index';
import type { AuthProviderOption } from '@plone-collective/volto-authomatic/types';
import messages from '@plone-collective/volto-authomatic/messages';
import './AuthProvider.scss';

interface AuthProviderProps {
  provider: AuthProviderOption;
  action: 'login' | 'register';
  onSelectProvider: (provider: AuthProviderOption) => void;
}

function AuthProvider({
  provider,
  action,
  onSelectProvider,
}: AuthProviderProps): JSX.Element {
  const providerId = provider.id;
  const icon = icons[providerId];
  const intl = useIntl();
  const label =
    action === 'login'
      ? intl.formatMessage(messages.LoginWith)
      : intl.formatMessage(messages.RegisterWith);
  return (
    <Button
      className="authenticationProvider"
      id={provider.id}
      onClick={() => onSelectProvider(provider)}
    >
      {icon && (
        <Icon
          className={'provider'}
          name={icon}
          title={provider.title}
          size="32px"
        />
      )}
      <span className={'label'}>
        {label} {provider.title}
      </span>
    </Button>
  );
}

export default AuthProvider;
