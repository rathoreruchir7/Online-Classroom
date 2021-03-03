import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import './coursesStyles.css';
class AllCourses extends Component{
    constructor(props){
        super(props);
        this.props={
            courses: []
        }
    }

    componentDidMount()
    {
        
    }

    render()
    {
        console.log(this.props);
        const courses = this.props.courses.courses.map((item) => {
            return (
                <div className="flexItem">
                <div className="box" onClick={() => this.props.history.push(`/courses/${item._id}`)}>
                    <div className="courseTitle">Course: {item.course_name}
                    </div>
                    <div className="card-fields">Instructor: {item.instructor && item.instructor.username}
                    </div>
                    <div className="card-fields">Status:
                    </div>
                </div>
            </div>
            );
            
        });
        
        console.log(courses);
        return (
            <div className="page">
                <h1>Name of the student: {this.props.auth.user.username} </h1>
                
                <div className="row">
                        <div className="flexContainer">
                                {courses}
                        </div>
                </div>
            </div>

        );
    }

}

export default withRouter(AllCourses);