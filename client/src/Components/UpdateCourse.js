import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

/* 
UpdateCourse - This component provides the "Update Course" screen by 
rendering a form that allows a user to update one of their existing courses. 
The component also renders an "Update Course" button that when clicked sends 
a PUT request to the REST API's /api/courses/:id route. 
This component also renders a "Cancel" button that returns the user to 
the "Course Detail" screen. 
*/

/* pass props to UpdateCourse Component from Course */

class UpdateCourse extends Component {


constructor(props) {
    // Super allows us to use the keyword 'this' inside the constructor within the context of the app class
        super();
        // {/* this.state is going to be the gif data we want to display */}
        this.state= {
        cancelURL: props.cancelURL,    
        match: props.match,                
        course: props.course,
        courseURL: props.match.url,
        loading: true,
        searchText: ''
        };
    }

    onSearchChange = e => {
        this.setState({  searchText: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault()
        // this.props.history.push(`/search/${this.state.searchText}`);
        this.props.onSearch(this.search.value);
        e.currentTarget.reset();
    }

  render() {
    console.log(this.state.cancelURL)
    return (
        <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <form>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder={this.state.course.title}  defaultValue={this.state.course.title}/></div>
                <p>By Change Name</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className placeholder={this.state.course.description} defaultValue={this.state.course.description} /></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder={this.state.course.estimatedTime} defaultValue={this.state.course.estimatedTime} /></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className placeholder={this.state.course.materialsNeeded} defaultValue={this.state.course.materialsNeeded} /></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='course-detail.html';">Cancel</button></div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(UpdateCourse);

// {/* <form className="search-form" onSubmit={this.handleSubmit}>
//         <input type="search" onChange={this.onSearchChange} name="search" ref={(input) => this.search = input} placeholder="Search" required=""/>
//         <button type="submit" className="search-button">
//           <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
//             <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
//             <path d="M0 0h24v24H0z" fill="none"></path>
//           </svg>
//         </button>
//       </form> */}