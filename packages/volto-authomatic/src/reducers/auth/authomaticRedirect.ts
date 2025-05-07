/**
 * Authomatic redirect reducer.
 * @module reducers/auth/authomaticRedirect
 */

import { AUTHOMATIC_REDIRECT } from '@plone-collective/volto-authomatic/constants/ActionTypes';

interface AuthomaticRedirectState {
  next_url: string | null;
  session: string | null;
  loading: boolean;
  error: string | null;
}

// Generalized action interface
interface AuthomaticRedirectAction {
  type: string;
  result?: {
    next_url: string;
    session: string;
  };
  error?: {
    response: {
      error: string;
    };
  };
}

const initialState: AuthomaticRedirectState = {
  next_url: null,
  session: null,
  loading: false,
  error: null,
};

export default function authomaticRedirect(
  state: AuthomaticRedirectState = initialState,
  action: AuthomaticRedirectAction,
): AuthomaticRedirectState {
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
        next_url: action.result?.next_url ?? null,
        session: action.result?.session ?? null,
        error: null,
      };
    case `${AUTHOMATIC_REDIRECT}_FAIL`:
      return {
        ...state,
        loading: false,
        next_url: null,
        session: null,
        error: action.error?.response?.error ?? 'Unknown error',
      };
    default:
      return state;
  }
}
