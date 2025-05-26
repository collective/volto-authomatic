import React from 'react';
import PloneForm from './PloneForm';
import Wrapper from '@plone/volto/storybook';

const onLogin = (event) => {};

const StoryComponent = ({ children, ...args }) => {
  return (
    <Wrapper>
      <div
        style={{
          maxWidth: '600px',
          margin: 'auto',
          backgroundColor: '#f0f0f7',
        }}
      >
        <PloneForm {...args} onSubmit={onLogin} />
      </div>
    </Wrapper>
  );
};

export const Plone = StoryComponent.bind({});
Plone.args = {};

export default {
  title: 'Public/Components/Support/PloneAuth',
  component: PloneForm,
  argTypes: {},
};
