import React, { Component } from 'react';
import Data from './Data';

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: null
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
        signIn: this.signIn
      }
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
          authenticatedUser: user,
        };
      });
    }
    return user;
  }

  signOut = () => {

  }
}

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
