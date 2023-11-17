/**
 * Login container.
 * @module components/Login/Login
 */
import React, { useEffect, useState } from 'react';
import {
  authomaticRedirect,
  listAuthOptions,
  oidcRedirect,
} from '../../actions';
import { injectIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from './LoginForm';

/**
 * Login function.
 * @function Login
 * @returns {JSX.Element} Markup of the Login page.
 */
function Login({ intl }) {
  const dispatch = useDispatch();
  const [startedOAuth, setStartedOAuth] = useState(false);
  const [startedOIDC, setStartedOIDC] = useState(false);
  const loading = useSelector((state) => state.authOptions.loading);
  const options = useSelector((state) => state.authOptions.options);
  const loginOAuthValues = useSelector((state) => state.authomaticRedirect);
  const loginOIDCValues = useSelector((state) => state.oidcRedirect);

  useEffect(() => {
    dispatch(listAuthOptions());
  }, [dispatch]);

  useEffect(() => {
    const next_url = loginOAuthValues.next_url;
    const session = loginOAuthValues.session;
    if (next_url && session && startedOAuth) {
      setStartedOAuth(false);
      // Give time to save state to localstorage
      setTimeout(function () {
        window.location.href = next_url;
      }, 500);
    }
  }, [startedOAuth, loginOAuthValues]);

  const onSelectProvider = (provider) => {
    setStartedOAuth(true);
    dispatch(authomaticRedirect(provider.id));
  };

  useEffect(() => {
    const next_url = loginOIDCValues.next_url;
    if (next_url && startedOIDC) {
      setStartedOIDC(false);
      // Give time to save state to localstorage
      setTimeout(function () {
        window.location.href = next_url;
      }, 500);
    }
  }, [startedOIDC, loginOIDCValues]);

  useEffect(() => {
    if (
      options !== undefined &&
      options.length === 1 &&
      options[0].id === 'oidc'
    ) {

      setStartedOIDC(true);
      dispatch(oidcRedirect('oidc'));
    }
  }, [options, dispatch]);

  return (
    <LoginForm
      loading={loading}
      providers={options}
      action={'login'}
      onSelectProvider={onSelectProvider}
    />
  );
}

export default injectIntl(Login);
