import { describe, expect, it } from 'vitest';

import {
  classifyReturnUrl,
  isLoopbackHandoff,
  safeReturnUrl,
} from './returnUrl';

describe('classifyReturnUrl', () => {
  it.each(['/', '/foo-bar', '/foo/bar?x=1&y=2#top', 'relative/path'])(
    'classifies the relative path %s as relative',
    (value) => {
      expect(classifyReturnUrl(value)).toBe('relative');
    },
  );

  it.each([
    'http://127.0.0.1:4323/callback',
    'http://127.0.0.1:4323/',
    'http://127.0.0.1:4323',
    'http://[::1]:4323/callback',
    'http://[::1]:4323',
    'http://localhost:4323/callback',
    'http://localhost:4323/callback?x=1',
  ])('classifies the loopback URL %s as loopback', (value) => {
    expect(classifyReturnUrl(value)).toBe('loopback');
  });

  it.each([
    // Port is required by this implementation.
    'http://127.0.0.1/callback',
    'http://localhost/callback',
    // https is not a loopback scheme.
    'https://127.0.0.1:4323/callback',
    'https://localhost:4323/callback',
    // Other hosts.
    'http://example.org/callback',
    'https://example.org/callback',
    'http://192.168.0.10:4323/callback',
    // Protocol-relative and scheme tricks.
    '//evil.org',
    '//evil.org/callback',
    '/\\evil.org',
    // The next two are the script URL scheme, which is the case under test.
    // eslint-disable-next-line no-script-url
    'javascript:alert(1)',
    // eslint-disable-next-line no-script-url
    'JAVASCRIPT:alert(1)',
    // Lookalike hostnames.
    'http://127.0.0.1.evil.org:4323/',
    'http://localhost.evil.org:4323/',
    'http://localhost:4323@evil.org/',
    'http://127.0.0.1:4323@evil.org/',
    // Credentials on a loopback host.
    'http://user@127.0.0.1:4323/callback',
    // Empty and non-string values.
    '',
  ])('rejects %s', (value) => {
    expect(classifyReturnUrl(value)).toBe('rejected');
  });

  it('rejects missing values', () => {
    expect(classifyReturnUrl(undefined)).toBe('rejected');
    expect(classifyReturnUrl(null)).toBe('rejected');
    expect(classifyReturnUrl(['/a', '/b'])).toBe('rejected');
  });
});

describe('safeReturnUrl', () => {
  it('keeps relative paths unchanged', () => {
    expect(safeReturnUrl('/foo-bar')).toBe('/foo-bar');
    expect(safeReturnUrl('/a?b=c')).toBe('/a?b=c');
  });

  it('keeps a loopback URL, normalized', () => {
    expect(safeReturnUrl('http://127.0.0.1:4323/callback')).toBe(
      'http://127.0.0.1:4323/callback',
    );
    expect(safeReturnUrl('http://127.0.0.1:4323')).toBe(
      'http://127.0.0.1:4323/',
    );
  });

  it('falls back to / for a rejected value', () => {
    expect(safeReturnUrl('https://evil.org/steal')).toBe('/');
    expect(safeReturnUrl('//evil.org')).toBe('/');
    // eslint-disable-next-line no-script-url
    expect(safeReturnUrl('javascript:alert(1)')).toBe('/');
    expect(safeReturnUrl(undefined)).toBe('/');
  });

  it('falls back to / for a loopback URL when loopback is not allowed', () => {
    expect(
      safeReturnUrl('http://127.0.0.1:4323/callback', { allowLoopback: false }),
    ).toBe('/');
    expect(safeReturnUrl('/foo', { allowLoopback: false })).toBe('/foo');
  });
});

describe('isLoopbackHandoff', () => {
  it('requires a loopback return_url and a state', () => {
    expect(isLoopbackHandoff('http://127.0.0.1:4323/callback', 'abc')).toBe(
      true,
    );
  });

  it('refuses a loopback return_url without a state', () => {
    expect(isLoopbackHandoff('http://127.0.0.1:4323/callback', '')).toBe(false);
    expect(isLoopbackHandoff('http://127.0.0.1:4323/callback', null)).toBe(
      false,
    );
  });

  it('is false for relative and rejected return_url values', () => {
    expect(isLoopbackHandoff('/foo', 'abc')).toBe(false);
    expect(isLoopbackHandoff('https://example.org/x', 'abc')).toBe(false);
  });
});
