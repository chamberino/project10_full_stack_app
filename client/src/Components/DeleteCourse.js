import { Component } from 'react';

export default class DeleteCourseWithContext extends Component {

    constructor(props) {
    super();
    this.state= { 
    deleteCourse: props.context.actions.delete,  
    props: props,  
    courseId: props.match.params.id,    
    credentials: {
        emailAddress: props.context.authenticatedUser.user.emailAddress,
        password: props.context.authenticatedUser.password
      },
    }
  }

  componentDidMount() {
    // Make a DELETE request to the API and return user to the list of courses.
    this.deleteCourse(this.state.courseId, this.state.credentials)
      .then(() => {
        this.props.history.push('/');
      }).catch(()=>{
      // catch errors and push new route to History object
      this.props.history.push('/error');
    })
  }

  deleteCourse = async () => {    
    await this.state.deleteCourse(this.state.courseId, this.state.credentials)
  }

  render() {
    return null
  }
}