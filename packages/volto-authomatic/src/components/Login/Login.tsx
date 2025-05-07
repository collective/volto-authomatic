/**
 * Login container.
 * @module components/Login/Login
 */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import qs from 'query-string';

import config from '@plone/volto/registry';

import { authomaticRedirect } from '@plone-collective/volto-authomatic/actions/auth/authomatic';
import { listAuthOptions } from '@plone-collective/volto-authomatic/actions/auth/authOptions';
import { oidcRedirect } from '@plone-collective/volto-authomatic/actions/auth/oidc';
import type { AuthProviderOption } from '@plone-collective/volto-authomatic/types';

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
 * Get return URL.
 * @function getReturnUrl
 * @param  location Location object.
 * @returns Return URL as string.
 */
function getReturnUrl(location: Location): string {
  const parsed = qs.parse(location.search);
  return (
    (parsed.return_url as string) ||
    (location.pathname === '/login'
      ? '/'
      : location.pathname.replace('/login', ''))
  );
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [, setCookie] = useCookies(['return_url']);

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
      providers[0].id === 'oidc' &&
      !displayPlone
    ) {
      setPlugin(providers[0].plugin);
      setStartedOIDC(true);
      dispatch(oidcRedirect('oidc'));
    }
  }, [displayPlone, providers, dispatch]);

  const onSelectProvider = (selectedProvider: AuthProviderOption) => {
    setCookie('return_url', getReturnUrl(location), { path: '/' });
    setPlugin(selectedProvider.plugin);
    if (plugin === 'oidc') {
      setStartedOIDC(true);
      dispatch(oidcRedirect(selectedProvider.id));
    } else if (plugin === 'PlonePAS') {
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
