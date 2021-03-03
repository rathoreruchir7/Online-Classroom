import React,{Component} from 'react';

class Attendance extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            attendance: [],
            name: "null",
            rollNo: "null",
            course: "null",
            professor: "null",
            username: ''
        }
    }
   componentDidMount(){
    const bearer = 'Bearer ' + localStorage.getItem('token');
    var uId = localStorage.getItem('creds');
    var unique = (JSON.parse(uId).username);
    this.setState({username: unique},() => console.log('y'));

    fetch("http://localhost:3000/" + 'attendance', {
        headers: {
            'Authorization': bearer
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
    .then((res) =>{ this.setState({attendance: res[0].attendanceData});})
    .catch((err) => console.log(err));


   }
    render(){
        const myTable = this.state.attendance.map((item) => {
            return(<tr className="tableElement">
                    <td className="tableData">{item.date}</td>
                    <td>{item.mark}</td>
                 </tr>
            );
        });
        return(
        <div  >
            <h1 className="topHeader">Your Attendance Records</h1>
            <br />
            <hr style={{width: "80%"}}/>
            {/* <div className="containerOfInfo-1">
                <div className="row-1">
                    <div><span>Name :</span><span>{this.state.name}</span></div>
                    <div><span>Roll No.: </span><span>{this.state.rollNo}</span></div>
                </div>
                <div className="row-1">
                <div><span>Course :</span><span>{this.state.course}</span></div>
                    <div><span>Professor.: </span><span>{this.state.professor}</span></div>
                </div>
            </div> */}
            <h2>{this.state.username}</h2>
            <hr style={{width: "80%"}}/>
            <table className='tableOfAttendance'>
                <th className="tableHeading">Date</th>
                <th className="tableHeading">Mark</th>
                {myTable}
            </table>
        </div>
        
        );
    }
}
export default Attendance;