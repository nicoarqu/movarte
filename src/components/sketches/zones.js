import ml5 from 'ml5';
import { p5Functions } from '../../utils/p5Functions';
import { state } from '../../utils/initialState';

let canvas;
let video;
let poseNetModel;
let pose;
let height;
let width;
let btn;

const modelLoaded = () => console.log('poseNet ready');

const gotPoses = (poses) => {
    // console.log(poses);
    if (poses.length > 0) { pose = poses[0].pose }
}

const screenshot = (p) => {
    p.push();
    p.translate(video.width, 0);
    p.scale(-1, 1);
    p.background(
        state.background.color.r, state.background.color.g, state.background.color.b
    );
    p5Functions.drawSquares(p, state);
    p5Functions.drawTriangle(p, state, width);
    p5Functions.drawCircles(p, state);
    p.saveCanvas('imagen', 'png');
    p.pop();
}

export default function zones(p) {
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

                p.background(
                    state.background.color.r, state.background.color.g, state.background.color.b, 140
                );

                let d = Math.round(shoulderDist / (height / 333));
                // background layer
                if (d < 55) {
                    p5Functions.setBackground(p, state, pose);
                }
                // mini squares
                else if (d >= 55 && d < 65) {
                    p5Functions.setSquares(p, state, pose);
                }
                // triangle layer
                else if (d >= 65 && d < 70) {
                    p.push();
                    p5Functions.drawSquares(p, state);
                    // triangle color and position picker
                    p5Functions.setTriangle(p, state, pose);
                    p5Functions.drawTriangle(p, state, width);
                    p.pop();
                } // moving circles
                else if (d >= 70 && d < 90) {
                    p.push();
                    p5Functions.drawSquares(p, state);
                    p5Functions.drawTriangle(p, state, width);
                    p5Functions.setCircles(p, state, pose, d);
                    p.pop();
                }
                else { // moving triangles layer
                    p.push();
                    p5Functions.drawSquares(p, state);
                    p5Functions.drawTriangle(p, state, width);
                    p5Functions.drawCircles(p, state);
                    p5Functions.drawMovingTriangles(p, state, pose);
                    p.pop();
                }
            }
        }
    };
}