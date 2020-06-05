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

export default function trianguloMovimiento(p) {
    p.setup = () => {
        canvas = p.createCanvas(640, 480);
        video = p.createCapture(p.VIDEO);
        video.hide();
        poseNetModel = ml5.poseNet(video, modelLoaded);
        poseNetModel.on('pose', gotPoses);
        p.angleMode(p.DEGREES);
        p.rectMode(p.CENTER);
    };

    p.draw = () => {
        if (canvas) {
            p.translate(video.width, 0);
            p.scale(-1, 1);
            p.image(video, 0, 0, video.width, video.height);
            if (pose) {
                let leftElbow = pose.leftElbow;
                let rightEye = pose.rightEye;
                let leftHip = pose.leftHip;

                let r = Math.floor((256 * leftElbow.y) / video.height);
                let g = Math.floor((256 * rightEye.y) / video.height);
                let b = Math.floor((256 * leftHip.x) / video.width);

                // console.log(leftHip.x);
                // console.log({ r, g, b });
                let color = p.color(r, g, b);

                let state = {
                    color: color,
                    weight: 20
                };


                p.push();
                p.noFill();
                p.stroke(state.color);
                p.strokeWeight(state.weight);

                p.triangle(5.5 * 30, 5.5 * 75, 5.5 * 58, 5.5 * 20, 5.5 * 86, 5.5 * 75);
                p.pop();
            }
        }
    };
}
