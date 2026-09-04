/**
 * Login container.
 * @module components/LoginForm/LoginForm
 */
import React from 'react';
import { Helmet } from '@plone/volto/helpers';
import { Container, Segment, Dimmer, Loader } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import AuthProviders from '../AuthProviders/AuthProviders';

const messages = defineMessages({
  loading: {
    id: 'Loading',
    defaultMessage: 'Loading',
  },
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
  const validProviders = providers.filter((provider) => provider.id !== 'oidc');
  return (
    <div id="page-login">
      <Helmet title={intl.formatMessage(messages.Login)} />
      <Container text>
        <Segment.Group raised>
          <Segment className="primary">
            <FormattedMessage id="Log In" defaultMessage="Login" />
          </Segment>
          <Segment secondary>
            <FormattedMessage id="Select Login Provider" defaultMessage="Select Login Provider" />
          </Segment>
          <Segment className="form">
            {!loading && validProviders && <AuthProviders providers={validProviders} action={action} onSelectProvider={onSelectProvider} />}
            {(loading || validProviders.length === 0) && (
              <Dimmer.Dimmable as={Segment} dimmed={true}>
                <Dimmer active inverted>
                  <Loader size={'small'} inline="centered">
                    {intl.formatMessage(messages.loading)}
                  </Loader>
                </Dimmer>
              </Dimmer.Dimmable>
            )}
          </Segment>
        </Segment.Group>
      </Container>
    </div>
  );
}

export default injectIntl(LoginForm);
