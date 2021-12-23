var song = "";

scorerightWrist = 0;
scoreleftWrist = 0;

var leftWristX = 0;
var rightWristX = 0;

var leftWristY = 0;
var rightWristY = 0;
function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    classifier = ml5.poseNet(video, MdoelLoaded);
    classifier.on('pose', gotPoses);
}

function MdoelLoaded(){
    console.log("aAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaA");
}
function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");
  
    if(scoreleftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        moo = Number(leftWristY);
        decimal_remove = Math.floor(moo);
        volume = decimal_remove/500;
        document.getElementById("Volume_label").innerHTML = "Volume = " + volume;
        song.setVolume(volume);


    }
    if(scorerightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);

        if(rightWristY > 0 && rightWristY <= 100){
           document.getElementById("Speed_label").innerHTML = "Speed = 0.5x ";
            song.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY <= 200){
            document.getElementById("Speed_label").innerHTML = "Speed = 1x ";
            song.rate(1);
        }
        else if(rightWristY > 200 && rightWristY <= 300){

            document.getElementById("Speed_label").innerHTML = "Speed = 1.5x ";
            song.rate(1.5);
        }
        else if (rightWristY > 200 && rightWristY <= 300){
            document.getElementById("Speed_label").innerHTML = "Speed = 2x ";
            song.rate(2);
        }
        else{
            document.getElementById("Speed_label").innerHTML = "Speed = 2.5x ";
            song.rate(2.5);
        }
    }
}
function play(){
    song.play();
    song.setVolume(0.99999999999999999999999999999999999999999999999999999999999999999);
    song.rate();
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        scorerightWrist =  results[0].pose.keypoints[10].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
    }
}

function stop(){
  song.stop();
}
