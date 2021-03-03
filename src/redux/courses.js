import * as ActionTypes from './ActionTypes';

export const Courses = ( state={
    courses: [],
    isLoading: true,
    errMess: null
}, action) => {
    
    switch(action.type)
    {
        case ActionTypes.ADD_COURSES:
            return ({...state, isLoading: false, errMess: null, courses: action.payload});
        
        case ActionTypes.COURSES_LOADING:
            return ({ ...state, isLoading: true, errMess: null,});
        case ActionTypes.COURSES_FAILED:
            return ({...state, isLoading: false, errMess: true });

        default: 
            return state;
    }
}