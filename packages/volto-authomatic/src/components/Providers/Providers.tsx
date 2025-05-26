/**
 * Providers container.
 * @module components/Providers/Providers
 */
import React from 'react';
import { Container } from '@plone/components';
import AuthProvider from '@plone-collective/volto-authomatic/components/Providers/AuthProvider';
import type { AuthProviderOption } from '@plone-collective/volto-authomatic/types';

import './Providers.scss';

interface ProvidersProps {
  providers: AuthProviderOption[];
  displayPlone: boolean;
  action: string;
  onSelectProvider: (providerId: string) => void;
}

const Providers: React.FC<ProvidersProps> = ({
  providers,
  displayPlone,
  action,
  onSelectProvider,
}) => {
  const providerIds = providers.map((provider) => provider.id);
  if (displayPlone === true && !providerIds.includes('plone')) {
    providers.push({
      id: 'plone',
      plugin: 'PlonePAS',
      title: 'Plone',
      url: '',
    });
  }
  return (
    <Container id="authenticationProviders">
      {providers.map((provider, i) =>
        provider ? (
          <AuthProvider
            key={provider.id || i}
            provider={provider}
            action={action}
            onSelectProvider={onSelectProvider}
          />
        ) : null,
      )}
    </Container>
  );
};

export default Providers;
