/**
 * OIDC redirect reducer.
 * @module reducers/auth/oidcRedirect
 */

import { LOGOUT_OIDC } from '../../constants/ActionTypes';

const initialState = {
  next_url: null,
  session: null,
  loading: false,
  error: null,
};

/**
 * OIDC Logout reducer.
 * @function oidcLogout
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function oidcLogout(state = initialState, action = {}) {
  switch (action.type) {
    case `${LOGOUT_OIDC}_PENDING`:
      return {
        ...state,
        loading: true,
        next_url: null,
        came_from: null,
        error: null,
      };
    case `${LOGOUT_OIDC}_SUCCESS`:
      return {
        ...state,
        loading: false,
        next_url: action.result.next_url,
        came_from: action.result.came_from,
        error: null,
      };
    case `${LOGOUT_OIDC}_FAIL`:
      return {
        ...state,
        loading: false,
        next_url: null,
        came_from: null,
        error: action.error.response.error,
      };
    default:
      return state;
  }
}
