/**
 * Authentication options
 * @module actions/auth/listAuthOptions
 */

import { LIST_AUTH_OPTIONS } from '../../constants/ActionTypes';

/**
 * List Authentication Options function.
 * @function listAuthOptions
 * @returns {Object} Login options action.
 */
export function listAuthOptions() {
  return {
    type: LIST_AUTH_OPTIONS,
    request: {
      op: 'get',
      path: '@login',
    },
  };
}
