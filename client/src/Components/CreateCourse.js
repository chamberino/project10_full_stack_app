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

class CreateCourse extends Component {


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
        <h1>Create Course</h1>
        <div>
          <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
                <li>Please provide a value for "Title"</li>
                <li>Please provide a value for "Description"</li>
              </ul>
            </div>
          </div>
          <form>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." defaultValue /></div>
                <p>By Joe Smith</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className placeholder="Course description..." defaultValue={""} /></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue /></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className placeholder="List materials..." defaultValue={""} /></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button></div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateCourse);