import React from 'react';
import Course from './Course'

/* 
This component receives its props from Courses 
The data is mapped over returning an array of Course components with props available
for each courses containing the respective data
*/

const CourseContainer = (props) => {
    let courses = props.data.map( (result) => { 
      // For each course received in props, return a Course component with relevant data
      return <Course title={result.title} id={result.id} key={result.id}/>
    });
    return(
        <div className="course-list">
            {courses}
        </div>
    ); 
  }

  export default CourseContainer;