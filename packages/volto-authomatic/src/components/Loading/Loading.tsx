import React from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

interface LoadingProps {
  display: boolean;
  message: string;
}

const Loading: React.FC<LoadingProps> = (props) => {
  const { display, message } = props;
  return (
    display && (
      <Dimmer.Dimmable as={Segment} dimmed={true}>
        <Dimmer active inverted>
          <Loader size={'small'} inline="centered">
            {message}
          </Loader>
        </Dimmer>
      </Dimmer.Dimmable>
    )
  );
};

export default Loading;
