import ml5 from 'ml5';
import { p5Functions } from '../../utils/p5Functions';
import { state, position } from '../../utils/initialState';

let canvas;
let video;
let poseNetModel;
let pose;
let height;
let width;
let btn;
let info;

const modelLoaded = () => console.log('poseNet ready');

const gotPoses = (poses) => {
    // console.log(poses);
    if (poses.length > 0) { pose = poses[0].pose }
}

const screenshot = (p) => {
    p.push();
    p.background(
        state.background.color.r, state.background.color.g, state.background.color.b
    );
    p5Functions.drawArmLines(p, state);
    p5Functions.drawTriangle(p, state);
    p5Functions.drawCircleChain(p, state);
    p5Functions.drawFaceTriangles(p, state);
    p5Functions.drawFaceCircles(p, state);
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
        const texto = `Cargando...${'\n'}Recuerda activar tu cámara`;
        console.log(texto);
        p.push();
        p.textSize(20);
        p.textStyle(p.BOLD);
        p.fill(0);
        p.text(texto, width / 2 - 100, height / 2 - 20);
        p.pop();
        video = p.createCapture(p.VIDEO);
        video.size(width, height);
        video.hide();
        // ml5 poseNet model
        poseNetModel = ml5.poseNet(video, modelLoaded);
        poseNetModel.on('pose', gotPoses);
        // canvas configuration
        p.angleMode(p.DEGREES);
        p.rectMode(p.CENTER);
        p.frameRate(30);
        // info text
        info = document.getElementById("title");
        info.textContent = "Mueve tu cuerpo";
        // screenshot button
        btn = document.getElementById("btn-screenshot");
        btn.onclick = () => screenshot(p);
    };

    p.draw = () => {
        if (video) {
            // set mirrored version of video capture and canvas
            p.translate(video.width, 0);
            p.scale(-1, 1);
            p.image(video, 0, 0, width, height);

            if (pose) {
                // pose keypoints
                const { rightShoulder, leftShoulder } = pose;
                let shoulderDist = p.dist(rightShoulder.x, rightShoulder.y, leftShoulder.x, leftShoulder.y);

                p.background(
                    state.background.color.r, state.background.color.g, state.background.color.b, 140
                );
                let d = Math.round(shoulderDist / (height / 333));
                // background layer
                if (d < position.dist1) {
                    info.textContent = "Elige el color de fondo";
                    p5Functions.setBackground(p, state, pose);
                }
                // arm lines
                else if (d >= position.dist1 && d < position.dist2) {
                    p.push();
                    info.textContent = "Gira tus brazos";
                    p5Functions.setArmLines(p, state, pose, d);
                    p5Functions.drawArmLines(p, state);
                    p.pop();
                }
                // upper body triangle
                else if (d >= position.dist2 && d < position.dist3) {
                    info.textContent = "Mueve tu espalda";
                    p.push();
                    p5Functions.drawArmLines(p, state);
                    p5Functions.setTriangle(p, state, pose, width);
                    p5Functions.drawTriangle(p, state);
                    p.pop();
                } // moving circles
                else if (d >= position.dist3 && d < position.dist4) {
                    info.textContent = "Mueve tus brazos";
                    p.push();
                    p5Functions.drawArmLines(p, state);
                    p5Functions.drawTriangle(p, state);
                    p5Functions.setCircleChain(p, state, pose);
                    p5Functions.drawCircleChain(p, state);
                    p.pop();
                }
                else if (d >= position.dist4 && d < position.dist5) {
                    info.textContent = "Gira tu cabeza";
                    p.push();
                    p5Functions.drawArmLines(p, state);
                    p5Functions.drawTriangle(p, state);
                    p5Functions.drawCircleChain(p, state);
                    p5Functions.setFaceTriangles(p, state, pose);
                    p5Functions.drawFaceTriangles(p, state);
                    p.pop();
                }
                else {
                    info.textContent = "Dibuja con tu nariz";
                    p.push();
                    p5Functions.drawArmLines(p, state);
                    p5Functions.drawTriangle(p, state);
                    p5Functions.drawCircleChain(p, state);
                    p5Functions.drawFaceTriangles(p, state);
                    p5Functions.setFaceCircles(p, state, pose);
                    p5Functions.drawFaceCircles(p, state);
                    p.pop();
                }
            }
        } else {
            const texto = `Cargando...
            Recuerda activar tu cámara`;
            console.log(texto);
            p.push();
            p.textSize(32);
            p.fill(100);
            p.text(texto, width / 2, height / 2);
            p.pop();
        }
    };
}