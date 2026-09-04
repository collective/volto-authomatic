/**
 * Logout container.
 * @module components/theme/Logout/Logout
 */

import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { oidcLogout } from '../../actions';
import { defineMessages, injectIntl } from 'react-intl';
import { logout, purgeMessages } from '@plone/volto/actions';
import { useSelector, useDispatch } from 'react-redux';

const messages = defineMessages({
  loggedOut: {
    id: 'You have been logged out',
    defaultMessage: 'You have been logged out',
  },
});

/**
 * Logout function.
 * @function Logout
 * @returns {JSX.Element} Markup of the Logout page.
 */
function Logout({ intl }) {
  const dispatch = useDispatch();
  const [displayLogout, setDisplayLogout] = useState(false);
  const loginOIDCValues = useSelector((state) => state.oidcRedirect);
  const logoutOIDCValues = useSelector((state) => state.oidcLogout);

  useEffect(() => {
    const isOIDC = loginOIDCValues.next_url;
    if (isOIDC) {
      dispatch(oidcLogout());
    } else {
      setDisplayLogout(true);
    }
    dispatch(logout());
    dispatch(purgeMessages());
  }, [dispatch, displayLogout, loginOIDCValues]);

  useEffect(() => {
    const next_url = logoutOIDCValues.next_url;
    if (next_url) {
      // Give time to save state to localstorage
      setTimeout(function () {
        window.location.href = next_url;
      }, 500);
    }
  }, [logoutOIDCValues]);

  return (
    displayLogout && (
      <div id="page-logout">
        <Container text>{intl.formatMessage(messages.loggedOut)}</Container>
      </div>
    )
  );
}

export default injectIntl(Logout);
