import React, { Component } from 'react';
import Form from './Form';

/* 
UpdateCourse - This component provides the "Update Course" screen by 
rendering a form that allows a user to update one of their existing courses. 
The component also renders an "Update Course" button that when clicked sends 
a PUT request to the REST API's /api/courses/:id route. 
This component also renders a "Cancel" button that returns the user to 
the "Course Detail" screen. 
*/

/* pass props to UpdateCourse Component from Course */

export default class CreateCourseWithContext extends Component {

  constructor(props) {
    super();
  this.state= {
  title: '',    
  description: '',                
  estimatedTime: '',
  materialsNeeded: '',
  errors: [],
  searchText: ''
  };
}

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
            // elements prop is a function  which returns
            // the input fields to be used in each of the forms:
            elements={() => (
              <React.Fragment>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input 
                    id="title" 
                    name="title" 
                    type="text" 
                    className="input-title course--title--input" 
                    onChange={this.change} 
                    placeholder="Course title..." 
                    value={title}
                    // defaultValue
                     />
                </div>
                <p>By Joe Smith</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea 
                    id="description" 
                    name="description" 
                    className="" 
                    placeholder="Course description..." 
                    // defaultValue={""} 
                    value={description}
                    onChange={this.change} 
                    />
                  </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input 
                        id="estimatedTime" 
                        name="estimatedTime" 
                        type="text" 
                        className="course--time--input" 
                        onChange={this.change} 
                        // placeholder="Hours" 
                        value={estimatedTime} />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea 
                        id="materialsNeeded" 
                        name="materialsNeeded" 
                        placeholder="List materials..." 
                        onChange={this.change} 
                        // defaultValue={""} 
                        value={materialsNeeded}
                        />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
        </React.Fragment>
          )} />
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
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;
    
    // Initialize a variable named user to an object 
    // whose properties are name, user and password
    const coursePayload = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    const credentials = {
      emailAddress: this.props.context.authenticatedUser.user.emailAddress,
      password: this.props.context.authenticatedUser.password
    }

    // Create user by calling the createUser function made available through Context
    // passing in the user data.
    context.data.create(coursePayload, credentials)
    .then((response) => {
      if (response.status !== 201) {
        this.setState({ errors: response });
        this.setState({title: this.state.preservedTitle, description: this.state.preservedDescription})
      } else {
        this.setState({ errors: response });
        this.setState({title: title, description: description, estimatedTime: estimatedTime, materialsNeeded: materialsNeeded});
    
        this.props.history.push(`/courses/`);
        
        return response
        // console.log(`SUCCESS! ${emailAddress} is now signed in!`);
      }
    })
    .catch((error) => {
      console.error(error);
      // catch errors and push new route to History object
      // this.props.history.push('/error');
    });
}

  cancel = () => {
    // access the history object via props, and push the error route
    this.props.history.push('/');
  }
}