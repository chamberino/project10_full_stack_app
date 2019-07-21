import { withRouter } from 'react-router-dom';
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

export default class UpdateCourse extends Component {


constructor(props) {
    // Super allows us to use the keyword 'this' inside the constructor within the context of the app class
        super();
        // {/* this.state is going to be the gif data we want to display */}
        this.state= {
        cancelURL: props.cancelURL,    
        match: props.match,
        courseId: props.match.params.id,         
        course: props.course,
        courseURL: props.match.url,
        loading: true,
        searchText: '',
        title: props.course.title,
        description: props.course.description,
        estimatedTime: props.course.estimatedTime,
        materialsNeeded: props.course.materialsNeeded,
        errors: [],
        };
    }

    // onSearchChange = e => {
    //     this.setState({  searchText: e.target.value });
    // }

    // handleSubmit = e => {
    //     e.preventDefault()
    //     // this.props.history.push(`/search/${this.state.searchText}`);
    //     this.props.onSearch(this.search.value);
    //     e.currentTarget.reset();
    // }

  render() {
    
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    console.log(this.state.courseId);
    console.log(this.props.context.authenticatedUser.emailAddress)

    return (
        <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update"
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
                        value={title}
                        className="input-title course--title--input" 
                        placeholder={title}  
                        // defaultValue={title}
                        onChange={this.change}
                        />
                    </div>
                    <p>By Change Name</p>
                  </div>
                  <div className="course--description">
                    <div>
                      <textarea 
                        id="description"  
                        name="description" 
                        value={description}
                        className="" 
                        placeholder={description} 
                        // defaultValue={description}
                        onChange={this.change} />
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
                            value='bla'
                            className="course--time--input" 
                            placeholder={estimatedTime} 
                            // defaultValue={estimatedTime}
                            onChange={this.change} />
                        </div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div>
                          <textarea 
                            id="materialsNeeded" 
                            name="materialsNeeded" 
                            value='bla'
                            className="" 
                            placeholder={materialsNeeded} 
                            // defaultValue={materialsNeeded} 
                            onChange={this.change}
                            />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick="event.preventDefault(); location.href='course-detail.html';">Cancel</button></div>           */}
              </React.Fragment>
            )}  />
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
    const courseId = this.state.courseId
    // The from variable passed to history.push(from) contains information 
    // about the pathname an unauthenticated user redirected from (via this.props.location.state). 
    // const { from } = this.props.location.state || { from: { pathname: '/authenticated' } };
    // unpack properties from state
    const { title, description, estimatedTime, materialsNeeded, } = this.state;
    
    const coursePayload = {
      title, 
      description, 
    };

    const credentials = {
      emailAddress: this.props.context.authenticatedUser.emailAddress,
      password: 'beep'
    }

    // call the signIn() function, passing in the users credentials
    // signIn returns a promise set to the users credentials or null if invalid 
    // credentials are sent
    context.data.update(coursePayload, courseId, credentials)
      .then((user) => {
        if (user === null) {
          this.setState( user.errors );
        } else {
          // context.actions.update(coursePayload, courseId, credentials)
          //   .then(() => {
          //     this.props.history.push(`/courses/${courseId}`);
          //   })
          return user
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


// {/* <form className="search-form" onSubmit={this.handleSubmit}>
//         <input type="search" onChange={this.onSearchChange} name="search" ref={(input) => this.search = input} placeholder="Search" required=""/>
//         <button type="submit" className="search-button">
//           <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
//             <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
//             <path d="M0 0h24v24H0z" fill="none"></path>
//           </svg>
//         </button>
//       </form> */}