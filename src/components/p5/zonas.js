import ml5 from 'ml5';

let canvas;
let video;
let poseNetModel;
let pose;
let alto;
let ancho;
let state;

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

        state = { r: 255, g: 255, b: 255 };
    };

    p.draw = () => {
        if (canvas) {
            /* p.translate(video.width, 0);
            p.scale(-1, 1); */
            p.image(video, 0, 0, ancho, alto);

            p.fill(255);
            p.stroke(3);
            p.textSize(40);
            p.text('y ' + alto, ancho - 180, alto - 100);
            p.text('x ' + ancho, ancho - 230, alto - 60);

            if (pose) {
                let eyeR = pose.rightShoulder;
                let eyeL = pose.leftShoulder;
                let eyeDist = p.dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);

                p.fill(state.r, state.g, state.b);
                p.circle(100, 100, 130);

                // ver posición de muñecas
                let WristR = pose.rightWrist;
                let WristL = pose.leftWrist;
                p.push();
                /* p.fill(255, 130, 0);
                p.stroke(3);
                p.textSize(150);
                // eje x
                p.text(Math.round(WristR.y), WristR.x, WristR.y);
                p.text(Math.round(WristL.y), WristL.x, WristL.y); */
                p.pop();

                p.background(state.r, state.g, state.b, 140);

                let d = Math.round(eyeDist / (alto / 333));
                // zona 1
                if (d < 60) {
                    p.push();
                    state.r = Math.floor(pose.leftElbow.y % 256);
                    state.g = Math.floor(pose.rightElbow.y % 256);
                    state.b = Math.floor(pose.leftShoulder.x % 256);

                    p.fill(state.r, state.g, state.b);
                    p.stroke(3);
                    p.textSize(100);
                    p.text('Elige el color', 200, 150);
                    p.pop();
                }
                else {
                    p.push();
                    let textX = Math.round((eyeR.x + eyeL.x) / 2);
                    let textY = Math.round((eyeR.y + eyeL.y) / 2);
                    p.fill(state.r, state.g, state.b);
                    p.circle(pose.leftWrist.x, pose.leftWrist.y, 130);
                    p.circle(pose.rightWrist.x, pose.rightWrist.y, 130);
                    p.pop();
                }
                p.push();
                let textX = Math.round((eyeR.x + eyeL.x) / 2);
                let textY = Math.round((eyeR.y + eyeL.y) / 2);
                /* p.fill(state.r, state.g, state.b);
                p.stroke(3);
                p.textSize(150);
                p.text(d, textX, textY); */
                p.pop();

            }
        }
    };
}

/* zona 1: entre  10 y 15
zona 2: 15 - 60
zona 3: 60 - 150 */