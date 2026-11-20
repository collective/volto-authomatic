/**
 * Consent route container.
 * @module components/Consent/Consent
 */
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import config from '@plone/volto/registry';
import { getSite } from '@plone/volto/actions/site/site';
import { getUser } from '@plone/volto/actions/users/users';
import { isLoopbackHandoff } from '@plone-collective/volto-authomatic/helpers/returnUrl';

import ConsentPage from './ConsentPage';

interface RootState {
  userSession: {
    token: string | null;
  };
  users: {
    user: {
      id?: string;
      fullname?: string;
    };
  };
  site: {
    data: {
      title?: string;
    };
  };
}

/**
 * Read the ``sub`` claim of a token, without verifying it.
 * The token is only used to ask the server for the user's name.
 * @function tokenSubject
 * @param token - JSON Web Token issued by the site.
 * @returns The subject, or null when it cannot be read.
 */
function tokenSubject(token: string | null): string | null {
  if (!token) {
    return null;
  }
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const claims = JSON.parse(atob(payload));
    return typeof claims.sub === 'string' ? claims.sub : null;
  } catch {
    return null;
  }
}

/**
 * Consent route. Shows the consent page after a loopback login, and
 * returns to the site when there is no pending loopback handoff.
 * @function Consent
 * @returns The consent page, or nothing while redirecting.
 */
const Consent: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [cookies, , removeCookie] = useCookies(['return_url', 'login_state']);

  const token = useSelector((state: RootState) => state.userSession.token);
  const user = useSelector((state: RootState) => state.users?.user);
  const siteTitle = useSelector((state: RootState) => state.site?.data?.title);

  const returnUrl = cookies.return_url;
  const state = cookies.login_state;
  const ready = Boolean(token) && isLoopbackHandoff(returnUrl, state);
  const subject = tokenSubject(token);

  const clearCookies = useCallback(() => {
    removeCookie('return_url', { path: '/' });
    removeCookie('login_state', { path: '/' });
  }, [removeCookie]);

  useEffect(() => {
    dispatch(getSite());
  }, [dispatch]);

  useEffect(() => {
    if (subject) {
      dispatch(getUser(subject));
    }
  }, [dispatch, subject]);

  useEffect(() => {
    if (!ready) {
      clearCookies();
      history.replace('/');
    }
  }, [ready, history, clearCookies]);

  if (!ready || !token) {
    return null;
  }

  const userName = user?.fullname || user?.id || subject || '';
  const site = siteTitle || config.settings.publicURL;

  return (
    <ConsentPage
      userName={userName}
      siteTitle={site}
      returnUrl={returnUrl}
      state={state}
      token={token}
      onAllow={clearCookies}
      onDeny={() => {
        clearCookies();
        history.push('/');
      }}
    />
  );
};

export default Consent;
