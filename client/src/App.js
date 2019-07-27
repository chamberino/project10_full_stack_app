import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import './global.css';

// Import App Components
import Header from './Components/Header';
import Courses from './Components/Courses/Courses';
import CourseDetail from './Components/CourseDetail/CourseDetail';
import CreateCourse from './Components/CreateCourse';
import NotFound from './Components/NotFound';
// import CreateCourse from './Components/CreateCourse';
import UserSignUp from './Components/UserSignUp';
import UserSignIn from './Components/UserSignIn';
import UserSignOut from './Components/UserSignOut';
import Authenticated from './Components/Authenticated';

// Connect the App Component to Context
import withContext from './Components/Context';
// Import the PrivateRoute Component
import PrivateRoute from './PrivateRoute';


// Initialize a variable named UserSignUpWithContext. 
// Set the value to call withContext(UserSignUp):
// This connects the UserSignUp component to context. In other words,
// UserSignUp is now a consuming component that's subscribed to all context changes.
const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const CoursesWithContext = withContext(Courses);
const errorFormWithContext = withContext(NotFound);

export default class App extends Component {
  // Constructor initializes state //
  
    state = {
    };

  render() {
    return (         
      <div>
      <BrowserRouter>
        <HeaderWithContext />
        <Switch>
          <Route exact path="/" render={ () => <Redirect to="/courses/" /> } />
          <PrivateRoute test="test" path="/authenticated" component={AuthWithContext} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route exact path="/courses/create-course/" component={CreateCourseWithContext}/>
          <PrivateRoute exact path="/courses" component={CoursesWithContext} />
          {/* The course id path used to be rendered with render props mounting the CourseDetail component. match and title were passed in as props. */}
          <PrivateRoute path="/courses/:id" component={CourseDetailWithContext} />
          <Route component={errorFormWithContext}/>
          {/* <Route component={NotFound}/> */}
          {/* <Route exact path="/courses/create-course/" render={ ({match}) => <CreateCourse title={'About'} match={match}/> } />       */}
        </Switch>
      </BrowserRouter>    
      </div> 
    );
  }
}
