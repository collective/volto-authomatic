/**
 * Login container.
 * @module components/LoginForm/LoginForm
 */
import React from 'react';
import { Helmet } from '@plone/volto/helpers';
import { Container, Segment } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import AuthProviders from '../AuthProviders/AuthProviders';

const messages = defineMessages({
  Login: {
    id: 'Login',
    defaultMessage: 'Login',
  },
});

/**
 * Login function.
 * @function LoginForm
 * @returns {JSX.Element} Markup of the Login page.
 */
function LoginForm({ intl, loading, providers, action, onSelectProvider }) {
  return (
    <div id="page-login">
      <Helmet title={intl.formatMessage(messages.Login)} />
      <Container text>
        <Segment.Group raised>
          <Segment className="primary">
            <FormattedMessage id="Log In" defaultMessage="Login" />
          </Segment>
          <Segment secondary>
            <FormattedMessage
              id="Select Login Provider"
              defaultMessage="Select Login Provider"
            />
          </Segment>
          <Segment className="form">
            {!loading && providers && (
              <AuthProviders
                providers={providers}
                action={action}
                onSelectProvider={onSelectProvider}
              />
            )}
          </Segment>
        </Segment.Group>
      </Container>
    </div>
  );
}

export default injectIntl(LoginForm);
