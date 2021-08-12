/**
 * Login container.
 * @module components/Login/Login
 */
import React, { useEffect, useState } from 'react';
import { Helmet } from '@plone/volto/helpers';
import { Container, Segment } from 'semantic-ui-react';
import { authomaticRedirect, listAuthOptions } from '../../actions';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import AuthProviders from '../AuthProviders/AuthProviders';

const messages = defineMessages({
  Login: {
    id: 'Login',
    defaultMessage: 'Login',
  },
});

/**
 * Login function.
 * @function Login
 * @returns {JSX.Element} Markup of the Login page.
 */
function Login({ intl }) {
  const dispatch = useDispatch();
  const [startedOAuth, setStartedOAuth] = useState(false);
  const loading = useSelector((state) => state.authOptions.loading);
  const options = useSelector((state) => state.authOptions.options);
  const loginValues = useSelector((state) => state.authomaticRedirect);

  useEffect(() => {
    dispatch(listAuthOptions());
  }, [dispatch]);

  useEffect(() => {
    const next_url = loginValues.next_url;
    const session = loginValues.session;
    if (next_url && session && startedOAuth) {
      setStartedOAuth(false);
      // Give time to save state to localstorage
      setTimeout(function () {
        window.location.href = next_url;
      }, 500);
    }
  }, [startedOAuth, loginValues]);

  const onSelectProvider = (provider) => {
    setStartedOAuth(true);
    dispatch(authomaticRedirect(provider.id));
  };

  return (
    <div id="page-login">
      <Helmet title={intl.formatMessage(messages.Login)} />
      <Container text>
        <Segment.Group raised>
          <Segment className="primary">
            <FormattedMessage id="Log In" defaultMessage="Login" />
          </Segment>
          <Segment secondary>
            <FormattedMessage
              id="Select Login Provider"
              defaultMessage="Select Login Provider"
            />
          </Segment>
          <Segment className="form">
            {!loading && options && (
              <AuthProviders
                providers={options}
                action={'login'}
                onSelectProvider={onSelectProvider}
              />
            )}
          </Segment>
        </Segment.Group>
      </Container>
    </div>
  );
}

export default injectIntl(Login);
