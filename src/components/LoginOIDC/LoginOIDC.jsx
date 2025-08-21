/**
 * LoginOIDC container.
 * @module components/LoginOIDC/LoginOIDC
 */
import React, { useEffect } from 'react';
import { oidcLogin } from '../../actions';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { Toast } from '@plone/volto/components';
import { defineMessages, injectIntl } from 'react-intl';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

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
  const userSession = useSelector((state) => state.userSession);
  const isLoading = userSession.login.loading;
  const error = userSession.login.error;
  const token = userSession.token;
  const [cookies, , removeCookie] = useCookies();
  const return_url = cookies.return_url || '/';

  useEffect(() => {
    dispatch(oidcLogin(provider, query, session));
  }, [dispatch, provider, query, session]);

  useEffect(() => {
    if (token) {
      window.setTimeout(() => removeCookie('return_url', { path: '/' }), 500);
      history.push(return_url);
      if (toast.isActive('loginFailed')) {
        toast.dismiss('loginFailed');
      }
    }
  }, [token, history]); // eslint-disable-line react-hooks/exhaustive-deps

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
