/**
 * OIDC redirect reducer.
 * @module reducers/auth/oidcRedirect
 */

import { OIDC_REDIRECT } from '@plone-collective/volto-authomatic/constants/ActionTypes';

interface OidcRedirectState {
  next_url: string | null;
  session: string | null;
  oidcAuth: boolean;
  loading: boolean;
  error: string | null;
}

interface OidcRedirectAction {
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

const initialState: OidcRedirectState = {
  next_url: null,
  session: null,
  oidcAuth: false,
  loading: false,
  error: null,
};

export default function oidcRedirect(
  state: OidcRedirectState = initialState,
  action: OidcRedirectAction,
): OidcRedirectState {
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
        next_url: action.result?.next_url ?? null,
        session: action.result?.session ?? null,
        error: null,
      };
    case `${OIDC_REDIRECT}_FAIL`:
      return {
        ...state,
        loading: false,
        oidcAuth: false,
        next_url: null,
        session: null,
        error: action.error?.response?.error ?? 'Unknown error',
      };
    default:
      return state;
  }
}
