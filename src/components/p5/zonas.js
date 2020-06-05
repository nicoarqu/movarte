import ml5 from 'ml5';

let canvas;
let video;
let poseNetModel;
let pose;
let height;
let width;
let btn;

// state with stored user info
let state = {
    background: { r: 255, g: 255, b: 255 },
    hatch: { r: 255, g: 255, b: 255, distance: 0 },
    triangle: { r: 255, g: 255, b: 255, x: 0, y: 0 },
    circle: { r: 255, g: 255, b: 255, radius: 0 },
};

const modelLoaded = () => console.log('poseNet ready');

const gotPoses = (poses) => {
    // console.log(poses);
    if (poses.length > 0) { pose = poses[0].pose }
}

const screenshot = (p) => {
    setTimeout(p.saveFrames('imagen', 'png', 1, 1), 10000);
}

export default function zonas(p) {
    p.setup = () => {
        // set width, height proportional to windowHeight
        height = Math.round(p.windowHeight * 0.8);
        width = height * 4 / 3;
        // video set in canvas using user webcam
        canvas = p.createCanvas(width, height);
        video = p.createCapture(p.VIDEO);
        video.size(width, height);
        video.hide();
        // ml5 poseNet model
        poseNetModel = ml5.poseNet(video, modelLoaded);
        poseNetModel.on('pose', gotPoses);
        // canvas configuration
        p.angleMode(p.DEGREES);
        p.rectMode(p.CENTER);
        p.frameRate(24);
        // screenshot button
        btn = document.createElement("button");
        btn.textContent = "Tomar pantallazo";
        document.body.appendChild(btn);
        btn.onclick = () => screenshot(p);
    };

    p.draw = () => {
        if (canvas) {
            /* set mirrored version of video capture and canvas
            p.translate(video.width, 0);
            p.scale(-1, 1); */
            p.image(video, 0, 0, width, height);

            if (pose) {
                // pose keypoints
                const {
                    nose,
                    rightEye, leftEye,
                    rigthEar, leftEar,
                    rightShoulder, leftShoulder,
                    rightElbow, leftElbow,
                    rightWrist, leftWrist,
                    rightHip, leftHip,
                    rightKnee, leftKnee,
                    rightAnkle, leftAnkle
                } = pose;

                let shoulderDist = p.dist(rightShoulder.x, rightShoulder.y, leftShoulder.x, leftShoulder.y);
                /* background color circle
                p.fill(state.background.r, state.background.g, state.background.b);
                p.circle(100, 100, 130); */

                p.background(state.background.r, state.background.g, state.background.b, 140);

                let d = Math.round(shoulderDist / (height / 333));
                // background layer
                if (d < 60) {
                    p.push();
                    // background color picker
                    state.background.r = Math.floor(leftElbow.y % 256);
                    state.background.g = Math.floor(rightElbow.y % 256);
                    state.background.b = Math.floor(leftShoulder.x % 256);
                    // instruction text
                    p.fill(state.background.r, state.background.g, state.background.b);
                    p.stroke(3);
                    p.textSize(100);
                    p.text('Elige el color', 200, 150);
                    p.pop();
                }
                // triangle layer
                else if (d >= 60 && d < 120) {
                    p.push();
                    let pelvisX = Math.round((rightHip.x + leftHip.x) / 2);
                    let pelvisY = Math.round((rightHip.y + leftHip.y) / 2);
                    // traingle color picker
                    state.triangle.r = Math.floor(leftElbow.y % 256);
                    state.triangle.g = Math.floor(rightElbow.y % 256);
                    state.triangle.b = Math.floor(leftShoulder.x % 256);
                    p.noFill();
                    p.stroke(p.color(state.triangle.r, state.triangle.g, state.triangle.b));
                    p.strokeWeight(18);
                    p.triangle(rightShoulder.x, rightShoulder.y,
                        leftShoulder.x, leftShoulder.y,
                        pelvisX, pelvisY);
                    p.triangle(rightShoulder.x + 130, rightShoulder.y + 50,
                        leftShoulder.x + 130, leftShoulder.y + 50,
                        pelvisX + 130, pelvisY + 50);
                    p.pop();
                } // moving traignles layer
                else if (d >= 120 && d < 200) {
                    p.push();
                    p.fill(state.triangle.r, state.triangle.g, state.triangle.b);
                    for (let index = 0; index < 9; index++) {
                        let randomX = p.random(-50, 50);
                        let randomY = p.random(-80, 80);
                        p.circle(nose.x + randomX * index, nose.y + randomY * index, 100);
                    }
                    p.pop();
                }
                else { // undefined layer
                    p.push();
                    p.fill(state.triangle.r, state.triangle.g, state.triangle.b);
                    p.stroke(p.color(state.background.r, state.background.g, state.background.b));
                    p.strokeWeight(16);
                    for (let i = 10; i < 40; i += 10) {
                        let bR = p.random(-d * 0.35, d * 0.55);
                        let bX = rightEye.x - bR * i;
                        let bY = rightEye.y - bR * i;
                        p.translate(bX, bY);
                        p.triangle(leftEye.x, leftEye.y, rightEye.x, rightEye.y, nose.x, nose.y);
                    }
                    p.pop();
                }
            }
        }
    };
}