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
  A course property is set in state with a value of the retrieved courses list. 
  The match object is passed down from App.js allowing us to make a fetch individual course data
  using the url param for each course, which is the same as each courses id.

  Until the data is retreived and the component is successfully rendered, a loading state property is set to true
  As long as this property is set to true, a loading component will be rendered 

  The course property set in state is passed along to the CourseDetailContainer compoment at line 70
  once the data loads and the component is able to mount
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
      courseCreator: '',
      courseURL: props.match.url,
      loading: true,
      authenticatedUser: {},
      getAuthor: props.context.actions.getAuthor
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
          this.setState({
            courseCreatorId: course.id,
            course: course,
            loading: false,
            jsx: <Route exact path="/courses/:id" render= {({match})=> 
              <CourseDetailContainerWithContext 
                courseCreator={this.state.courseCreator} 
                authenticatedUserId={this.state.authenticatedUser} 
                course={this.state.course} 
                updateLink={this.state.courseURL} 
                match={match}/> } /> 
          })
        }
      }).then(()=>{
        this.state.getAuthor(this.state.course.userId)
          .then((user)=>{
            if (!user.firstName) {
              this.setState({
                courseCreator: 'Unknown Author',
              })
              return null;
            } else {
            this.setState({
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
            this.props.history.push('/error');
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
