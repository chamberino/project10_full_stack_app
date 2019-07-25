import React from 'react';

export default ({ context  }) => {
  const authUser = context.authenticatedUser.user.fullName;
  const username = context.authenticatedUser.user.emailAddress

  return (
    <div className="bounds">
      <div className="grid-100">
        <h1>{authUser} is authenticated!</h1>
        <p>Your username is {username}.</p>
      </div>
    </div>
  );
}