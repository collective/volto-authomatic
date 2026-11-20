import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import Consent from './Consent';

const LOOPBACK = 'http://127.0.0.1:4323/callback';
const STATE = 'state-456';
// header.payload.signature, payload {"sub": "jdoe"}
const TOKEN = `e30.${btoa(JSON.stringify({ sub: 'jdoe' }))}.sig`;

const mocks = vi.hoisted(() => ({
  history: { push: vi.fn(), replace: vi.fn() },
  initialCookies: {} as Record<string, string>,
  token: null as string | null,
}));

vi.mock('react-router-dom', () => ({
  useHistory: () => mocks.history,
}));

vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(),
  useSelector: (selector: (state: unknown) => unknown) =>
    selector({
      userSession: { token: mocks.token },
      users: { user: { id: 'jdoe', fullname: 'Jane Doe' } },
      site: { data: { title: 'Example Site' } },
    }),
}));

// A cookie store that re-renders the component when a cookie is removed,
// like react-cookie does. Only a real change re-renders; otherwise the
// redirect effect would loop when there is no pending handoff.
vi.mock('react-cookie', async () => {
  const { useState } = await import('react');
  return {
    useCookies: () => {
      const [cookies, setCookies] = useState(mocks.initialCookies);
      const removeCookie = (name: string) =>
        setCookies((prev) => {
          if (!(name in prev)) {
            return prev;
          }
          const next = { ...prev };
          delete next[name];
          return next;
        });
      return [cookies, vi.fn(), removeCookie];
    },
  };
});

vi.mock('@plone/volto/registry', () => ({
  default: { settings: { publicURL: 'http://localhost:3000' } },
}));
vi.mock('@plone/volto/actions/site/site', () => ({ getSite: vi.fn() }));
vi.mock('@plone/volto/actions/users/users', () => ({ getUser: vi.fn() }));

const renderConsent = () =>
  render(
    <IntlProvider locale="en">
      <Consent />
    </IntlProvider>,
  );

describe('Consent', () => {
  beforeEach(() => {
    mocks.token = TOKEN;
    mocks.initialCookies = { return_url: LOOPBACK, login_state: STATE };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders a form that posts the token to the loopback URL', () => {
    const { container } = renderConsent();
    const form = container.querySelector('form') as HTMLFormElement;
    expect(form.getAttribute('action')).toBe(LOOPBACK);
    expect(
      (form.querySelector('input[name="token"]') as HTMLInputElement).value,
    ).toBe(TOKEN);
    expect(
      (form.querySelector('input[name="state"]') as HTMLInputElement).value,
    ).toBe(STATE);
  });

  it('keeps the form mounted and does not navigate on Allow', () => {
    const { container } = renderConsent();
    const form = container.querySelector('form') as HTMLFormElement;
    act(() => {
      fireEvent.submit(form);
    });
    expect(form.isConnected).toBe(true);
    expect(container.querySelector('form')).toBe(form);
    expect(
      (form.querySelector('input[name="token"]') as HTMLInputElement).value,
    ).toBe(TOKEN);
    expect(mocks.history.replace).not.toHaveBeenCalled();
    expect(mocks.history.push).not.toHaveBeenCalled();
  });

  it('returns to the site root on Deny', () => {
    renderConsent();
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Deny' }));
    });
    expect(mocks.history.push).toHaveBeenCalledWith('/');
  });

  it('redirects to the site root without a pending handoff', () => {
    mocks.initialCookies = {};
    const { container } = renderConsent();
    expect(container.querySelector('form')).toBeNull();
    expect(mocks.history.replace).toHaveBeenCalledWith('/');
  });
});
