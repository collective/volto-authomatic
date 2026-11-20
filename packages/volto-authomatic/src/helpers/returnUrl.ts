/**
 * Classification of the ``return_url`` sent to the login page.
 * @module helpers/returnUrl
 */

/** Route that asks the user to allow a loopback handoff. */
export const CONSENT_PATH = '/login-consent';

/** Hostnames accepted for a loopback ``return_url``, as ``URL.hostname`` reports them. */
const LOOPBACK_HOSTS = ['127.0.0.1', '[::1]', 'localhost'];

/** Matches a URL scheme such as ``http:`` or ``javascript:``. */
const SCHEME = /^[a-z][a-z0-9+.-]*:/i;

/** Base used to resolve relative values, so that origins can be compared. */
const BASE = 'http://return-url.invalid';

export type ReturnUrlKind = 'relative' | 'loopback' | 'rejected';

/**
 * Classify a ``return_url``.
 *
 * A loopback URL is ``http`` on exactly ``127.0.0.1``, ``[::1]`` or
 * ``localhost``, with an explicit port, no credentials, and any path.
 *
 * :param value: The raw ``return_url`` value.
 * :returns: ``relative``, ``loopback`` or ``rejected``.
 */
export function classifyReturnUrl(value: unknown): ReturnUrlKind {
  if (typeof value !== 'string' || value === '') {
    return 'rejected';
  }

  if (!SCHEME.test(value)) {
    try {
      const resolved = new URL(value, BASE);
      return resolved.origin === new URL(BASE).origin ? 'relative' : 'rejected';
    } catch {
      return 'rejected';
    }
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return 'rejected';
  }

  if (
    url.protocol === 'http:' &&
    LOOPBACK_HOSTS.includes(url.hostname) &&
    url.port !== '' &&
    url.username === '' &&
    url.password === ''
  ) {
    return 'loopback';
  }
  return 'rejected';
}

/**
 * Return the ``return_url`` that may be followed after login.
 *
 * Relative paths are returned unchanged. A loopback URL is returned
 * normalized, but only when ``allowLoopback`` is true. Anything else
 * falls back to ``/``.
 *
 * :param value: The raw ``return_url`` value.
 * :param allowLoopback: Whether a loopback URL may be returned.
 * :returns: A relative path or a loopback URL.
 */
export function safeReturnUrl(
  value: unknown,
  { allowLoopback = true }: { allowLoopback?: boolean } = {},
): string {
  switch (classifyReturnUrl(value)) {
    case 'relative':
      return value as string;
    case 'loopback':
      return allowLoopback ? new URL(value as string).href : '/';
    default:
      return '/';
  }
}

/**
 * Tell whether a login hands its token to a loopback listener.
 *
 * A loopback ``return_url`` is only honoured together with a ``state``.
 *
 * :param returnUrl: The raw ``return_url`` value.
 * :param state: The ``state`` value sent with the login.
 * :returns: True when the login must show the consent page.
 */
export function isLoopbackHandoff(returnUrl: unknown, state: unknown): boolean {
  return (
    classifyReturnUrl(returnUrl) === 'loopback' &&
    typeof state === 'string' &&
    state !== ''
  );
}
