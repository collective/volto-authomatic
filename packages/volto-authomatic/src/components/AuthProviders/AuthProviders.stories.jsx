import { injectIntl } from 'react-intl';
import React from 'react';
import AuthProviders from './AuthProviders';
import Wrapper from '@plone/volto/storybook';

const providers = {
  facebook: { id: 'facebook', title: 'Facebook' },
  github: { id: 'github', title: 'GitHub' },
  google: { id: 'google', title: 'Google' },
  linkedin: { id: 'linkedin', title: 'LinkedIn' },
  microsoft: { id: 'microsoft', title: 'Microsoft' },
};

const StoryComponent = injectIntl(({ children, ...args }) => {
  return (
    <Wrapper>
      <div style={{ maxWidth: '300px', margin: 'auto' }}>
        <AuthProviders {...args} />
      </div>
    </Wrapper>
  );
});

export const OneProviderLogin = StoryComponent.bind({});
OneProviderLogin.args = {
  providers: [providers.facebook],
  action: 'login',
};
export const OneProviderRegister = StoryComponent.bind({});
OneProviderRegister.args = {
  providers: [providers.facebook],
  action: 'register',
};

export const MultipleProvidersLogin = StoryComponent.bind({});
MultipleProvidersLogin.args = {
  providers: [
    providers.facebook,
    providers.github,
    providers.microsoft,
    providers.google,
  ],
  action: 'login',
};
export const MultipleProvidersRegister = StoryComponent.bind({});
MultipleProvidersRegister.args = {
  providers: [
    providers.facebook,
    providers.github,
    providers.microsoft,
    providers.google,
  ],
  action: 'register',
};

export default {
  title: 'Public/Components/AuthProviders',
  component: AuthProviders,
  argTypes: {
    providers: {
      name: 'Provider',
      defaultValue: [],
    },
    action: {
      name: 'Action',
      defaultValue: '',
      control: {
        type: 'select',
        options: ['login', 'register'],
      },
    },
  },
};
