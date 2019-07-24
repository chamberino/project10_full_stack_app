import React, { Component } from 'react';



export default class Courses extends Component {
  
  constructor(props) {
    // Super allows us to use the keyword 'this' inside the constructor within the context of the app class
      super();
      // {/* this.state contains the course data we want to display */}
      this.state= {
        courseCreatorId: props
      };
    }

    componentDidMount() {
      // console.log(this.state);
      // console.log(this.state.courseCreatorId);
    }

  render() {
    // console.log(this.state);
    // console.log(this.state.courseCreatorId);
    
    return (
      <div className="bounds">
        <div className="grid-100">
          <h1>Welcome to the Main Page</h1>
        </div>
      </div>
    );
  }
}
