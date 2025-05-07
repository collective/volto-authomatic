/**
 * Login container.
 * @module components/Login/PloneAuth
 */
import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import qs from 'query-string';

import { usePrevious } from '@plone/volto/helpers/Utils/usePrevious';
import {
  login,
  logout,
  resetLoginRequest,
} from '@plone/volto/actions/userSession/userSession';
import { purgeMessages } from '@plone/volto/actions/messages/messages';
import { toast } from 'react-toastify';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import messages from '@plone-collective/volto-authomatic/messages';
import PloneForm from './PloneForm';

interface LocationState {
  isLogout?: boolean;
}

interface LoginProps {
  location?: {
    search?: string;
    pathname: string;
    state?: LocationState;
  };
}

const PloneAuth: React.FC<LoginProps> = (props) => {
  const intl = useIntl();
  const history = useHistory();
  const location = useLocation<LocationState>();
  const dispatch = useDispatch();

  const token = useSelector(
    (state: any) => state.userSession.token,
    shallowEqual,
  );
  const error = useSelector((state: any) => state.userSession.login.error);
  const loading = useSelector((state: any) => state.userSession.login.loading);

  const returnUrl =
    qs.parse(props.location?.search ?? location.search).return_url ||
    location.pathname.replace(/\/[^/]*\/?$/, '') ||
    '/';

  const previousToken = usePrevious(token);

  useEffect(() => {
    if (location?.state?.isLogout) {
      dispatch(logout());
      dispatch(purgeMessages());
      history.push(`${location.pathname}${location.search}`);
    } else if (token && token !== previousToken) {
      history.push(returnUrl || '/');
      if (toast.isActive('loggedOut')) toast.dismiss('loggedOut');
      if (toast.isActive('loginFailed')) toast.dismiss('loginFailed');
    }

    if (error) {
      if (toast.isActive('loggedOut')) toast.dismiss('loggedOut');
      if (!toast.isActive('loginFailed')) {
        toast.error(
          <Toast
            error
            title={intl.formatMessage(messages.loginFailed)}
            content={intl.formatMessage(messages.loginFailedContent)}
          />,
          { autoClose: false, toastId: 'loginFailed' },
        );
      }
    }

    return () => {
      if (toast.isActive('loginFailed')) {
        toast.dismiss('loginFailed');
        dispatch(resetLoginRequest());
      }
    };
  }, [
    dispatch,
    token,
    error,
    intl,
    history,
    returnUrl,
    location.search,
    location.pathname,
    location?.state?.isLogout,
    previousToken,
  ]);

  const onLogin = (username: string, password: string) => {
    dispatch(login(username, password));
  };

  return <PloneForm onLogin={onLogin} loading={loading} error={error} />;
};

export default PloneAuth;
