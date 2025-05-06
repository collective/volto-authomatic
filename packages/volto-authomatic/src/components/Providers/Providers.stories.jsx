import React from 'react';
import Providers from './Providers';
import Wrapper from '@plone/volto/storybook';

const providers = {
  facebook: { id: 'facebook', title: 'Facebook' },
  github: { id: 'github', title: 'GitHub' },
  google: { id: 'google', title: 'Google' },
  linkedin: { id: 'linkedin', title: 'LinkedIn' },
  microsoft: { id: 'microsoft', title: 'Microsoft' },
};

const StoryComponent = ({ children, ...args }) => {
  return (
    <Wrapper>
      <div style={{ maxWidth: '300px', margin: 'auto' }}>
        <Providers {...args} />
      </div>
    </Wrapper>
  );
};

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

export const WithPlone = StoryComponent.bind({});
WithPlone.args = {
  providers: [
    providers.facebook,
    providers.github,
    providers.microsoft,
    providers.google,
  ],
  displayPlone: true,
  action: 'login',
};

export default {
  title: 'Public/Components/Support/Providers',
  component: Providers,
  argTypes: {
    providers: {
      name: 'Provider',
      defaultValue: [],
    },
    displayPlone: {
      name: 'Display Plone',
      defaultValue: false,
      control: {
        type: 'boolean',
      },
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
