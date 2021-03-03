import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
const $ = require('jquery');

class OnlineAttendance extends Component{
    constructor(props){
        super(props);
        this.state={
            isAuthenticated: false,
            isAdmin: false,
            username: '',
            count: 0
        }
        this.streamCamVideo = this.streamCamVideo.bind(this);
        this.endSession = this.endSession.bind(this);
        this.setState = this.setState.bind(this);
    }


componentDidMount(){
    var x = localStorage.getItem('token');
    var credential = localStorage.getItem('creds');
        if(x!=null)
    {
        var uniqueId = credential.username;
      this.setState({isAuthenticated: true,username: uniqueId}, () => console.log(this.state));
    }
     
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
         var checkIn=0;   
      setInterval(function(){
        
        var c = document.getElementById("myCanvas");
       var ctx = c.getContext("2d");
       ctx.drawImage(video, 0, 0, 1280,720);
    
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
        url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_01&returnRecognitionModel=false&detectionModel=detection_01&returnFaceAttributes=age,gender,headPose",

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
          checkIn=checkIn+1;
          
        },
        error: function () {
          console.log("no");
        },
    });
    
      },5000); 
 };       
})
      .catch(function(err) {
        console.log(err);
      }); // always check for errors at the end.

      
 }
 endSession(event){
     var newDate = new Date();
     const bearer = 'Bearer ' + localStorage.getItem('token');
    console.log(JSON.stringify({username: this.state.rollNo,password: this.state.password}));
    fetch( "http://localhost:3000/" + 'attendance', {
        method: 'POST',
        headers: { 
            'Authorization': bearer,
            'Content-Type':'application/json',
    },
        body: JSON.stringify({date: newDate,mark: "Present"}),
    
    })
    .then(response => {
        console.log(response);
        if (response.ok) {
            console.log(response);
           alert('Your attendance has been marked');
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            alert('Your attendance has been marked');
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
                console.log(response);
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
                alert('Your attendance has been marked');
            }
        })
        .catch(error => console.log('post'));
    
        event.preventDefault();
 }

render(){
    if(this.state.isAuthenticated)
    {
        
        return(<div>
            <h1>Online Streaming</h1>
            <br />
            <button onClick={this.streamCamVideo}>Start streaming</button>   
         <button onClick={this.endSession}>End the Session</button>
            <video id="video" width="500" height="500" autoPlay muted></video>
            <div id='header2'></div>
             
             {/* <img id="output" ></img> */}
        
         <canvas id="myCanvas" width="1920" height="1080"></canvas>
      </div>);
    }
    else{
        return(
            <div>please authorize...</div>
        )
    }
  
}


}

export default OnlineAttendance;