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
import Loading from '@plone-collective/volto-authomatic/components/Loading/Loading';
import LoginForm from '@plone-collective/volto-authomatic/components/LoginForm/LoginForm';

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

  useEffect(() => {
    dispatch(oidcLogin(provider, query, session));
  }, [dispatch, provider, query, session]);

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
