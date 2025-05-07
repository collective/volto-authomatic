import React from 'react';
import Form from './Form';
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
      <div style={{ maxWidth: '600px', margin: 'auto' }}>
        <Form {...args} />
      </div>
    </Wrapper>
  );
};

export const LoadingProviders = StoryComponent.bind({});
LoadingProviders.args = {
  providers: [],
  action: 'login',
  loading: true,
};

export const NoProviders = StoryComponent.bind({});
NoProviders.args = {
  providers: [],
  action: 'login',
  loading: false,
};

export const OneProvider = StoryComponent.bind({});
OneProvider.args = {
  providers: [providers.github],
  action: 'login',
  loading: false,
};

export const MultipleProviders = StoryComponent.bind({});
MultipleProviders.args = {
  providers: [
    providers.facebook,
    providers.github,
    providers.microsoft,
    providers.google,
  ],
  action: 'login',
  loading: false,
};

export const MultipleProvidersAndPlone = StoryComponent.bind({});
MultipleProvidersAndPlone.args = {
  providers: [
    providers.facebook,
    providers.github,
    providers.microsoft,
    providers.google,
  ],
  action: 'login',
  displayPlone: true,
  loading: false,
};

export const MultipleProvidersAndPloneSelected = StoryComponent.bind({});
MultipleProvidersAndPloneSelected.args = {
  providers: [
    providers.facebook,
    providers.github,
    providers.microsoft,
    providers.google,
  ],
  action: 'login',
  displayPlone: true,
  plugin: 'PlonePAS',
  loading: false,
};

export default {
  title: 'Public/Components/Login',
  component: Form,
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
    displayPlone: {
      name: 'Display Plone',
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    plugin: {
      name: 'Plugin',
      defaultValue: '',
      control: {
        type: 'select',
        options: ['oidc', 'PlonePAS'],
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
