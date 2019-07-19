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
import NotFound from './Components/NotFound';
// import CreateCourse from './Components/CreateCourse';
import UserSignUp from './Components/UserSignUp';
import UserSignIn from './Components/UserSignIn';
import UserSignOut from './Components/UserSignOut';
import Authenticated from './Components/Authenticated';

// Connect the component to contex
import withContext from './Components/Context';

// Initialize a variable named UserSignUpWithContext. 
// Set the value to call withContext(UserSignUp):
// This connects the UserSignUp component to context. In other words,
// UserSignUp is now a consuming component that's subscribed to all context changes.
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const errorFormWithContext = withContext(NotFound);

// {/* <Route render={ () => <HeaderWithContext /> } /> */}
// {/* <Header /> */}

// {/* <Route path="/" render={ ({match}) => <Header match={match} /> }/> */}

export default class App extends Component {
  // Constructor initializes state //
  
    state = {
    };

  render() {
    return (         
      <div>
      <BrowserRouter>
        <HeaderWithContext />
        {/* <Route path="/" render={ ({match}) => <HeaderWithContext match={match} /> }/> */}
        <Switch>
          <Route exact path="/" render={ () => <Redirect to="/courses/" /> } />
          <Route exact path="/courses" component={Courses} />
          <Route exact path="/courses/signin/" component={UserSignInWithContext} />
          <Route path="/courses/signup" component={UserSignUpWithContext} />
          <Route exact path="/courses/signout/" component={UserSignOut} />
          <Route path="/authenticated" component={Authenticated} /> 
          <Route path="/courses/:id" render={ ({match}) => <CourseDetail title={'About'} match={match}/> } />
          <Route component={errorFormWithContext}/>
          {/* <Route component={NotFound}/> */}
          {/* <Route exact path="/courses/create-course/" render={ ({match}) => <CreateCourse title={'About'} match={match}/> } />       */}
        </Switch>
      </BrowserRouter>    
      </div> 
    );
  }
}


//  {/* <Route exact path="/courses/:id" render={ ({match}) => <CourseDetailContainer title={'About'} match={match}/> } /> */}
          // {/* <Route exact path="/courses/:id/update-course" render={ ({match}) => <UpdateCourse title={'About'} match={match}/> } /> */}
          //  {/* <Route component={NotFound}/> */}


        //    render() {
        //     return (    
        //       <BrowserRouter>
        
        //       <Switch>
        //         <Route exact path="/" render={ () => <Redirect to="/courses/" /> } />
        //         <div>
        //           <Route path="/" render={ () => <Header /> } />
        //           <div>
        //           <Route exact path="/courses" component={Courses} />
        
        //           <Route path="/courses/:id" render={ ({match}) => <CourseDetail title={'About'} match={match}/> } />
        
                 
        //           </div>
        //         </div>
        //       </Switch>
        //       </BrowserRouter>    
        //     );
        //   }
        // }
        