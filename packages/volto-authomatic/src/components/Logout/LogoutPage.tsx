/**
 * Logout container.
 * @module components/Logout/LogoutMessage
 */

import React from 'react';
import { Container } from '@plone/components';
import { useIntl } from 'react-intl';

import messages from '@plone-collective/volto-authomatic/messages';
import './LogoutPage.scss';

const LogoutPage: React.FC = () => {
  const intl = useIntl();
  return (
    <div id="page-logout">
      <Container narrow>{intl.formatMessage(messages.loggedOut)}</Container>
    </div>
  );
};

export default LogoutPage;
