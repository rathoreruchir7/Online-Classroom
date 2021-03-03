const $ = require('jquery');

function makeblob (dataURL) {
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
    return new Blob([uInt8Array], {type: contentType});
}

function faceApi (imgUrl) {

    let subscriptionKey = '8ed2e59634584ec8929167db104b8914';
    let endpoint = 'https://westcentralus.api.cognitive.microsoft.com/face';

    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "true",
        "returnFaceAttributes": "headPose"
    };


    return $.ajax({
        url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_01&returnRecognitionModel=false&detectionModel=detection_01&returnFaceAttributes=age,gender",

        type: 'POST',
        processData: false,
        contentType: 'application/octet-stream',

        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },
        data: makeblob(imgUrl)
    })
}

export default faceApi;