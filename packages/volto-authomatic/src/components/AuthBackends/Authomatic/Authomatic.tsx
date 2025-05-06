/**
 * Authomatic container.
 * @module components/AuthBackends/Authomatic/Authomatic
 */
import React, { useEffect } from 'react';
import { authomaticLogin } from '@plone-collective/volto-authomatic/actions/auth/authomatic';
import { Dimmer, Loader } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import { useIntl } from 'react-intl';
import messages from '@plone-collective/volto-authomatic/messages';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import LoginForm from '@plone-collective/volto-authomatic/components/LoginForm/LoginForm';

interface RootState {
  authomaticRedirect: {
    session: string | null;
  };
  userSession: {
    login: {
      loading: boolean;
      error: any;
    };
    token: string | null;
  };
}

interface RouteParams {
  provider: string;
}

const Authomatic: React.FC = () => {
  const intl = useIntl();
  const query = useLocation().search;
  const { provider } = useParams<RouteParams>();
  const history = useHistory();
  const dispatch = useDispatch();
  const session = useSelector(
    (state: RootState) => state.authomaticRedirect.session,
  );
  const userSession = useSelector((state: RootState) => state.userSession);
  const isLoading = userSession.login.loading;
  const error = userSession.login.error;
  const token = userSession.token;
  const [cookies, , removeCookie] = useCookies(['return_url']);
  const return_url = cookies.return_url || '/';

  useEffect(() => {
    dispatch(authomaticLogin(provider, query, session));
  }, [dispatch, provider, query, session]);

  useEffect(() => {
    if (token) {
      history.push(return_url);
      window.setTimeout(() => removeCookie('return_url', { path: '/' }), 500);
      if (toast.isActive('loginFailed')) {
        toast.dismiss('loginFailed');
      }
    }
  }, [token, history, removeCookie, return_url]);

  useEffect(() => {
    if (error) {
      history.push('/login');
      if (!toast.isActive('loginFailed')) {
        toast.error(
          <Toast
            error
            title={intl.formatMessage(messages.oAuthLoginFailed)}
            content={intl.formatMessage(messages.oAuthLoginFailedContent)}
          />,
          { autoClose: false, toastId: 'loginFailed' },
        );
      }
    }
  }, [error, history, intl]);

  return (
    <LoginForm title={intl.formatMessage(messages.Login)} description="">
      <Dimmer active={isLoading}>
        <Loader size="huge">
          {intl.formatMessage(messages.authenticating)}
        </Loader>
      </Dimmer>
    </LoginForm>
  );
};

export default Authomatic;
