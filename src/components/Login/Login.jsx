/**
 * Login container.
 * @module components/Login/Login
 */
import React, { useEffect, useState } from 'react';
import { authomaticRedirect, listAuthOptions } from '../../actions';
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
  const loading = useSelector((state) => state.authOptions.loading);
  const options = useSelector((state) => state.authOptions.options);
  const loginValues = useSelector((state) => state.authomaticRedirect);

  useEffect(() => {
    dispatch(listAuthOptions());
  }, [dispatch]);

  useEffect(() => {
    const next_url = loginValues.next_url;
    const session = loginValues.session;
    if (next_url && session && startedOAuth) {
      setStartedOAuth(false);
      // Give time to save state to localstorage
      setTimeout(function () {
        window.location.href = next_url;
      }, 500);
    }
  }, [startedOAuth, loginValues]);

  const onSelectProvider = (provider) => {
    setStartedOAuth(true);
    dispatch(authomaticRedirect(provider.id));
  };

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
