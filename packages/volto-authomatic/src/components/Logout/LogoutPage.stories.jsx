import React from 'react';
import LogoutPage from './LogoutPage';
import Wrapper from '@plone/volto/storybook';

const onLogin = (event) => {};

const StoryComponent = ({ children, ...args }) => {
  return (
    <Wrapper>
      <div
        style={{
          maxWidth: '600px',
          margin: 'auto',
        }}
      >
        <LogoutPage {...args} onSubmit={onLogin} />
      </div>
    </Wrapper>
  );
};

export const Plone = StoryComponent.bind({});
Plone.args = {};

export default {
  title: 'Public/Components/Support/LogoutPage',
  component: LogoutPage,
  argTypes: {},
};
