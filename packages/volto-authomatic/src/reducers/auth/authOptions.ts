/**
 * Authentication options reducer.
 * @module reducers/auth/authOptions
 */
import type { AuthProviderOption } from '@plone-collective/volto-authomatic/types';
import { LIST_AUTH_OPTIONS } from '@plone-collective/volto-authomatic/constants/ActionTypes';

interface AuthOptionsState {
  options: AuthProviderOption[];
  loading: boolean;
  error: string | null;
}

interface AuthOptionsAction {
  type: string;
  result?: {
    options: AuthProviderOption[];
  };
  error?: {
    response: {
      error: string;
    };
  };
}

const initialState: AuthOptionsState = {
  options: [],
  loading: false,
  error: null,
};

export default function authOptions(
  state: AuthOptionsState = initialState,
  action: AuthOptionsAction,
): AuthOptionsState {
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
        options: action.result?.options ?? [],
        error: null,
      };
    case `${LIST_AUTH_OPTIONS}_FAIL`:
      return {
        ...state,
        loading: false,
        options: [],
        error: action.error?.response?.error ?? 'Unknown error',
      };
    default:
      return state;
  }
}
