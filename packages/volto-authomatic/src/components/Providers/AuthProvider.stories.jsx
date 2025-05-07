import React from 'react';
import AuthProvider from '@plone-collective/volto-authomatic/components/Providers/AuthProvider';
import Wrapper from '@plone/volto/storybook';
import '../../styles.css';

const providers = {
  facebook: { id: 'facebook', title: 'Facebook' },
  github: { id: 'github', title: 'GitHub' },
  google: { id: 'google', title: 'Google' },
  linkedin: { id: 'linkedin', title: 'LinkedIn' },
  microsoft: { id: 'microsoft', title: 'Microsoft' },
  twitter: { id: 'twitter', title: 'X' },
  oidc: { id: 'oidc', title: 'Keycloak' },
};

const StoryComponent = ({ children, ...args }) => {
  return (
    <Wrapper>
      <div style={{ maxWidth: '300px', margin: 'auto' }}>
        <AuthProvider {...args} />
      </div>
    </Wrapper>
  );
};

export const FacebookLogin = StoryComponent.bind({});
FacebookLogin.args = {
  provider: providers.facebook,
  action: 'login',
};
export const FacebookRegister = StoryComponent.bind({});
FacebookRegister.args = {
  provider: providers.facebook,
  action: 'register',
};

export const GitHubLogin = StoryComponent.bind({});
GitHubLogin.args = {
  provider: providers.github,
  action: 'login',
};
export const GitHubRegister = StoryComponent.bind({});
GitHubRegister.args = {
  provider: providers.github,
  action: 'register',
};

export const GoogleLogin = StoryComponent.bind({});
GoogleLogin.args = {
  provider: providers.google,
  action: 'login',
};
export const GoogleRegister = StoryComponent.bind({});
GoogleRegister.args = {
  provider: providers.google,
  action: 'register',
};

export const LinkedInLogin = StoryComponent.bind({});
LinkedInLogin.args = {
  provider: providers.linkedin,
  action: 'login',
};
export const LinkedInRegister = StoryComponent.bind({});
LinkedInRegister.args = {
  provider: providers.linkedin,
  action: 'register',
};

export const MicrosoftLogin = StoryComponent.bind({});
MicrosoftLogin.args = {
  provider: providers.microsoft,
  action: 'login',
};
export const MicrosoftRegister = StoryComponent.bind({});
MicrosoftRegister.args = {
  provider: providers.microsoft,
  action: 'register',
};

export const OIDCLogin = StoryComponent.bind({});
OIDCLogin.args = {
  provider: providers.oidc,
  action: 'login',
};
export const OIDCRegister = StoryComponent.bind({});
OIDCRegister.args = {
  provider: providers.oidc,
  action: 'register',
};

export const XLogin = StoryComponent.bind({});
XLogin.args = {
  provider: providers.twitter,
  action: 'login',
};
export const XRegister = StoryComponent.bind({});
XRegister.args = {
  provider: providers.twitter,
  action: 'register',
};

export const OIDCLogin = StoryComponent.bind({});
OIDCLogin.args = {
  provider: providers.oidc,
  action: 'login',
};
export const OIDCRegister = StoryComponent.bind({});
OIDCRegister.args = {
  provider: providers.oidc,
  action: 'register',
};

export default {
  title: 'Public/Components/Support/AuthProvider',
  component: AuthProvider,
  argTypes: {
    provider: {
      name: 'Provider',
      defaultValue: '',
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
