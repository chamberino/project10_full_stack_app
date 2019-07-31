import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

// CourseDetailContainer Component receives props from CourseDetail and renders the jsx

const CourseDetailContainer = props => {
    return (
        <div>
            {/* check userId against authenticated UsersId to determine if edit buttons display*/}
            {
          (props.authenticatedUserId === props.course.userId)
          ? <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                        <span>
                            <Link className="button" to={`${props.match.url}/update-course`}>Update Course</Link>
                        </span>
                    <Link className="button" to={`/courses/${props.course.id}/delete-course`}>Delete Course</Link>
                    <Link className="button button-secondary" to="/courses">Return to List</Link>
                </div>
            </div>
            </div>
          : <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                        <Link className="button button-secondary" to="/courses">Return to List</Link>
                    </div>
                </div>
            </div>
        }
            <div className="bounds course--detail">
            <div className="grid-66">
                <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{props.course.title}</h3>
                <p>By {props.courseCreator}</p>
                </div>
                <div className="course--description">
                <ReactMarkdown source={props.course.description} />
                </div>
            </div>
            <div className="grid-25 grid-right">
                <div className="course--stats">
                <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <h3>{props.course.estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                    <ReactMarkdown source={props.course.materialsNeeded} />
                    </li>
                </ul>
                </div>
            </div>
            </div>
        </div>
    );
}

export default CourseDetailContainer;
