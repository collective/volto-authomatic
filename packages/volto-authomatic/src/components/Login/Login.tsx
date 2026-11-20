/**
 * Login container.
 * @module components/Login/Login
 */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import qs from 'query-string';

import config from '@plone/volto/registry';

import { authomaticRedirect } from '@plone-collective/volto-authomatic/actions/auth/authomatic';
import { listAuthOptions } from '@plone-collective/volto-authomatic/actions/auth/authOptions';
import { oidcRedirect } from '@plone-collective/volto-authomatic/actions/auth/oidc';
import type { AuthProviderOption } from '@plone-collective/volto-authomatic/types';
import {
  classifyReturnUrl,
  safeReturnUrl,
} from '@plone-collective/volto-authomatic/helpers/returnUrl';

import Form from './Form';

interface RootState {
  authOptions: {
    loading: boolean;
    options: AuthProviderOption[];
  };
  authomaticRedirect: {
    next_url: string | null;
    session: string | null;
  };
  oidcRedirect: {
    next_url: string | null;
  };
}

/**
 * Get the return URL and the state for the login about to start.
 *
 * A loopback return_url is only kept together with a state. Without one
 * it is refused, and the user goes to the site root.
 * @function getLoginTarget
 * @param  location Location object.
 * @returns Return URL, and the state to send back with it (or null).
 */
function getLoginTarget(location: Location): {
  returnUrl: string;
  state: string | null;
} {
  const parsed = qs.parse(location.search);
  const requested = parsed.return_url;
  if (!requested) {
    return {
      returnUrl:
        location.pathname === '/login'
          ? '/'
          : location.pathname.replace('/login', ''),
      state: null,
    };
  }
  if (classifyReturnUrl(requested) === 'loopback') {
    const state = typeof parsed.state === 'string' ? parsed.state : null;
    if (!state) {
      return { returnUrl: '/', state: null };
    }
    return { returnUrl: safeReturnUrl(requested), state };
  }
  return {
    returnUrl: safeReturnUrl(requested, { allowLoopback: false }),
    state: null,
  };
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [, setCookie, removeCookie] = useCookies(['return_url', 'login_state']);

  const storeLoginTarget = useCallback(() => {
    const { returnUrl, state } = getLoginTarget(location);
    setCookie('return_url', returnUrl, { path: '/' });
    if (state) {
      setCookie('login_state', state, { path: '/' });
    } else {
      removeCookie('login_state', { path: '/' });
    }
  }, [location, setCookie, removeCookie]);

  const [startedOAuth, setStartedOAuth] = useState(false);
  const [startedOIDC, setStartedOIDC] = useState(false);
  const [plugin, setPlugin] = useState('');

  const loading = useSelector((state: RootState) => state.authOptions.loading);
  const providers = useSelector(
    (state: RootState) => state.authOptions.options,
  );
  const loginOAuthValues = useSelector(
    (state: RootState) => state.authomaticRedirect,
  );
  const OIDCValues = useSelector((state: RootState) => state.oidcRedirect);

  const displayPlone = config.settings.showPloneLogin;

  useEffect(() => {
    dispatch(listAuthOptions());
  }, [dispatch]);

  useEffect(() => {
    const { next_url, session } = loginOAuthValues;
    if (next_url && session && startedOAuth) {
      setStartedOAuth(false);
      setTimeout(() => {
        window.location.href = next_url;
      }, 500);
    }
  }, [startedOAuth, loginOAuthValues]);

  useEffect(() => {
    const { next_url } = OIDCValues;
    if (next_url && startedOIDC) {
      setStartedOIDC(false);
      setTimeout(() => {
        window.location.href = next_url;
      }, 500);
    }
  }, [startedOIDC, OIDCValues]);

  useEffect(() => {
    if (
      providers !== undefined &&
      providers.length === 1 &&
      providers[0].plugin === 'oidc' &&
      !displayPlone
    ) {
      storeLoginTarget();
      setPlugin(providers[0].plugin);
      setStartedOIDC(true);
      dispatch(oidcRedirect(providers[0].id));
    }
  }, [displayPlone, providers, dispatch, storeLoginTarget]);

  const onSelectProvider = (selectedProvider: AuthProviderOption) => {
    storeLoginTarget();
    setPlugin(selectedProvider.plugin);
    if (selectedProvider.plugin === 'oidc') {
      setStartedOIDC(true);
      dispatch(oidcRedirect(selectedProvider.id));
    } else if (selectedProvider.plugin === 'PlonePAS') {
      setStartedOIDC(false);
      setStartedOAuth(false);
    } else {
      setStartedOAuth(true);
      dispatch(authomaticRedirect(selectedProvider.id));
    }
  };

  return (
    <Form
      loading={loading}
      providers={providers}
      action="login"
      displayPlone={displayPlone}
      plugin={plugin}
      onSelectProvider={onSelectProvider}
      location={location}
    />
  );
};

export default Login;
