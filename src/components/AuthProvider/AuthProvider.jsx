/**
 * AuthProvider container.
 * @module components/AuthProvider/AuthProvider
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Icon } from '@plone/volto/components';
import icons from '../../icons';

import './AuthProvider.css';

/**
 * AuthProvider function.
 * @function AuthProvider
 * @returns {JSX.Element} Markup of the a AuthProvider option.
 */
function AuthProvider({ provider, action, onSelectProvider }) {
  const providerId = provider.id;
  const icon = icons[providerId];
  return (
    <Button
      className="authenticationProvider"
      id={provider.id}
      title={provider.title}
      onClick={() => onSelectProvider(provider)}
    >
      {icon && <Icon name={icon} title={provider.title} size="32px" />}
      {action === 'login' && (
        <FormattedMessage id="Log in with" defaultMessage="Log in with" />
      )}
      {action === 'register' && (
        <FormattedMessage id="Sign up with" defaultMessage="Sign up with" />
      )}{' '}
      {provider.title}
    </Button>
  );
}

AuthProvider.propTypes = {
  provider: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    plugin: PropTypes.string,
  }).isRequired,
  action: PropTypes.string,
  onSelectProvider: PropTypes.func.isRequired,
};

AuthProvider.defaultProps = {
  action: 'login',
};

export default injectIntl(AuthProvider);
