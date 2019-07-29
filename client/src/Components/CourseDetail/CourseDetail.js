import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import withContext from '../Context';
import CourseDetailContainer from './CourseDetailContainer';
import NotFound from '../NotFound';

const CourseDetailContainerWithContext = withContext(CourseDetailContainer);


/* 
  This stateful component retreives an individual course from the Course API once the component mounts. 
  A course property is set in state with a value of the retrieved courses list. 
  The match object is passed down from App.js allowing us to make a fetch individual course data
  using the url param for each course, which is the same as each courses id.

  Until the data is retreived and the component is successfully rendered, a loading state property is set to true
  As long as this property is set to true, a loading component will be rendered 

  The course property set in state is passed along to the CourseDetailContainer compoment at line 70
  once the data loads and the component is able to mount
*/

/* 
  CourseDetail - This component provides the "Course Detail" screen by 
  retrieving the detail for a course from the REST API's /api/courses/:id 
  route and rendering the course. The component also renders a "Delete Course" 
  button that when clicked should send a DELETE request to the REST API's /api/courses/:id 
  route in order to delete a course. This component also renders an "Update Course" button 
  for navigating to the "Update Course" screen.
*/

export default class CourseDetail extends Component {
  // Constructor initializes state //
  
  constructor(props) {
  // Super allows us to use the keyword 'this' inside the constructor within the context of the app class
    super();
    // {/* this.state contains the course data we want to display */}
    this.state= {
      id: props.match.params.id,
      course: {},
      courseURL: props.match.url,
      loading: true,
      authenticatedUser: {},
      context: props.context.actions.delete
    };
  }

  componentDidMount() {
    if (this.props.context.authenticatedUser) {
      this.setState({
      authenticatedUser: this.props.context.authenticatedUser.user.id 
      })
    }
    this.props.context.actions.getCourse(this.state.id)
      .then(course=>{
        if (course.errorStatus) {
          this.props.history.push(`/not-found`);
        } else {
          console.log(course)
          this.setState({
            courseCreatorId: course.id,
            course: course,
            loading: false,
            jsx: <Route exact path="/courses/:id" render= {({match})=> 
              <CourseDetailContainerWithContext 
                courseCreatorId={this.state.courseCreatorId} 
                authenticatedUserId={this.state.authenticatedUser} 
                course={this.state.course} 
                updateLink={this.state.courseURL} 
                match={match}/> } /> 
          })
        }
      }).catch((error) => {
        console.error(error);
        // catch errors and push new route to History object
        this.props.history.push('/error');
      })
  }

  render() {
    return (    
      <div>
      <Switch>
        {
          (this.state.loading)
          ? <Route exact path="/courses/:id" render= {() => <p>Loading...</p>  } />
          : (this.state.jsx)
        }
        <Route component={NotFound}/>
      </Switch>
        <div className="main-content">
        </div>
      </div>
    );
  }
}
