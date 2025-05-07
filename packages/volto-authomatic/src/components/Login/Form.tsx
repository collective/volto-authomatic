/**
 * Login container.
 * @module components/Login/Form
 */
import React from 'react';
import { useIntl } from 'react-intl';
import messages from '@plone-collective/volto-authomatic/messages';
import Providers from '@plone-collective/volto-authomatic/components/Providers/Providers';
import LoginForm from '@plone-collective/volto-authomatic/components/LoginForm/LoginForm';
import PloneAuth from '@plone-collective/volto-authomatic/components/AuthBackends/PloneAuth/PloneAuth';
import Loading from '@plone-collective/volto-authomatic/components/Loading/Loading';
import type { AuthProviderOption } from '@plone-collective/volto-authomatic/types';

interface FormProps {
  loading: boolean;
  plugin: string;
  providers: AuthProviderOption[];
  displayPlone: boolean;
  action: string;
  onSelectProvider: (providerId: string) => void;
  location: Location;
}

const Form: React.FC<FormProps> = ({
  loading,
  plugin,
  providers,
  action,
  displayPlone,
  onSelectProvider,
  location,
}) => {
  const intl = useIntl();

  const displayProviders = providers.length > 0 && plugin !== 'PlonePAS';
  const descriptionMsg = loading
    ? messages.loading
    : displayProviders
      ? messages.LoginProviderDescription
      : messages.LoginDescription;
  console.log(providers, loading, plugin);
  return (
    <LoginForm
      title={intl.formatMessage(messages.Login)}
      description={intl.formatMessage(descriptionMsg)}
    >
      <>
        {loading || plugin === 'oidc' ? (
          <Loading
            display={true}
            message={intl.formatMessage(messages.loading)}
          />
        ) : displayProviders ? (
          <Providers
            providers={providers}
            displayPlone={displayPlone}
            action={action}
            onSelectProvider={onSelectProvider}
          />
        ) : (
          <PloneAuth location={location} />
        )}
      </>
    </LoginForm>
  );
};

export default Form;
