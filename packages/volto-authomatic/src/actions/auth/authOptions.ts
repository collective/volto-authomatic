/**
 * Authentication options
 * @module actions/auth/listAuthOptions
 */

import { LIST_AUTH_OPTIONS } from '@plone-collective/volto-authomatic/constants/ActionTypes';

interface ListAuthOptionsAction {
  type: typeof LIST_AUTH_OPTIONS;
  request: {
    op: 'get';
    path: string;
  };
}

/**
 * List Authentication Options function.
 * @function listAuthOptions
 * @returns Login options action.
 */
export function listAuthOptions(): ListAuthOptionsAction {
  return {
    type: LIST_AUTH_OPTIONS,
    request: {
      op: 'get',
      path: '@login',
    },
  };
}
