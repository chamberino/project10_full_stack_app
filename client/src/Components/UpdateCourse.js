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
        // preservedTitle: props.course.title, 
        // preservedDescription: props.course.description,
        cancelURL: props.cancelURL,    
        match: props.match,
        courseId: props.match.params.id,         
        course: props.course,
        courseURL: props.match.url,
        loading: true,
        searchText: '',
        // title: props.course.title,
        // description: props.course.description,
        // estimatedTime: props.course.estimatedTime,
        // materialsNeeded: props.course.materialsNeeded,
        errors: [],
        };
    }

  componentDidMount() {
    this.props.context.actions.getCourse(this.state.courseId)
      .then(course=>{
          if (course.errorStatus) {
            this.props.history.push(`/not-found`);
          } else {
          this.setState({
            title: course.title,
            description: course.description,
            preservedTitle: course.title, 
            preservedDescription: course.description,
            estimatedTime: course.estimatedTime,
            materialsNeeded: course.materialsNeeded,
            courseCreatorId: course.userId,
            course: course,
            loading: false,
            errors: []
          })
        }
      }).then(()=>{
        if(this.props.context.authenticatedUser.user.id !== this.state.courseCreatorId) {
          // Check CourseCreatorId against Authenticated User's id to verify permission to page.
          this.props.history.push('/unauthorized')
        } else {
          this.props.context.actions.getAuthor(this.state.courseCreatorId)
          .then((user)=>{
            if (!user.firstName) {
              this.setState({
                courseCreator: 'Unknown Author',
              })
              return null;
            } else {
            this.setState({
              courseCreator: `${user.firstName} ${user.lastName}`,
            })
            }
          }).catch(()=>{
            // catch errors and push new route to History object
            this.props.history.push('/error');
          }) 
        }
      }).catch((error) => {
        // catch errors and push new route to History object
        this.props.history.push('/error');
      })
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
      (this.state.loading)
      ? 'loading...'
      :
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
                        onChange={this.change}
                        />
                    </div>
                    <p>By {this.state.courseCreator}</p>
                  </div>
                  <div className="course--description">
                    <div>
                      <textarea 
                        id="description"  
                        name="description" 
                        value={description}
                        className="" 
                        placeholder={description} 
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
                            value={estimatedTime}
                            className="course--time--input" 
                            placeholder={estimatedTime} 
                            onChange={this.change} />
                        </div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div>
                          <textarea 
                            id="materialsNeeded" 
                            name="materialsNeeded" 
                            value={materialsNeeded}
                            className="" 
                            placeholder={materialsNeeded} 
                            onChange={this.change}
                            />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
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
    const { 
      title, 
      description, 
      estimatedTime, 
      materialsNeeded, 
    } = this.state;
    
    const coursePayload = {
      title, 
      description, 
      estimatedTime,
      materialsNeeded
    };

    const credentials = {
      emailAddress: this.props.context.authenticatedUser.user.emailAddress,
      password: this.props.context.authenticatedUser.password
    }

    context.data.update(coursePayload, courseId, credentials)
      .then((response) => {
        if (response.status !== 204) {
          this.setState({ errors: response });
          this.setState({title: this.state.preservedTitle, description: this.state.preservedDescription})
        } else {
          this.setState({ errors: response });
          this.setState({title: title, description: description});

          this.props.history.push(`/courses/${this.state.courseId}`);
          return response
        }        
      })
      .catch((error) => {
        // catch errors and push new route to History object
        this.props.history.push('/error');
      });      
  }

  cancel = () => {
    // access the history object via props, and push the error route
    this.props.history.push(`/courses/${this.state.courseId}`);
  }
}