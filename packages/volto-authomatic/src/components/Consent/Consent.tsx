/**
 * Consent route container.
 * @module components/Consent/Consent
 */
import React, { useCallback, useEffect, useRef } from 'react';
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

interface Handoff {
  returnUrl: string;
  state: string;
  token: string;
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
 *
 * The handoff is kept from the first render where it is ready. Allow
 * clears the handoff cookies while the browser submits the form, so the
 * page must keep rendering the form and must not redirect afterwards.
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

  // The handoff as it was when first ready. Clearing the cookies on Allow
  // must not change what the form posts, nor unmount it mid-submit.
  const handoff = useRef<Handoff | null>(null);
  if (ready && token && !handoff.current) {
    handoff.current = { returnUrl, state, token };
  }
  const allowed = useRef(false);

  const clearCookies = useCallback(() => {
    removeCookie('return_url', { path: '/' });
    removeCookie('login_state', { path: '/' });
  }, [removeCookie]);

  const onAllow = useCallback(() => {
    allowed.current = true;
    clearCookies();
  }, [clearCookies]);

  useEffect(() => {
    dispatch(getSite());
  }, [dispatch]);

  useEffect(() => {
    if (subject) {
      dispatch(getUser(subject));
    }
  }, [dispatch, subject]);

  useEffect(() => {
    // After Allow the browser is posting the form to the loopback URL;
    // navigating here would cancel it.
    if (!ready && !allowed.current) {
      clearCookies();
      history.replace('/');
    }
  }, [ready, history, clearCookies]);

  if (!handoff.current) {
    return null;
  }

  const userName = user?.fullname || user?.id || subject || '';
  const site = siteTitle || config.settings.publicURL;

  return (
    <ConsentPage
      userName={userName}
      siteTitle={site}
      returnUrl={handoff.current.returnUrl}
      state={handoff.current.state}
      token={handoff.current.token}
      onAllow={onAllow}
      onDeny={() => {
        clearCookies();
        history.push('/');
      }}
    />
  );
};

export default Consent;
