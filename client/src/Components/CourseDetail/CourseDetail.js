import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import withContext from '../Context';
import CourseDetailContainer from './CourseDetailContainer';
import NotFound from '../NotFound';

const CourseDetailContainerWithContext = withContext(CourseDetailContainer);

/* 
  This stateful component retreives an individual course from the Course API once the component mounts. 
  A course property is set in state with a value of the retrieved course. 
  The match object is passed down from App.js allowing us to fetch individual course data
  using the url param for each course, which is the same as each courses id.

  Until the data is retreived and the component is successfully rendered, a loading state property is set to true.
  As long as this property is set to true, a loading component will be rendered 

  The course property set in state is passed along to the CourseDetailContainer component at line 70
  once the data loads and the component is able to mount.
*/

export default class CourseDetail extends Component {
  // Constructor initializes state //
  
  constructor(props) {
  // Super allows us to use the keyword 'this' inside the constructor within the context of the app class
    super();
    this.state= {
      id: props.match.params.id,
      course: {},
      courseCreator: '',
      courseURL: props.match.url,
      loading: true,
      authenticatedUser: {},
      getAuthor: props.context.actions.getAuthor
    };
  }

  componentDidMount() {
    // If user is signed in, set an authenticatedUser property with the users id. This will be sent to the 
    // CourseDetailContainer Component to determine which options will be available to the user.
    if (this.props.context.authenticatedUser) {
      this.setState({
      authenticatedUser: this.props.context.authenticatedUser.user.id 
      })
    }
    // Make a call to the API to grab the course using the url param set to the id property in state
    this.props.context.actions.getCourse(this.state.id)
      .then(course=>{
        // check for errors
        if (course.errorStatus) {
          this.props.history.push(`/notfound`);
        } else {         
          // Set state with the fetched course data, change the loading property to false, set the jsx property
          // to containe the value of the CourseDetailContainer and pass along the necessary props to display course data.
          this.setState({
            courseCreatorId: course.id,
            course: course,
            loading: false,
            jsx: <Route exact path="/courses/:id" render= {({match})=> 
              <CourseDetailContainerWithContext 
                courseCreator={this.state.courseCreator} 
                authenticatedUserId={this.state.authenticatedUser} 
                course={this.state.course} 
                match={match}/> } /> 
          })
        }
      }).then(()=>{
        // Make another call to the API to get the info for the course author
        this.state.getAuthor(this.state.course.userId)
          .then((user)=>{
            // If a user is not returned then the courseCreator property is set to 'Unknown Author'.
            // This should never happen since the API will not allow you to create a course without 
            // providing author information.
            if (!user.firstName) {
              this.setState({
                courseCreator: 'Unknown Author',
              })
              return null;
            } else {
            this.setState({
              // Set the courseCreator property then update the jsx property providing it the courseCreator value in props.
              courseCreator: `${user.firstName} ${user.lastName}`,
              jsx: <Route exact path="/courses/:id" render= {({match})=> 
              <CourseDetailContainerWithContext 
                courseCreator={this.state.courseCreator} 
                authenticatedUserId={this.state.authenticatedUser} 
                course={this.state.course} 
                updateLink={this.state.courseURL} 
                match={match}/> } /> 
            })
            }
          }).catch(()=>{
            // catch errors and push new route to History object
            this.props.history.push(`/notfound`);
          })        
      }).catch(() => {
        // catch errors and push new route to History object
        console.log()
        this.props.history.push('/error');
      })
  }

  render() {
    return (    
      <div>
      {/* Provide a loading message or render the CourseDetailContainer Component.*/}
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
