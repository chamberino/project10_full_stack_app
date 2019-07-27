import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import axios from 'axios';
import NewCourseLink from '../NewCourseLink'
import CourseContainer from './CourseContainer'

/* 
This stateful component retreives all the courses in the database once the component mounts 
A courses property is set in state with a value of the retrived courses list

Until the data is retreived and the component is successfully rendered, a loading state property is set to true
As long as this property is set to true, a loading component will be rendered 

The courses property set in state is passed along to the CourseContainer compoment at line 57
once the data loads and the component is able to mount
*/

export default class Courses extends Component {
// Constructor initializes state //

  constructor(props) {
  // Super allows us to use the keyword 'this' inside the constructor within the context of the app class
    super();
    // {/* this.state is going to be the gif data we want to display */}
    this.state= {
      courses: [],
      loading: true
    };
  }

  componentDidMount() {
    // this.getCourses()
    this.props.context.actions.getCourses()
      .then(courses=>{
        this.setState({
          courses: courses,
          loading: false
        })
      })
  }

  // getCourses = () => {
  //   axios.get('http://localhost:5000/api/courses')
  //     .then(response => {
  //       this.setState({
  //         courses: response.data,
  //         loading: false
  //       })
  //     })
  //     .catch(error => {
  //       // this.setState({
  //       //   loading: false
  //       // })
  //       console.log('Error fetching and parsing data', error);
  //     });
  // }

  render() {

    return (         
      <div>
      <Switch>
      {
        (this.state.loading)
        ? <Route exact path="/courses" render= {() => <p>Loading...</p>  } />
        : <Route exact path="/courses" render= {()=><CourseContainer data={this.state.courses}/> } />
      } 
      </Switch>
      <Route exact path="/courses/" render= {() => <NewCourseLink />} />
        <div className="main-content">
        </div>  
      </div>
    );
  }
}