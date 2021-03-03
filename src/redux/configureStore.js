import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { AttendanceMarks } from './attendanceMarks';
import { AssignmentMarks } from './assignmentMarks';
import { MinorMarks } from './minorMarks';
import {Courses} from './courses';
import { Auth } from './auth';


export const configureStore = () => {
    const store = createStore(
        combineReducers({
            attendanceMarks: AttendanceMarks,
            assignmentMarks: AssignmentMarks,
            minorMarks: MinorMarks,
            auth: Auth,
            courses: Courses
        }),
        applyMiddleware(thunk,logger)
    );

    return store;
}