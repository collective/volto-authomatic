/**
 * Logout container.
 * @module components/theme/Logout/Logout
 */

import React, { useEffect } from 'react';

import Login from '../Login/Login';
import { logout, purgeMessages } from '@plone/volto/actions';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

/**
 * Logout function.
 * @function Logout
 * @returns {JSX.Element} Markup of the Logout page.
 */
function Logout({ intl }) {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
    dispatch(purgeMessages());
  }, [dispatch]);

  return <Login location={{ query: location.query }} />;
}

export default Logout;
