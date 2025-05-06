/**
 * AuthProvider container.
 * @module components/Providers/AuthProvider
 */
import React from 'react';
import { Button } from '@plone/components';
import { FormattedMessage } from 'react-intl';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import icons from '@plone-collective/volto-authomatic/icons/index';
import type { AuthProviderOption } from '@plone-collective/volto-authomatic/types';
import './AuthProvider.scss';

interface AuthProviderProps {
  provider: AuthProviderOption;
  action: 'login' | 'register';
  onSelectProvider: (provider: AuthProviderOption) => void;
}

/**
 * AuthProvider function.
 * @function AuthProvider
 * @returns {JSX.Element} Markup of the AuthProvider option.
 */
function AuthProvider({
  provider,
  action,
  onSelectProvider,
}: AuthProviderProps): JSX.Element {
  const providerId = provider.id;
  const icon = icons[providerId];

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
        {action === 'login' && (
          <FormattedMessage id="Log in with" defaultMessage="Log in with" />
        )}
        {action === 'register' && (
          <FormattedMessage id="Sign up with" defaultMessage="Sign up with" />
        )}{' '}
        {provider.title}
      </span>
    </Button>
  );
}

export default AuthProvider;
