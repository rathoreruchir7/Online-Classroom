import * as ActionTypes from './ActionTypes';

export const MinorMarks = ( state={
        isLoading: true,
        errMess: null,
        marks: 0
},  action) => {
    switch(action.type) {
        case ActionTypes.ADD_MINOR_MARKS:
            return {...state, isLoading: false, errMess: null, marks: action.payload};
        case ActionTypes.MINOR_MARKS_LOADING:
            return {...state, isLoading: true, errMess: null, marks: 0};
        case ActionTypes.MINOR_MARKS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, marks: 0};
        default: 
            return state;
    }
}