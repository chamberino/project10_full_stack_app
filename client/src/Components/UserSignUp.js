import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {

  // initialize state with properties that will store the value from the form input fields
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="sign-in-up centered signin">
          <h1>Sign Up</h1>
          {/* Make props available to Form */}
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            // elements prop is a function  which returns
            // the input fields to be used in each of the forms:
            elements={() => (
              <React.Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  value={firstName} 
                  onChange={this.change} 
                  placeholder="First Name" />
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  value={lastName} 
                  onChange={this.change} 
                  placeholder="Last Name" />    
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="emailAddress"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />                  
              </React.Fragment>              
            )} />
            
          
        </div>
        <div className="grid-33 centered signin new">
            <p className="test">
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
          </div>
      </div>
      
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    // Data is passed to the component via a prop named context. 
    // Destructuring is used to extract the value from props. 
    const { context } = this.props;
    // Destructuring is used to

    // unpack the name, username and password properties from 
    // the state object (this.state) into distinct variables
    const {
      firstName,
      lastName,
      emailAddress,
      password
    } = this.state;

    
    // Initialize a variable named user to an object 
    // whose properties are name, user and password
    const user = {
      firstName,
      lastName,
      emailAddress,
      password
    };

    // Create user by calling the createUser function made available through Context
    // passing in the user data.
    context.data.createUser(user)
      .then( errors => {
        // Check to see if errors exist
        // The value returned from createUser is an object with the users credentials
        // or an object containing error messages and the status code.
        // If there are any errors, they will be set to a messages property
        if (errors.length) {
          // if any error messages, set the error state to the value of the errors
          this.setState({ errors });
        } else {
          context.actions.signIn(emailAddress, password)
          .then( () => {
            this.props.history.push('/authenticated')
          }).catch((err)=>{
            this.props.history.push('/error'); // push to history stack
          })
        }
      })
      .catch((err) => {
        // access the history object via props, and push the error route
        this.props.history.push('/error'); // push to history stack
      });
  }

  cancel = () => {
    // access the history object via props, and push the error route
    this.props.history.push('/');
  }
}
