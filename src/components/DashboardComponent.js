import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import Progress from 'react-circle-progress-bar'
const $ = require('jquery');

 

class Dashboard extends Component{
    constructor(props)
    {
        super(props);
        this.state={
          isAuthenticated: false,
          isAdmin: false,
          username: '',
          attendanceMarks: 0,
          assignmentMarks: 0,
          minorMarks: 0,
          preMajorMarks: 0
        }
        this.hello = this.hello.bind(this);
        this.streamCamVideo= this.streamCamVideo.bind(this);
      
        
        
    }
   
   componentDidMount(){
    //  var x = localStorage.getItem('token');
     
    //  if(x!=null)
    //  {
    //    this.setState({isAuthenticated: true}, () => console.log(this.state.isAuthenticated));
    //    const bearer = 'Bearer ' + localStorage.getItem('token');
    //    var uId = localStorage.getItem('creds');
    //    var unique = (JSON.parse(uId).username);
    //    this.setState({username: unique},() => console.log('y'));
    //    fetch("http://localhost:3000/" + 'attendanceMarks', {
    //     headers: {
    //         'Authorization': bearer,
    //         'Content-Type':'application/json',
    //         },
    //     })
    //     .then(response => {
    //         if (response.ok) {
    //             return response;
    //         }
    //         else {
    //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
    //             error.response = response;
    //             throw error;
    //         }
    //     },
    //     error => {
    //         var errmess = new Error(error.message);
    //         throw errmess;
    //     })
    //     .then(response => response.json())
    //     .then((resp) =>{
    //     console.log(resp.marks);
    //       var num= parseFloat(resp.marks);
    //       var numFixed = num.toFixed(2);
    //       this.setState({attendanceMarks: numFixed},()=> console.log(numFixed));
    //     })
    //     .catch((err) => console.log(err));

    //     fetch("http://localhost:3000/" + 'assignmentMarks', {
    //       headers: {
    //           'Authorization': bearer,
    //           'Content-Type':'application/json',
    //           },
    //       })
    //       .then(response => {
    //           if (response.ok) {
    //               return response;
    //           }
    //           else {
    //               var error = new Error('Error ' + response.status + ': ' + response.statusText);
    //               error.response = response;
    //               throw error;
    //           }
    //       },
    //       error => {
    //           var errmess = new Error(error.message);
    //           throw errmess;
    //       })
    //       .then(response => response.json())
    //       .then((resp) =>{
    //         console.log(resp);
    //         var num= parseFloat(resp[0].marks);
    //         var numFixed = num.toFixed(2);
    //         this.setState({assignmentMarks: numFixed},()=> console.log(numFixed));
    //       })
    //       .catch((err) => console.log(err));

    //       fetch("http://localhost:3000/" + 'minorMarks', {
    //         headers: {
    //             'Authorization': bearer,
    //             'Content-Type':'application/json',
    //             },
    //         })
    //         .then(response => {
    //             if (response.ok) {
    //                 return response;
    //             }
    //             else {
    //                 var error = new Error('Error ' + response.status + ': ' + response.statusText);
    //                 error.response = response;
    //                 throw error;
    //             }
    //         },
    //         error => {
    //             var errmess = new Error(error.message);
    //             throw errmess;
    //         })
    //         .then(response => response.json())
    //         .then((resp) =>{
    //           console.log(resp[0]);
    //           var num= parseFloat(resp[0].marks);
    //           var numFixed = num.toFixed(2);
    //           this.setState({minorMarks: numFixed},()=> console.log(numFixed));
    //         })
    //         .catch((err) => console.log(err));

    //         var premarks = (this.state.attendanceMarks + this.state.assignmentMarks + this.state.minorMarks)/3;
    //         this.setState({preMajorMarks: premarks},() => console.log("yes"));
    //  }
      
    }
   
    hello()
   {
    this.streamCamVideo();
   }

   
  
 streamCamVideo() {
    var constraints = { audio: true, video: { width: 1280, height: 720 } };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function(mediaStream) {
        var video = document.querySelector("video");

        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
          video.play();

          var c = document.getElementById("myCanvas");
       var ctx = c.getContext("2d");
       ctx.drawImage(video, 0, 0, 1280,720);
    //    var dataURL = c.toDataURL();
    //    var img = c[0].toDataUrl("image/png");
    // var dataInBase64 = c.toDataURL('image/png').replace(/data\:image\/png;base64,/, '');
    var dataInBase64 = c.toDataURL('image/png');
    var dataURL = dataInBase64;
    
     ///////////////     
     var BASE64_MARKER = ';base64,';

     if (dataURL.indexOf(BASE64_MARKER) === -1) {
         let parts = dataURL.split(',');
         let contentType = parts[0].split(':')[1];
         let raw = decodeURIComponent(parts[1]);
         return new Blob([raw], { type: contentType });
     }
     let parts = dataURL.split(BASE64_MARKER);
     let contentType = parts[0].split(':')[1];
     let raw = window.atob(parts[1]);
     let rawLength = raw.length;
 
     let uInt8Array = new Uint8Array(rawLength);
 
     for (var i = 0; i < rawLength; ++i) {
         uInt8Array[i] = raw.charCodeAt(i);
     }
     
     var datafromMakeblob = new Blob([uInt8Array], {type: contentType});
     ////////  
     let subscriptionKey = '8ed2e59634584ec8929167db104b8914';
    let endpoint = 'https://westcentralus.api.cognitive.microsoft.com/face';

    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "true",
        "returnFaceAttributes": "headPose"
    };


       $.ajax({
        url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_01&returnRecognitionModel=false&detectionModel=detection_01&returnFaceAttributes=age,gender",

        type: 'POST',
        processData: false,
        contentType: 'application/octet-stream',

        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },
        data: datafromMakeblob,
        success: function (resp) {
          console.log(resp);
          console.log("yes");
        },
        error: function () {
          console.log("no");
        },
    });
    
  

     /////////////

    var myOutput = document.getElementById("output");
    myOutput.src = dataInBase64;
  };

            
      })
      .catch(function(err) {
        console.log(err);
      }); // always check for errors at the end.
  }

  logout(){
    localStorage.removeItem('creds');
    localStorage.removeItem('token');
    
  }
  
    render() {
      this.hello();
      const {attendanceMarks, assignmentMarks, minorMarks} = this.props;
      console.log(attendanceMarks, assignmentMarks, minorMarks);
    // this.hello();   um=nmark this function also.....
      if(this.props.auth.isAuthenticated){
        return(
          <div>
           <div className="sideMenu">
               <div className="upperBlock">
               <img src="http://localhost:3000/images/avatar.png" alt="Avatar" className="avatar"></img><br />
               <span>{this.state.username}</span>
               </div>
               
               <div className="sideLink">
                 <a className="link" href="/onlineAttendance">Online Stream</a>
               </div>
               <div className="sideLink">
                 <a className="link" href="/attendance">Attendance</a>
               </div>
               <div  className="sideLink">
                 <a className="link" href="#">Minor</a>
               </div>
               <div className="sideLink">
                 <a className="link" href="#">Assignments</a>
               </div>
               <div className="sideLink">
                 <a className="link" href="#">Pre Major Marks</a>
               </div>
               <div className="sideLink">
                 <a className="link" href="#">Study Material</a>
               </div>
               <div className="sideLink">
                 <a className="link" href='/users/login' onClick={this.logout}>Log Out</a>
               </div>
             
           </div>
           <div className="sabseUpar">
           <div className="topBar">
             <h1 style={{marginTop: '0px', marginBottom: '0px', marginLeft: "20px", fontFamily: 'Montserrat'}}>DashBoard</h1>
           </div>
          
           <div className="row">
           <div className="box">
           <Progress progress={attendanceMarks} transitionDuration={1.5} strokeWidth={8} ballStrokeWidth={22}/>
             <span>Attendance</span>
           </div>
           <div className="box">
           <Progress progress={minorMarks} transitionDuration={1.5} strokeWidth={8} ballStrokeWidth={22}/>
             <span>Minor</span>
           </div>
           </div>
           <div className='row'>
           <div className="box">
           <Progress progress={assignmentMarks} transitionDuration={1.5} strokeWidth={8} ballStrokeWidth={22}/>
             <span>Assignments</span>
           </div>
           <div className="box">
           <Progress progress={assignmentMarks} transitionDuration={1.5} strokeWidth={8} ballStrokeWidth={22}/>
             <span>Pre Major</span>
           </div>
          
           </div>
           
           </div>
           </div>
       );
      }

      else
      return(
       <div> <h1>You are not authorized</h1></div>
      );
     
      
    }
}
export default withRouter(Dashboard);