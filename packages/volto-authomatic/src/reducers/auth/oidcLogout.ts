/**
 * OIDC logout reducer.
 * @module reducers/auth/oidcLogout
 */

import { LOGOUT_OIDC } from '@plone-collective/volto-authomatic/constants/ActionTypes';

interface OidcLogoutState {
  next_url: string | null;
  came_from?: string | null;
  session: string | null;
  loading: boolean;
  error: string | null;
}

interface OidcLogoutAction {
  type: string;
  result?: {
    next_url: string;
    came_from?: string;
  };
  error?: {
    response: {
      error: string;
    };
  };
}

const initialState: OidcLogoutState = {
  next_url: null,
  came_from: null,
  session: null,
  loading: false,
  error: null,
};

export default function oidcLogout(
  state: OidcLogoutState = initialState,
  action: OidcLogoutAction,
): OidcLogoutState {
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
        next_url: action.result?.next_url ?? null,
        came_from: action.result?.came_from ?? null,
        error: null,
      };
    case `${LOGOUT_OIDC}_FAIL`:
      return {
        ...state,
        loading: false,
        next_url: null,
        came_from: null,
        error: action.error?.response?.error ?? 'Unknown error',
      };
    default:
      return state;
  }
}
