/**
 * Authentication options reducer.
 * @module reducers/auth/authOptions
 */

import { LIST_AUTH_OPTIONS } from '../../constants/ActionTypes';

const initialState = {
  options: [],
  loading: false,
  error: null,
};

/**
 * Authentication options reducer.
 * @function authOptions
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function authOptions(state = initialState, action = {}) {
  switch (action.type) {
    case `${LIST_AUTH_OPTIONS}_PENDING`:
      return {
        ...state,
        loading: true,
        options: [],
        error: null,
      };
    case `${LIST_AUTH_OPTIONS}_SUCCESS`:
      return {
        ...state,
        loading: false,
        options: action.result.options,
        error: null,
      };
    case `${LIST_AUTH_OPTIONS}_FAIL`:
      return {
        ...state,
        loading: false,
        options: [],
        error: action.error.response.error,
      };
    default:
      return state;
  }
}
