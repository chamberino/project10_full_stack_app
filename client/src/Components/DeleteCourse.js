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
    this.deleteCourse().then(()=>{this.props.history.push('/');})
  }

  deleteCourse = async () => {
    await this.state.deleteCourse(this.state.courseId, this.state.credentials)
  }

  render() {
    return null
  }
}