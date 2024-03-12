/**
 * OIDC Login
 * @module actions/auth/oidc
 */
import config from '@plone/volto/registry';
import { LOGIN, LOGOUT_OIDC, OIDC_REDIRECT } from '../../constants/ActionTypes';

/**
 * Get information to redirect user to provider authentication page
 * @function oidcRedirect
 * @param {string} providerId OAuth provider id.
 * @returns {Object} OIDC redirect action.
 */
export function oidcRedirect(providerId) {
  const publicUrl = config.settings.publicURL;

  return {
    type: OIDC_REDIRECT,
    request: {
      op: 'get',
      path: `@login-oidc/${providerId}?publicUrl=${publicUrl}`,
    },
  };
}

/**
 * Logout from OIDC provider
 * @function oidcLogout
 * @returns {Object} OIDC redirect action.
 */
export function oidcLogout() {
  return {
    type: LOGOUT_OIDC,
    request: {
      op: 'get',
      path: `@logout-oidc`,
    },
  };
}

/**
 * OIDC Login function.
 * @function oidcLogin
 * @param {string} providerId OAuth provider id.
 * @param {string} query URL parameters passed by OAuth provider.
 * @param {string} session OIDC session id.
 * @returns {Object} OIDC login action.
 */
export function oidcLogin(providerId, query, session) {
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
