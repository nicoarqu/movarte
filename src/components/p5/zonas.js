import ml5 from 'ml5';

let canvas;
let video;
let poseNetModel;
let pose;

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
        canvas = p.createCanvas(640, 480);
        video = p.createCapture(p.VIDEO);
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
            p.image(video, 0, 0, video.width, video.height);

            if (pose) {
                let eyeR = pose.rightEye;
                let eyeL = pose.leftEye;
                let dist = p.dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
                // zona 1
                if (dist >= 10 && dist <= 25) {
                    let r = p.random(30, 91);
                    let g = p.random(90, 131);
                    let b = p.random(180, 241);
                    p.push();
                    p.background(r, g, b, 120);
                    p.pop();
                }


                /* let textX = Math.round((eyeR.x + eyeL.x) / 2);
                let textY = Math.round((eyeR.y + eyeL.y) / 2);
                p.textSize(64);
                p.text(Math.round(dist), textX, textY); */

            }
        }
    };
}

/* zona 1: entre  10 y 25
zona 2: 25 - 60
zona 3: 60 - 200 */