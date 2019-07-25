import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const jwt = require('jsonwebtoken');

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    // if a an 'authenticatedUser' cookie exists, then state is set to it's value
    // Otherwise the value of authenticatedUser is null and a user will have to sign-in to view
    // private routes
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  };

  constructor() {
    super();
    this.data = new Data();
  }


  // It's common to pass the Provider's value prop an actions object 
  // to store any event handlers or actions you want to perform on data 
  // that's passed down through context. Next, we'll need to pass 
  // the signIn function to <Context.Provider>, 
  // that way we can call it within any component that's connected to context changes.

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,

      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        update: this.update,
        delete: this.DeleteCourse
      },
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  // retrieve a registered user's credentials from the server
  // log in an authenticated user upon submitting the "Sign In" form
  signIn = async (emailAddress, password) => {
    // signIn takes a username and password credentials 
    // to call the getUser() method in Data.js
    // If credentials are valid the returned value will be an object 
    // containing the authenticated users day or will remain null upon failure
    const user = await this.data.getUser(emailAddress, password);
    // conditionally set authenticated 
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: {user, password: password}
        };
      });
      // Set cookie named authenticated user with js-cookie
      // The second arg specifies the value to store in the cookie
      // The third arg is optional and can take in various options
      // Below the expiry property is set to a value of 1, which means
      // the cookie will expire after a day
      Cookies.set('authenticatedUser', JSON.stringify(this.state.authenticatedUser), {expires: 1});
    }
    return user;
  }

  signOut = () => {
    this.setState(() => { 
      return {
        authenticatedUser: null,
      }
    });
    Cookies.remove('authenticatedUser')
  }

  upDateCourse = async (title, description, estimatedTime=null, materialsNeeded=null, courseId) => {
    const update = await this.data.upDate(title, description, estimatedTime, materialsNeeded, courseId);
    // conditionally set authenticated 
    return update
  }

  CreateCourse = async (title, description, estimatedTime=null, materialsNeeded=null) => {
    const newCourse = await this.data.create(title, description, estimatedTime, materialsNeeded);
    // conditionally set authenticated 
    console.log(newCourse);
    return newCourse;
  }

  DeleteCourse = async (courseId, credentials) => {
    const deleteCourse = await this.data.delete(courseId, credentials)
    return deleteCourse;
  }

}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */
