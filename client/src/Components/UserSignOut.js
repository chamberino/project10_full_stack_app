import React from 'react';
import { Redirect } from 'react-router-dom';

/* 
UserSignOut - This component doesn't render any visual elements. Instead, it signs out the authenticated user and redirects 
the user to the default route (i.e. the list of courses).
*/

export default ({ context }) => {
  context.actions.signOut();

  return (
    <Redirect to="/" />
  );
}

