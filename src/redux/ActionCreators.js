import * as ActionTypes from './ActionTypes';

/*================ ATTENDANCE MARKS =====================================*/
export const fetchAttendanceMarks = () => (dispatch) => {
    console.log("This is when you are inside of me");
    dispatch(attendanceMarksLoading(true));
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch("http://localhost:3000/" + 'attendanceMarks', {
        headers: {
            'Authorization': bearer,
            'Content-Type':'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
                console.log(response);
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then((resp) =>{
        console.log("This is from the redux side-" + resp[0].marks);
          var num= parseFloat(resp.marks);
          var numFixed = num.toFixed(2);
          dispatch(addAttendanceMarks(resp.marks));
        })
        .catch((err) => console.log(err));
}

export const attendanceMarksLoading = () => ({
    type: ActionTypes.ASSIGNMENT_MARKS_LOADING
})

export const attendanceMarksFailed = (errMess) => ({
    type: ActionTypes.ATTENDANCE_MARKS_FAILED,
    payload: errMess
})

export const addAttendanceMarks = (marks) => ({
    type: ActionTypes.ADD_ATTENDANCE_MARKS,
    payload: marks
})

/* ================================================ */

/* ==========================ASSIGNMENT MARKS============================= */

export const fetchAssignmentMarks = () => (dispatch) => {
    dispatch(assignmentMarksLoading(true));
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch("http://localhost:3000/" + 'assignmentMarks', {
        headers: {
            'Authorization': bearer,
            'Content-Type':'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
                console.log("hello world")
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then((resp) =>{
        console.log("This is from the redux side-" + resp[0].marks);
          var num= parseFloat(resp.marks);
          var numFixed = num.toFixed(2);
          dispatch(addAssignmentMarks(resp[0].marks));
        })
        .catch((err) => console.log(err));


}

export const assignmentMarksLoading = () => ({
    type: ActionTypes.ASSIGNMENT_MARKS_LOADING
})

export const assignmentMarksFailed = (errMess) => ({
    type: ActionTypes.ASSIGNMENT_MARKS_FAILED,
    payload: errMess
})

export const addAssignmentMarks = (numFixed) => ({
    type: ActionTypes.ADD_ASSIGNMENT_MARKS,
    payload: numFixed
}) 

/* ========================================*/

/* =========================MINOR MARKS==========================*/

export const fetchMinorMarks = () => (dispatch) => {
    dispatch(minorMarksLoading(true));
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch("http://localhost:3000/" + 'minorMarks', {
        headers: {
            'Authorization': bearer,
            'Content-Type':'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then((resp) =>{
        console.log("This is from the redux side-" + resp[0].marks);
          var num= parseFloat(resp.marks);
          var numFixed = num.toFixed(2);
          dispatch(addMinorMarks(resp[0].marks));
        })
        .catch((err) => console.log(err));


}

export const minorMarksLoading = () => ({
    type: ActionTypes.MINOR_MARKS_LOADING,

})

export const minorMarksFailed = (errMess) => ({
    type: ActionTypes.MINOR_MARKS_FAILED,
    payload: errMess
})

export const addMinorMarks = (marks) => ({
    type: ActionTypes.ADD_MINOR_MARKS,
    payload: marks
})

/* ========================================*/

/*================AUTH FUNCTIONALITY==================*/
export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds, history) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))
    console.log(JSON.stringify(creds));
    return fetch('http://localhost:3000/' + 'users/login', {
        method: 'POST',
        headers: { 
        
            'Content-Type':'application/json',
    },
        body: JSON.stringify(creds),
    
    })
    .then(response => {
        console.log(response);
        if (response.ok) {
            console.log(response);
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            
            dispatch(receiveLogin(response));
            history.push('/dashboard')
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    
    dispatch(receiveLogout())
}
/*----------------------------------------------------------------------*/

/*=====================COURSES=======================*/
export const fetchCourses = () => (dispatch) => {
    dispatch(coursesLoading());
    console.log("in the fetch courses function");
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch("http://localhost:3000/" + 'courses', {
        headers: {
            'Authorization': bearer,
            'Content-Type':'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
                console.log(response);
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then((resp) =>{
        console.log("This is from the redux side-" + resp);
          dispatch(addCourses(resp));
        })
        .catch((err) => console.log(err));

} 

export const coursesLoading = () => ({
    type: ActionTypes.COURSES_LOADING
})

export const coursesFailed = (errMess) => ({
    type: ActionTypes.COURSES_FAILED,
    payload: errMess
})

export const addCourses = (courses) => ({
    type: ActionTypes.ADD_COURSES,
    payload: courses
})



/*===================================================*/