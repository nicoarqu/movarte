import ml5 from 'ml5';

let canvas;
let video;
let poseNetModel;
let pose;
let alto;
let ancho;

function modelLoaded() {
    console.log('poseNet ready');
}

function gotPoses(poses) {
    // console.log(poses);
    if (poses.length > 0) {
        pose = poses[0].pose;
    }
}

export default function zonas(p) {
    p.setup = () => {
        alto = Math.round(p.windowHeight * 0.8);
        ancho = alto * 4 / 3;
        console.log(alto, ancho);
        canvas = p.createCanvas(ancho, alto);
        video = p.createCapture(p.VIDEO);
        video.size(ancho, alto);
        video.hide();
        poseNetModel = ml5.poseNet(video, modelLoaded);
        poseNetModel.on('pose', gotPoses);
        p.angleMode(p.DEGREES);
        p.rectMode(p.CENTER);
        p.frameRate(24);
    };

    p.draw = () => {
        if (canvas) {
            p.translate(video.width, 0);
            p.scale(-1, 1);
            p.image(video, 0, 0, ancho, alto);

            if (pose) {
                let eyeR = pose.rightEye;
                let eyeL = pose.leftEye;
                let dist = p.dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);

                let r = p.random(30, 111);
                let g = p.random(90, 151);
                let b = p.random(180, 241);

                let d = Math.round(dist / (alto / 333));
                // zona 1
                if (d >= 10 && d <= 15) {
                    p.push();
                    p.background(r, g, b, 120);
                    p.pop();
                }
                else {
                    p.push();
                    let textX = Math.round((eyeR.x + eyeL.x) / 2);
                    let textY = Math.round((eyeR.y + eyeL.y) / 2);
                    p.fill(r, g, b);
                    p.circle(textX, textY, d);
                    p.pop();
                }
                p.push();
                let textX = Math.round((eyeR.x + eyeL.x) / 2);
                let textY = Math.round((eyeR.y + eyeL.y) / 2);
                p.fill(r, g, b);
                p.textSize(150);
                p.text(d, textX, textY);
                p.pop();

            }
        }
    };
}

/* zona 1: entre  10 y 25
zona 2: 25 - 60
zona 3: 60 - 200 */