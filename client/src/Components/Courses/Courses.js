import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import NewCourseLink from '../NewCourseLink'
import CourseContainer from './CourseContainer'

/* 
This stateful component retreives all the courses in the database once the component mounts. 
A courses property is set in state with a value of the retrived courses list.

Until the data is retreived and the component is successfully rendered, a loading state property is set to true
As long as this property is set to true, a loading message will be rendered. 
*/

export default class Courses extends Component {
// Constructor initializes state //

  constructor(props) {
  // Super allows us to use the keyword 'this' inside the constructor within the context of the app class
    super();
    this.state= {
      courses: [],
      loading: true
    };
  }

  componentDidMount() {
    // Make a call to the API to get all the courses in the DB.
    this.props.context.actions.getCourses()
    // Set value of returned courses to the courses property in state. Change loading property to false.
      .then(courses=>{
        this.setState({
          courses: courses,
          loading: false
        })
      }).catch(()=>{
        // catch errors and push new route to History object
        this.props.history.push('/error');
      })
  }

  render() {

    return (         
      <div className="course-list-container">
      <Switch>
      {/* Ternary operator determined whether to display loading message or render CourseContainer Component */}
      {
        (this.state.loading)
        ? <Route exact path="/courses" render= {() => <p>Loading...</p>  } />
        : <Route exact path="/courses" render= {()=><CourseContainer data={this.state.courses}/> } />
      } 
      </Switch>
      {/* The NewCourseLink is set outside Switch so that it will always render even if no courses are available */}
      <Route exact path="/courses/" render= {() => <NewCourseLink />} />
        <div className="main-content">
        </div>  
      </div>
    );
  }
}