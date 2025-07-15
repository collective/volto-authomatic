import { Login } from '@plone/volto/components';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function FallbackLogin(props) {
  const history = useHistory();
  // Login component doesn't support passing in a return_url so let's set it
  //   via the querystring so the component can read it.
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('return_url', '/');
    history.replace(`${history.location.pathname}?${url.searchParams.toString()}`);
  }, [history]);

  return <Login {...props} />;
}
