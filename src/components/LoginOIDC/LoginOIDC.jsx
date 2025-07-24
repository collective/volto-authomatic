/**
 * LoginOIDC container.
 * @module components/LoginOIDC/LoginOIDC
 *
 * Commented out redirects to `/` on login
 * Added check for login progress to prevent multiple requests being fired
 */
import React, { useEffect } from 'react';
import { oidcLogin } from '../../actions';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { Toast } from '@plone/volto/components';
import { defineMessages, injectIntl } from 'react-intl';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

const messages = defineMessages({
  oAuthLoginFailed: {
    id: 'Login Failed',
    defaultMessage: 'Login Failed',
  },
  oAuthLoginFailedContent: {
    id: 'Authentication failed.',
    defaultMessage: 'Authentication failed.',
  },
  authenticating: {
    id: 'Authenticating',
    defaultMessage: 'Authenticating',
  },
});

/**
 * LoginAuthomatic function.
 * @function LoginOIDC
 * @returns {JSX.Element} Markup of the LoginOIDC page.
 */
function LoginOIDC({ intl }) {
  const query = useLocation().search;
  const { provider } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const session = useSelector((state) => state.oidcRedirect.session);
  const isLoading = useSelector((state) => state.userSession.login.loading);
  const hasLoaded = useSelector((state) => state.userSession.login.loaded || !!state.userSession.login.error);
  const error = useSelector((state) => state.userSession.login.error, shallowEqual);
  const token = useSelector((state) => state.userSession.token);

  useEffect(() => {
    if (!isLoading && !hasLoaded) {
      dispatch(oidcLogin(provider, query, session));
    }
  }, [dispatch, provider, query, session, isLoading, hasLoaded]);

  useEffect(() => {
    if (token) {
      history.push('/');
      if (toast.isActive('loginFailed')) {
        toast.dismiss('loginFailed');
      }
    }
  }, [token, history]);

  useEffect(() => {
    if (error) {
      history.push('/login');
      if (!toast.isActive('loginFailed')) {
        toast.error(<Toast error title={intl.formatMessage(messages.oAuthLoginFailed)} content={intl.formatMessage(messages.oAuthLoginFailedContent)} />, { autoClose: false, toastId: 'loginFailed' });
      }
    }
  }, [error, history, intl]);

  return (
    <div id="page-login">
      <Container text>
        <Dimmer active={isLoading}>
          <Loader size={'huge'}>{intl.formatMessage(messages.authenticating)}</Loader>
        </Dimmer>
      </Container>
    </div>
  );
}

export default injectIntl(LoginOIDC);
