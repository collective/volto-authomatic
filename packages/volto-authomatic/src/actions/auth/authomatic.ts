/**
 * Automatic Login
 * @module actions/auth/authomatic
 */
import config from '@plone/volto/registry';
import {
  AUTHOMATIC_REDIRECT,
  LOGIN,
} from '@plone-collective/volto-authomatic/constants/ActionTypes';

interface AuthomaticRedirectAction {
  type: typeof AUTHOMATIC_REDIRECT;
  request: {
    op: 'get';
    path: string;
  };
}

interface AuthomaticLoginAction {
  type: typeof LOGIN;
  request: {
    op: 'post';
    path: string;
    data: {
      qs: string;
      session: string;
      publicUrl: string;
    };
  };
}

/**
 * Get information to redirect user to provider authentication page
 * @function authomaticRedirect
 * @param providerId - OAuth provider id.
 * @returns Authomatic redirect action.
 */
export function authomaticRedirect(
  providerId: string,
): AuthomaticRedirectAction {
  const publicUrl = config.settings.publicURL;
  return {
    type: AUTHOMATIC_REDIRECT,
    request: {
      op: 'get',
      path: `@login-authomatic/${providerId}?publicUrl=${publicUrl}`,
    },
  };
}

/**
 * Authomatic Login function.
 * @function authomaticLogin
 * @param providerId - OAuth provider id.
 * @param query - URL parameters passed by OAuth provider.
 * @param session - Authomatic session id.
 * @returns Authomatic login action.
 */
export function authomaticLogin(
  providerId: string,
  query: string,
  session: string,
): AuthomaticLoginAction {
  const publicUrl = config.settings.publicURL;
  return {
    type: LOGIN,
    request: {
      op: 'post',
      path: `@login-authomatic/${providerId}`,
      data: {
        qs: query,
        session: session,
        publicUrl: publicUrl,
      },
    },
  };
}
