/**
 * OIDC redirect reducer.
 * @module reducers/auth/oidcRedirect
 */

import { OIDC_REDIRECT } from '../../constants/ActionTypes';

const initialState = {
  next_url: null,
  session: null,
  oidcAuth: false,
  loading: false,
  error: null,
};

/**
 * OIDC redirect reducer.
 * @function oidcRedirect
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function oidcRedirect(state = initialState, action = {}) {
  switch (action.type) {
    case `${OIDC_REDIRECT}_PENDING`:
      return {
        ...state,
        loading: true,
        oidcAuth: false,
        next_url: null,
        session: null,
        error: null,
      };
    case `${OIDC_REDIRECT}_SUCCESS`:
      return {
        ...state,
        loading: false,
        oidcAuth: true,
        next_url: action.result.next_url,
        session: action.result.session,
        error: null,
      };
    case `${OIDC_REDIRECT}_FAIL`:
      return {
        ...state,
        loading: false,
        oidcAuth: false,
        next_url: null,
        session: null,
        error: action.error.response.error,
      };
    default:
      return state;
  }
}
