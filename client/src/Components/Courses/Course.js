import React from 'react';
import { Link } from 'react-router-dom';

/* 
  Course component receives props from CoursesContainer
  The props passed down in CoursesContainer from Courses is mapped over returning 
  this Course component for each course in the courses array returned from the API
*/

const Course = props => (
  <div className="grid-33"><Link className="course--module course--link" to={'/courses/' + props.id}>
          <h4 className="course--label">Course</h4>
          <h3 className="course--title">{props.title}</h3>
    </Link></div>
);

export default Course;

