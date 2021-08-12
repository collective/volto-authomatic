/**
 * AuthProviders container.
 * @module components/AuthProviders/AuthProviders
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import AuthProvider from '../AuthProvider/AuthProvider';

import './AuthProviders.css';

/**
 * AuthProviders function.
 * @function AuthProviders
 * @returns {JSX.Element} Markup of the a list of AuthProviders.
 */
function AuthProviders({ providers, action, onSelectProvider }) {
  return (
    <Container id={'authenticationProviders'}>
      {providers.map(function (provider, i) {
        return (
          provider && (
            <AuthProvider
              key={i}
              provider={provider}
              action={action}
              onSelectProvider={onSelectProvider}
            />
          )
        );
      })}
    </Container>
  );
}

AuthProviders.propTypes = {
  providers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      plugin: PropTypes.string,
    }),
  ).isRequired,
  action: PropTypes.string,
  onSelectProvider: PropTypes.func.isRequired,
};

AuthProviders.defaultProps = {
  action: 'login',
};

export default AuthProviders;
