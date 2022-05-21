dstatus = "";
objects = [];
function setup() {
    canvas = createCanvas( 600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    


}

function start() {
    objectDetector  = ml5.objectDetector('cocossd', modaloaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input1= document.getElementsById("input").value; 
}

function modaloaded() {
    console.log("Modal Loaded");
    dstatus = true;
}
function draw() {
image(video, 0, 0, 600, 500);
    if(dstatus != ""){
        objectDetector.detect(video, gotResults);
        for(i = 0;i < objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            console.log(objects.length);
            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == input){
                video.stop();
                object_Detector.detect(gotResults);
                document.getElementById("object_found").innerHTML = input1+" Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input1+ "Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_found").innerHTML = input1+ " Not Found";
            }
        }
    }
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}
