import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import './coursesStyles.css';

class CourseDetail extends Component{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const course = this.props.courses.courses.filter((item) => {
            if(item._id == this.props.match.params.id)
            {
                return item;
            }
        })
        console.log(course[0]);
        return(
            <div className="page2">
                <div >
                <div>
                 <div className='flexContainer content'>
                     
                        <div className="text-in-box">
                            <div className="largeText">Course Name: {course[0] && course[0].course_name}</div>
                        </div>
                        <div className="text-in-box">
                            <div className="smallText"> Instructor: {course[0] && course[0].instructor && course[0].instructor.username}</div>
                        </div>
                 </div>
                <div className="flexContainer contentDesc">
                    <div className="text-in-box">
                        <div className="largeText">Description: </div>
                    </div>
                </div>
                </div>
                <div>
                    <div className="sideMenu">
                        h
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default withRouter(CourseDetail);