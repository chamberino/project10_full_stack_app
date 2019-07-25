import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import axios from 'axios';
import withContext from '../Context';
import CourseDetailContainer from './CourseDetailContainer';
import UpdateCourse  from '../UpdateCourse';
import NotFound from '../NotFound';
import DeleteCourse from '../DeleteCourse';

const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailContainerWithContext = withContext(CourseDetailContainer);
const DeleteCourseWithContext = withContext(DeleteCourse);


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
      course: {},
      courseURL: props.match.url,
      loading: true,
      authenticatedUser: props.context.authenticatedUser.user.id,
      context: props.context.actions.delete
    };
  }
  
  componentDidMount() {
    // {/* componentDidMount is called immediately after a component is loaded to the DOM so if you need to load external data right when a component gets mounted to the DOM, this is a good place */}
    this.getCourse()
  }
  
  getCourse = () => {
    axios.get(`http://localhost:5000/api${this.state.courseURL}`)
      .then(response => {
        this.setState({
          courseCreatorId: response.userId,
          course: response.data,
          loading: false,
          html: <Route exact path="/courses/:id" render= {({match})=><CourseDetailContainerWithContext courseCreatorId={this.state.courseCreatorId} authenticatedUserId={this.state.authenticatedUser} course={this.state.course} updateLink={this.state.courseURL} match={match}/> } /> 
        })
      })
      .catch(error => {
          error.status = 400;
          this.setState({
            error: error.response.data.message,
            loading: false,
            html: <Route path="/courses/:id" render= {() => <p>{ error.response.data.message }</p>  } />
          })
      });
  }

  render() {
    return (    
      <div>
      <Switch>
      <Route exact path="/courses/:id/delete/" render = { ({match, history}) => <DeleteCourseWithContext match={match} history={history} courseId={this.state.course.id}/>  } />
        {
          (this.state.loading)
          ? <Route exact path="/courses/:id/update-course/" render= {() => <p>Loading...</p>  } />
          : <Route exact path="/courses/:id/update-course/" render={ ({match, history}) => (this.state.authenticatedUser !== this.state.course.userId) ?<p>Unauthorized</p> :<UpdateCourseWithContext title={'About'} match={match} history={history} course={this.state.course} cancelURL={this.state.courseURL} loading={this.state.loading} errors={this.state.error}/> } />          
        }
        {
          (this.state.loading)
          ? <Route exact path="/courses/:id" render= {() => <p>Loading...</p>  } />
          : (this.state.html)
        }
        <Route component={NotFound}/>
      </Switch>
        <div className="main-content">
        </div>
      </div>
    );
  }
}




// render() {
//   return (    
//     <div>
//     <Switch>
//       <Route exact path="/courses/create-course/" render={ ({match}) => <CreateCourse title={'About'} match={match} course={this.state.course} cancelURL={this.state.courseURL}/> } />
//       {
//         (this.state.loading)
//         ? <Route exact path="/courses/:id" render= {() => <p>Loading...</p>  } />
//         : (this.state.html)
//       }
//       {
//         (this.state.loading)
//         ? <Route exact path="/courses/:id/update-course/" render= {() => <p>Loading...</p>  } />
//         : <Route exact path="/courses/:id/update-course/" render={ ({match, history}) => <UpdateCourseWithContext title={'About'} match={match} history={history} course={this.state.course} cancelURL={this.state.courseURL}/> } />

//       }
//       <Route component={NotFound}/>
//     </Switch>
//       <div className="main-content">
//       </div>
//     </div>
//   );
// }
// }




//* <Route exact path="/courses/:id/update-course/" render={ ({match}) => <UpdateCourseWithContext title={'About'} match={match} course={this.state.course} cancelURL={this.state.courseURL}/> } /> */} */}

//* <Route exact path="/courses/:id" render= {({match})=><CourseDetailContainer course={this.state.course} updateLink={this.state.courseURL} match={match}/> } />  */}


// : <Route exact path="/courses/:id/update-course/" render={ ({match}) => <UpdateCourse title={'About'} match={match} course={this.state.course} cancelURL={this.state.courseURL}/> } />