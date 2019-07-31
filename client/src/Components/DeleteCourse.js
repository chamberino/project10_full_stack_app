import { Component } from 'react';

export default class DeleteCourseWithContext extends Component {

    constructor(props) {
    super();
    this.state= { 
    deleteCourse: props.context.actions.delete,  
    props: props,  
    courseId: props.match.params.id,  
    userId: props.context.authenticatedUser.user.id,  
    credentials: {
        emailAddress: props.context.authenticatedUser.user.emailAddress,
        password: props.context.authenticatedUser.password
      },
    }
  }

  componentDidMount() {
    // Make a DELETE request to the API and return user to the list of courses.
    this.props.context.actions.getCourse(this.state.courseId)
      .then((course)=>{
          if (course.errorStatus) {
            this.props.history.push(`/notfound`);
            return null;
          } else {
          this.setState({
            courseCreatorId: course.userId,
            foundCourse: true,
          })
        }
      }).then(()=>{
        if (!this.state.foundCourse) {
          this.props.history.push(`/notfound`);
        }
        else if (this.state.courseCreatorId !== this.state.userId) {
          this.props.history.push(`/forbidden`);
          return null;
        } else {
          this.deleteCourse(this.state.courseId, this.state.credentials)
        .then(() => {
          this.props.history.push('/');
        }).catch(()=>{
        // catch errors and push new route to History object
        this.props.history.push('/error');
        })
      }
    })
  }
  

  deleteCourse = async () => {    
    await this.state.deleteCourse(this.state.courseId, this.state.credentials)
  }

  render() {
    return null
  }
}