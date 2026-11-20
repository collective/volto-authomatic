/**
 * Consent page for a loopback token handoff.
 * @module components/Consent/ConsentPage
 */
import React from 'react';
import { useIntl } from 'react-intl';

import messages from '@plone-collective/volto-authomatic/messages';
import LoginForm from '@plone-collective/volto-authomatic/components/LoginForm/LoginForm';
import {
  isLoopbackHandoff,
  safeReturnUrl,
} from '@plone-collective/volto-authomatic/helpers/returnUrl';

import './ConsentPage.scss';

export interface ConsentPageProps {
  userName: string;
  siteTitle: string;
  returnUrl: string | null | undefined;
  state: string | null | undefined;
  token: string | null | undefined;
  onAllow?: () => void;
  onDeny: () => void;
}

/**
 * Ask the user to allow a loopback application to receive the token.
 *
 * Allow is a full-page form POST to the loopback URL with ``token`` and
 * ``state``. Deny is a plain button and sends nothing.
 *
 * :param props: Page props, see :interface:`ConsentPageProps`.
 * :returns: The consent page.
 */
const ConsentPage: React.FC<ConsentPageProps> = ({
  userName,
  siteTitle,
  returnUrl,
  state,
  token,
  onAllow,
  onDeny,
}) => {
  const intl = useIntl();

  if (!token || !isLoopbackHandoff(returnUrl, state)) {
    return (
      <LoginForm
        title={intl.formatMessage(messages.consentTitle)}
        description=""
      >
        <div className="consent-page">
          <p className="consent-question">
            {intl.formatMessage(messages.consentInvalid)}
          </p>
          <div className="consent-actions">
            <button type="button" className="consent-deny" onClick={onDeny}>
              {intl.formatMessage(messages.consentBack)}
            </button>
          </div>
        </div>
      </LoginForm>
    );
  }

  return (
    <LoginForm
      title={intl.formatMessage(messages.consentTitle)}
      description={intl.formatMessage(messages.consentDescription)}
    >
      <div className="consent-page">
        <p className="consent-question">
          {intl.formatMessage(messages.consentQuestion, {
            user: userName,
            site: siteTitle,
          })}
        </p>
        <div className="consent-actions">
          <form
            method="post"
            action={safeReturnUrl(returnUrl)}
            encType="application/x-www-form-urlencoded"
            onSubmit={() => onAllow?.()}
          >
            <input type="hidden" name="token" value={token} />
            <input type="hidden" name="state" value={state ?? ''} />
            <button type="submit" className="consent-allow">
              {intl.formatMessage(messages.consentAllow)}
            </button>
          </form>
          <button type="button" className="consent-deny" onClick={onDeny}>
            {intl.formatMessage(messages.consentDeny)}
          </button>
        </div>
      </div>
    </LoginForm>
  );
};

export default ConsentPage;
