import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';


// The UserSignIn component is a component "with context", 
// meaning it's subscribed to the application context – 
// the data is passed to the component via a context prop.

export default class UserSignIn extends Component {

  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
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
          <p>
            Don't have a user account? <Link to="/courses/signup">Click here</Link> to sign up!
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
    // {/* initialize context variable containing the context props  */}
    const { context } = this.props;
    // unpack username and properties password from state
    const { emailAddress, password } = this.state;

    // call the signIn() function, passing in the users credentials
    // signIn returns a promise set to the users credentials or null if invalid 
    // credentials are sent
    context.actions.signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          this.setState(() => {
            return { errors: [ 'Sign-in was unsuccessful' ] };
          });
        } else {
          this.props.history.push('/authenticated');
          console.log(`SUCCESS! ${emailAddress} is now signed in!`);
        }
      })
      .catch((error) => {
        console.error(error);
        // catch errors and push new route to History object
        this.props.history.push('/error');
      });
  }

  cancel = () => {
    this.props.history.push('/');
  }
}


/*
UserSignIn - This component provides the "Sign In" screen by rendering a form 
that allows a user to sign using their existing account information. 
The component also renders a "Sign In" button that when clicked signs in the 
user and a "Cancel" button that returns the user to the default route 
(i.e. the list of courses).
*/

// export default UserSignIn;