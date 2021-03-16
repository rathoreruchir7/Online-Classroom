import React, {Component} from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import UserLogin from './userLoginComponent';
import Dashboard from './DashboardComponent';
import Attendance from './AttendanceComponent';
import UserRegister from './userRegisterComponent';
import OnlineAttendance from './onlineAttendanceComponent';
import { fetchAttendanceMarks,fetchAssignmentMarks,fetchMinorMarks, fetchCourses, loginUser, logoutUser } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import AllCourses from './AllCourses';
import CourseDetail from './CourseDetail';
import Home from './HomeComponent';

const mapStateToProps = state => {
    return {
        attendanceMarks: state.attendanceMarks,
        assignmentMarks: state.assignmentMarks,
        minorMarks: state.minorMarks,
        auth: state.auth,
        courses: state.courses
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchAttendanceMarks: () => { dispatch(fetchAttendanceMarks())},
    fetchAssignmentMarks: () => {dispatch(fetchAssignmentMarks())},
    fetchMinorMarks: () => {dispatch(fetchMinorMarks())},
    loginUser: (creds, history) => dispatch(loginUser(creds, history)),
    logoutUser: () => dispatch(logoutUser()),
    fetchCourses: () => dispatch(fetchCourses()),
})
class Main extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            user: ""
        }
    }
    componentDidMount(){
        this.props.fetchAttendanceMarks();
        this.props.fetchAssignmentMarks();
        this.props.fetchMinorMarks();
        this.props.fetchCourses();
        
    }
    render()
    {
        const DashBoardPage = () => {
            return(
              <Dashboard 
                        attendanceMarks={this.props.attendanceMarks.marks} 
                          attendanceMarksLoading = {this.props.attendanceMarks.isLoading}  
                          attendanceMarksFailed = {this.props.attendanceMarks.errMess}
                          assignmentMarks={this.props.assignmentMarks.marks}
                          minorMarks={this.props.minorMarks.marks}
                          auth={this.props.auth}
                          />  
            );
        }

        return (
            <div>
                <Switch>
                    <Route exact path="/users/login" component={() => <UserLogin user={this.state.user}  loginUser={this.props.loginUser}/>} />
                    <Route exact path="/users/signup" component={UserRegister} />
                    <Route exact path='/dashboard' component={DashBoardPage} />
                    <Route exact path='/attendance' component={Attendance} />
                    <Route exact path='/onlineAttendance' component={OnlineAttendance} />
                    <Route exact path='/courses' component={(props) => <AllCourses courses={this.props.courses} auth={this.props.auth} />} />
                    <Route exact path='/courses/:id' component={() => <CourseDetail courses={this.props.courses} auth={this.props.auth} />} />
                    <Route exact path='/home' component={() => <Home />} />
                    <Redirect to="/users/login" />
                </Switch>
         
            </div>

        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

