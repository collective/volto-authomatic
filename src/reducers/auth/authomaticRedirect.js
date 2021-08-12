/**
 * Authomatic redirect reducer.
 * @module reducers/authomaticRedirect/authomaticRedirect
 */

import { AUTHOMATIC_REDIRECT } from '../../constants/ActionTypes';

const initialState = {
  next_url: null,
  session: null,
  loading: false,
  error: null,
};

/**
 * Authomatic redirect reducer.
 * @function authomaticRedirect
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function authomaticRedirect(state = initialState, action = {}) {
  switch (action.type) {
    case `${AUTHOMATIC_REDIRECT}_PENDING`:
      return {
        ...state,
        loading: true,
        next_url: null,
        session: null,
        error: null,
      };
    case `${AUTHOMATIC_REDIRECT}_SUCCESS`:
      return {
        ...state,
        loading: false,
        next_url: action.result.next_url,
        session: action.result.session,
        error: null,
      };
    case `${AUTHOMATIC_REDIRECT}_FAIL`:
      return {
        ...state,
        loading: false,
        next_url: null,
        session: null,
        error: action.error.response.error,
      };
    default:
      return state;
  }
}
