import { injectIntl } from 'react-intl';
import React from 'react';
import LoginForm from './LoginForm';
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
      <div style={{ maxWidth: '600px', margin: 'auto' }}>
        <LoginForm {...args} />
      </div>
    </Wrapper>
  );
});

export const Form = StoryComponent.bind({});
Form.args = {
  providers: [
    providers.facebook,
    providers.github,
    providers.microsoft,
    providers.google,
  ],
  action: 'login',
  loading: false,
};

export default {
  title: 'Public/Components/LoginForm',
  component: LoginForm,
  argTypes: {
    loading: {
      name: 'Loading',
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    providers: {
      name: 'Providers',
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
