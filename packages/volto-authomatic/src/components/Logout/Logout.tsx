/**
 * Logout container.
 * @module components/Logout/Logout
 */

import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import { toast } from 'react-toastify';
import { defineMessages, useIntl } from 'react-intl';

import { logout } from '@plone/volto/actions/userSession/userSession';
import { purgeMessages } from '@plone/volto/actions/messages/messages';
import { oidcLogout } from '@plone-collective/volto-authomatic/actions/auth/oidc';
import { listActions } from '@plone/volto/actions/actions/actions';
import config from '@plone/volto/registry';

import LogoutPage from './LogoutPage';

interface RootState {
  oidcRedirect: {
    next_url: string | null;
  };
  oidcLogout: {
    next_url: string | null;
  };
}

const messages = defineMessages({
  loggedOut: {
    id: 'Logged out',
    defaultMessage: 'Logged out',
  },
  loggedOutContent: {
    id: 'You have been logged out from the site.',
    defaultMessage: 'You have been logged out from the site.',
  },
});

const Logout: React.FC = () => {
  const displayLogout = config.settings.displayLogout;
  const token = useSelector((state) => state.userSession.token, shallowEqual);
  const history = useHistory();
  const location = useLocation();
  const intl = useIntl();

  const dispatch = useDispatch();
  const OIDCValues = useSelector((state: RootState) => state.oidcRedirect);
  const logoutOIDCValues = useSelector((state: RootState) => state.oidcLogout);
  const logoutSuccess = useSelector((state: any) => state.userSession.token);
  const next_url = logoutOIDCValues.next_url;

  const returnUrl = useMemo(
    () =>
      qs.parse(location.search).return_url ||
      location.pathname
        .replace(/\/login\/?$/, '')
        .replace(/\/logout\/?$/, '') ||
      '/',
    [location.pathname, location.search],
  );
  useEffect(() => {
    if (!token && !displayLogout && !next_url) {
      history.replace(returnUrl || '/');
      if (!toast.isActive('loggedOut')) {
        toast.info(
          <Toast
            info
            title={intl.formatMessage(messages.loggedOut)}
            content={intl.formatMessage(messages.loggedOutContent)}
          />,
          { autoClose: false, toastId: 'loggedOut' },
        );
      }
    }
  }, [history, returnUrl, intl, token, next_url, displayLogout]);

  useEffect(() => {
    const isOIDC = OIDCValues.next_url;
    if (isOIDC) {
      dispatch(oidcLogout());
    }
    dispatch(logout());
    dispatch(purgeMessages());
  }, [dispatch, OIDCValues]);

  useEffect(() => {
    if (displayLogout && logoutSuccess === null) {
      dispatch(listActions('/'));
    }
  }, [displayLogout, dispatch, logoutSuccess]);

  useEffect(() => {
    if (next_url) {
      setTimeout(() => {
        window.location.href = next_url;
      }, 500);
    }
  }, [logoutOIDCValues, next_url]);

  return displayLogout ? <LogoutPage /> : null;
};

export default Logout;
