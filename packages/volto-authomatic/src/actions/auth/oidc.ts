/**
 * OIDC Login
 * @module actions/auth/oidc
 */
import {
  LOGIN,
  LOGOUT_OIDC,
  OIDC_REDIRECT,
} from '@plone-collective/volto-authomatic/constants/ActionTypes';

interface OidcRedirectAction {
  type: typeof OIDC_REDIRECT;
  request: {
    op: 'get';
    path: string;
  };
}

interface OidcLogoutAction {
  type: typeof LOGOUT_OIDC;
  request: {
    op: 'get';
    path: string;
  };
}

interface OidcLoginAction {
  type: typeof LOGIN;
  request: {
    op: 'post';
    path: string;
    data: {
      qs: string;
      session: string;
    };
  };
}

/**
 * Get information to redirect user to provider authentication page
 * @function oidcRedirect
 * @param providerId - OAuth provider id.
 * @returns OIDC redirect action.
 */
export function oidcRedirect(providerId: string): OidcRedirectAction {
  return {
    type: OIDC_REDIRECT,
    request: {
      op: 'get',
      path: `@login-oidc/${providerId}`,
    },
  };
}

/**
 * Logout from OIDC provider
 * @function oidcLogout
 * @returns OIDC logout action.
 */
export function oidcLogout(): OidcLogoutAction {
  return {
    type: LOGOUT_OIDC,
    request: {
      op: 'get',
      path: '@logout-oidc',
    },
  };
}

/**
 * OIDC Login function.
 * @function oidcLogin
 * @param providerId - OAuth provider id.
 * @param query - URL parameters passed by OAuth provider.
 * @param session - OIDC session id.
 * @returns OIDC login action.
 */
export function oidcLogin(
  providerId: string,
  query: string,
  session: string,
): OidcLoginAction {
  return {
    type: LOGIN,
    request: {
      op: 'post',
      path: `@login-oidc/${providerId}`,
      data: {
        qs: query,
        session: session,
      },
    },
  };
}
