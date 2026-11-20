import React from 'react';
import ConsentPage from './ConsentPage';
import Wrapper from '@plone/volto/storybook';

const noop = () => {};

const StoryComponent = ({ children, ...args }) => {
  return (
    <Wrapper>
      <div
        style={{
          maxWidth: '600px',
          margin: 'auto',
        }}
      >
        <ConsentPage {...args} onDeny={noop} onAllow={noop} />
      </div>
    </Wrapper>
  );
};

export const Loopback = StoryComponent.bind({});
Loopback.args = {
  userName: 'Jane Doe',
  siteTitle: 'Example Site',
  returnUrl: 'http://127.0.0.1:4323/callback',
  state: 'story-state',
  token: 'story-token',
};

export const Refused = StoryComponent.bind({});
Refused.args = {
  userName: 'Jane Doe',
  siteTitle: 'Example Site',
  returnUrl: 'https://example.org/callback',
  state: '',
  token: 'story-token',
};

export default {
  title: 'Public/Components/Support/ConsentPage',
  component: ConsentPage,
  argTypes: {},
};
