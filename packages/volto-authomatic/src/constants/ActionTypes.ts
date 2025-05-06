export const LIST_AUTH_OPTIONS = 'LIST_AUTH_OPTIONS' as const;
export const AUTHOMATIC_REDIRECT = 'AUTHOMATIC_LOGIN_START' as const;
export const OIDC_REDIRECT = 'OIDC_LOGIN_START' as const;
export const LOGIN = 'LOGIN' as const;
export const LOGOUT_OIDC = 'LOGOUT_OIDC' as const;

export type AuthActionType =
  | typeof LIST_AUTH_OPTIONS
  | typeof AUTHOMATIC_REDIRECT
  | typeof OIDC_REDIRECT
  | typeof LOGIN
  | typeof LOGOUT_OIDC;
