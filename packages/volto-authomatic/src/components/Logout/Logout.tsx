/**
 * Logout container.
 * @module components/Logout/Logout
 */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '@plone/volto/actions/userSession/userSession';
import { purgeMessages } from '@plone/volto/actions/messages/messages';
import { oidcLogout } from '@plone-collective/volto-authomatic/actions/auth/oidc';

import LogoutPage from './LogoutPage';

interface RootState {
  oidcRedirect: {
    next_url: string | null;
  };
  oidcLogout: {
    next_url: string | null;
  };
}

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const [displayLogout, setDisplayLogout] = useState(false);

  const OIDCValues = useSelector((state: RootState) => state.oidcRedirect);
  const logoutOIDCValues = useSelector((state: RootState) => state.oidcLogout);

  useEffect(() => {
    const isOIDC = OIDCValues.next_url;
    if (isOIDC) {
      dispatch(oidcLogout());
    } else {
      setDisplayLogout(true);
    }
    dispatch(logout());
    dispatch(purgeMessages());
  }, [dispatch, OIDCValues]);

  useEffect(() => {
    const next_url = logoutOIDCValues.next_url;
    if (next_url) {
      setTimeout(() => {
        window.location.href = next_url;
      }, 500);
    }
  }, [logoutOIDCValues]);

  return displayLogout ? <LogoutPage /> : null;
};

export default Logout;
