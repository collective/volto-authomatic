import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import ConsentPage, { ConsentPageProps } from './ConsentPage';

const LOOPBACK = 'http://127.0.0.1:4323/callback';

function renderPage(overrides: Partial<ConsentPageProps> = {}) {
  const props: ConsentPageProps = {
    userName: 'Jane Doe',
    siteTitle: 'Example Site',
    returnUrl: LOOPBACK,
    state: 'state-456',
    token: 'token-123',
    onAllow: vi.fn(),
    onDeny: vi.fn(),
    ...overrides,
  };
  const result = render(
    <IntlProvider locale="en">
      <ConsentPage {...props} />
    </IntlProvider>,
  );
  return { ...result, props };
}

describe('ConsentPage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('names the user and the site in the question', () => {
    renderPage();
    expect(
      screen.getByText(
        'Allow an application on this computer to act as Jane Doe on Example Site?',
      ),
    ).toBeTruthy();
  });

  it('renders a form POST with token and state to the loopback URL', () => {
    const { container, props } = renderPage();

    const form = container.querySelector('form');
    expect(form).not.toBeNull();
    expect(form?.getAttribute('method')).toBe('post');
    expect(form?.getAttribute('action')).toBe(LOOPBACK);
    expect(form?.getAttribute('enctype')).toBe(
      'application/x-www-form-urlencoded',
    );

    const token = form?.querySelector('input[name="token"]');
    const state = form?.querySelector('input[name="state"]');
    expect(token?.getAttribute('type')).toBe('hidden');
    expect(token?.getAttribute('value')).toBe(props.token);
    expect(state?.getAttribute('type')).toBe('hidden');
    expect(state?.getAttribute('value')).toBe(props.state);
  });

  it('calls onAllow when the form is submitted', () => {
    const { container, props } = renderPage();

    fireEvent.submit(container.querySelector('form') as HTMLFormElement);

    expect(props.onAllow).toHaveBeenCalledTimes(1);
    expect(props.onDeny).not.toHaveBeenCalled();
  });

  it('does not submit anything when Deny is clicked', () => {
    const submitListener = vi.fn((event: Event) => event.preventDefault());
    document.addEventListener('submit', submitListener);

    try {
      const { props } = renderPage();

      fireEvent.click(screen.getByRole('button', { name: 'Deny' }));

      expect(props.onDeny).toHaveBeenCalledTimes(1);
      expect(props.onAllow).not.toHaveBeenCalled();
      expect(submitListener).not.toHaveBeenCalled();
    } finally {
      document.removeEventListener('submit', submitListener);
    }
  });

  it('keeps Deny outside the form', () => {
    renderPage();
    const deny = screen.getByRole('button', { name: 'Deny' });
    expect(deny.closest('form')).toBeNull();
  });

  it('renders no form for a rejected return_url', () => {
    const { container } = renderPage({
      returnUrl: 'https://example.org/callback',
    });
    expect(container.querySelector('form')).toBeNull();
    expect(
      screen.getByRole('button', { name: 'Back to the site' }),
    ).toBeTruthy();
  });

  it('renders no form for a loopback return_url without a state', () => {
    const { container } = renderPage({ state: '' });
    expect(container.querySelector('form')).toBeNull();
  });

  it('renders no form without a token', () => {
    const { container } = renderPage({ token: null });
    expect(container.querySelector('form')).toBeNull();
  });
});
