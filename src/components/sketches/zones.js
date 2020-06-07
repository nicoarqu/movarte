/* eslint-disable no-unused-vars */
import ml5 from 'ml5';
import tinycolor from "tinycolor2";
import { circles, simpleLines } from '../shapes';
import { drawTriangle } from "../../utils/p5Functions";

let canvas;
let video;
let poseNetModel;
let pose;
let height;
let width;
let btn;

// state with stored user info
let state = {
    background: {
        color: { r: 255, g: 255, b: 255 },
        tColor: tinycolor({ r: 255, g: 255, b: 255 }),
    },
    hatch: {
        color: { r: 255, g: 255, b: 255 },
        distance: 0
    },
    triangle: {
        color: { r: 255, g: 255, b: 255 },
        tColor: tinycolor({ r: 255, g: 255, b: 255 }),
        A: { x: 0, y: 0 },
        B: { x: 0, y: 0 },
        C: { x: 0, y: 0 }
    },
    circle: {
        color: { r: 255, g: 255, b: 255 },
        radius: 0
    },
};

const modelLoaded = () => console.log('poseNet ready');

const gotPoses = (poses) => {
    // console.log(poses);
    if (poses.length > 0) { pose = poses[0].pose }
}

const screenshot = (p) => {
    setTimeout(p.saveFrames('imagen', 'png', 1, 1), 10000);
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
                if (d < 58) {
                    p.push();
                    // background color picker
                    state.background.color.r = Math.floor(leftElbow.y % 256);
                    state.background.color.g = Math.floor(rightElbow.y % 256);
                    state.background.color.b = Math.floor(leftShoulder.x % 256);
                    state.background.tColor = tinycolor(state.background.color);
                    // instruction text
                    p.fill(state.background.r, state.background.g, state.background.b);
                    p.stroke(3);
                    p.textSize(100);
                    p.text('Elige el color', 200, 150);
                    p.pop();
                }
                // triangle layer
                else if (d >= 58 && d < 70) {
                    p.push();
                    // triangle color and position picker
                    state.triangle.tColor = state.background.tColor.complement();
                    // color asociado rgb
                    state.triangle.A.x = rightShoulder.x;
                    state.triangle.A.y = rightShoulder.y;
                    state.triangle.B.x = leftShoulder.x;
                    state.triangle.B.y = leftShoulder.y;
                    state.triangle.C.x = Math.round((rightHip.x + leftHip.x) / 2);
                    state.triangle.C.y = Math.round((rightHip.y + leftHip.y) / 2);
                    drawTriangle(p, state, width);
                    p.pop();
                } // moving triangles layer
                else if (d >= 70 && d < 200) {
                    p.push();
                    drawTriangle(p, state, width);
                    for (let index = 0; index < 9; index++) {
                        let randomX = p.random(-50, 50);
                        let randomY = p.random(-80, 80);
                        p.circle(nose.x + randomX * index, nose.y + randomY * index, 100);
                    }
                    p.pop();
                }
                else { // undefined layer
                    p.push();
                    drawTriangle(p, state, width);
                    p.fill(state.triangle.tColor.toHexString());
                    p.stroke(p.color(state.triangle.tColor.toHexString()));
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