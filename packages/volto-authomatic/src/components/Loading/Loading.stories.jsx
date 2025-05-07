import React from 'react';
import Loading from './Loading';
import Wrapper from '@plone/volto/storybook';

const StoryComponent = ({ children, ...args }) => {
  return (
    <Wrapper>
      <div style={{ maxWidth: '600px', margin: 'auto' }}>
        <Loading {...args} />
      </div>
    </Wrapper>
  );
};

export const Display = StoryComponent.bind({});
Display.args = {
  display: true,
  message: 'Loading',
};

export const DoNotDisplay = StoryComponent.bind({});
DoNotDisplay.args = {
  display: false,
};

export default {
  title: 'Public/Components/Support/Loading',
  component: Loading,
  argTypes: {
    display: {
      name: 'Display',
      defaultValue: true,
      control: {
        type: 'boolean',
      },
    },
    message: {
      name: 'Message',
      defaultValue: 'Loading',
      control: {
        type: 'str',
      },
    },
  },
};
