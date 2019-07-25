import React from 'react';
import { Link } from 'react-router-dom';

/* 
Stateless Component
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
          {/* <h1><Link className="header--logo" to="/courses">Courses</Link></h1> */}

          <Link to="/courses"><h1 className="header--logo">Courses</h1></Link>
          <nav>
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


// export default class Header extends React.PureComponent {

//   render() {
//     // extract context from this.props for easier data management
//     const { context } = this.props;
//     // authUser will either hold the currently signed in users credentials
//     // or null if no user is signed in
//     const authUser = context.authenticatedUser;

//     // The header nav is conditionally rendered based on the authenticatedUser state
//   return (
//   <div>
//     <div className="header">
//       <div className="bounds">
//         <h1 className="header--logo">Courses</h1>
//         <nav>
//           {

//           }
//           <Link className="signup" to={'/courses/signup'} >Sign Up</Link>
//           <Link className="signin" to={'/courses/signin'}>Sign In</Link>
//         </nav>
//       </div>
//     </div>
//     <hr />
//   </div>
//   );
// }
// }
