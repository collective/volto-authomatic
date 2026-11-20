/**
 * OIDC container.
 * @module components/AuthBackends/OIDC/OIDC
 */
import React, { useEffect } from 'react';
import { oidcLogin } from '@plone-collective/volto-authomatic/actions/auth/oidc';
import { toast } from 'react-toastify';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import { useIntl } from 'react-intl';
import messages from '@plone-collective/volto-authomatic/messages';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import Loading from '@plone-collective/volto-authomatic/components/Loading/Loading';
import LoginForm from '@plone-collective/volto-authomatic/components/LoginForm/LoginForm';
import {
  CONSENT_PATH,
  isLoopbackHandoff,
} from '@plone-collective/volto-authomatic/helpers/returnUrl';

interface RootState {
  oidcRedirect: {
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

const OIDC: React.FC = () => {
  const intl = useIntl();
  const query = useLocation().search;
  const { provider } = useParams<RouteParams>();
  const history = useHistory();
  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.oidcRedirect.session);
  const userSession = useSelector((state: RootState) => state.userSession);
  const isLoading = userSession.login.loading;
  const error = userSession.login.error;
  const token = userSession.token;
  const [cookies, , removeCookie] = useCookies(['return_url', 'login_state']);
  const consent = isLoopbackHandoff(cookies.return_url, cookies.login_state);

  useEffect(() => {
    dispatch(oidcLogin(provider, query, session));
  }, [dispatch, provider, query, session]);

  useEffect(() => {
    if (token) {
      if (toast.isActive('loginFailed')) {
        toast.dismiss('loginFailed');
      }
      if (consent) {
        history.push(CONSENT_PATH);
        return;
      }
      // OIDC has always returned to the site root; a relative
      // return_url is not followed here.
      removeCookie('return_url', { path: '/' });
      removeCookie('login_state', { path: '/' });
      history.push('/');
    }
  }, [token, history, removeCookie, consent]);

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
      <Loading loading={isLoading} />
    </LoginForm>
  );
};

export default OIDC;
