import React from 'react';
import { Link } from 'react-router-dom';

/* 
Header- Displays the top menu bar for the application and includes 
buttons for signing in and signing up (if there's not an authenticated user) 
or the user's first and last name and a button for signing out 
(if there's an authenticated user).
*/

export default class Header extends React.PureComponent {

  render() {
    // extract context from this.props for easier data management
    const { context } = this.props;
    
    // The header nav is conditionally rendered based on the authenticatedUser state
    return (
      <div className="header">
        <div className="bounds">

          <Link to="/courses"><h1 className="header--logo">Courses</h1></Link>
          <nav>
          {/* Ternary operator checks if authenticatedUser is set in props */}
            {context.authenticatedUser ? (
              <React.Fragment>
                <span>Welcome, {context.authenticatedUser.user.fullName}!</span>
                <Link to="/signout">Sign Out</Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link className="signup" to={"/signup"}>Sign Up</Link>
                <Link className="signin" to={"/signin"}>Sign In</Link>
              </React.Fragment>
            )}
          </nav>
        </div>
      </div>
    );
  }
};
