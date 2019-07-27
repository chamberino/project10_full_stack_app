import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

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
    this.deleteCourse()
    this.props.history.push(`/courses/`);
  }

  deleteCourse = () => {
    this.state.deleteCourse(this.state.courseId, this.state.credentials)
  }

  render() {
    console.log(this.state.deleteCourse)

    return (
      <Redirect to="/courses" />
    );
  }
}