/**
 * Authomatic Login
 * @module actions/auth/authomatic
 */
import config from '@plone/volto/registry';
import { AUTHOMATIC_REDIRECT, LOGIN } from '../../constants/ActionTypes';

/**
 * Get information to redicect user to provider authentication page
 * @function authomaticRedirect
 * @param {string} providerId OAuth provider id.
 * @returns {Object} Authomatic redirect action.
 */
export function authomaticRedirect(providerId) {
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
 * @param {string} providerId OAuth provider id.
 * @param {string} query URL parameters passed by OAuth provider.
 * @param {string} session Authomatic session id.
 * @returns {Object} Authomatic login action.
 */
export function authomaticLogin(providerId, query, session) {
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
