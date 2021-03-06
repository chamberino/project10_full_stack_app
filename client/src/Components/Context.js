import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    // if a an 'authenticatedUser' cookie exists, then state is set to it's value
    // Otherwise the value of authenticatedUser is null and a user will have to sign-in to view
    // private routes
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    courses: [],
    coursetest: {}
  };

  constructor() {
    super();
    this.data = new Data();
  }

  // Pass the Provider's value prop an actions object 
  // to store event handlers and actions that will be performed on data. 
  // These methods are passed down through context.

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,

      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        update: this.update,
        delete: this.DeleteCourse,
        getCourses: this.getCourses,
        getCourse: this.getCourse,
        getAuthor: this.getAuthor
      },
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  signIn = async (emailAddress, password) => {
    // signIn takes a username and password credentials 
    // to call the getUser() method in Data.js
    // If credentials are valid the returned value will be an object 
    // containing the authenticated users data or will remain null upon failure
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: {user, password: password},
          courses: []
        };
      });
      // Set cookie named authenticatedUser with js-cookie
      // The second arg specifies the value to store in the cookie
      // The third arg is optional and can take in various options
      // Below the expiry property is set to a value of 1, which means
      // the cookie will expire after a day
      Cookies.set('authenticatedUser', JSON.stringify(this.state.authenticatedUser), {expires: 1});
    }
    return user;
  }

  signOut = () => {
    // signOut is an event handler triggered by the sign out link in the Header
    // Once fired, the authenticatedUser state is set to null and the cookie is removed.
    this.setState(() => { 
      return {
        authenticatedUser: null,
      }
    });
    Cookies.remove('authenticatedUser')
  }

  getAuthor = async (id) => {
    const user = await this.data.getAuthor(id);
    return user;
  }

  upDateCourse = async (title, description, estimatedTime=null, materialsNeeded=null, courseId) => {
    const update = await this.data.upDate(title, description, estimatedTime, materialsNeeded, courseId);
    return update;
  }

  CreateCourse = async (title, description, estimatedTime=null, materialsNeeded=null) => {
    const newCourse = await this.data.create(title, description, estimatedTime, materialsNeeded);
    return newCourse;
  }

  DeleteCourse = async (courseId, credentials) => {
    const deleteCourse = await this.data.delete(courseId, credentials)
    return deleteCourse;
  }

  getCourses = async () => {
    const courses = await this.data.getCourses()
    return courses;
  }

  getCourse = async (id) => {
    const course = await this.data.getCourse(id)
    this.setState(() => { 
      return {
        coursetest: course,
      }
    });
    return course;
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
