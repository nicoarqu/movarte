import ml5 from 'ml5';

let canvas;
let video;
let poseNetModel;
let pose;
let alto;
let ancho;
let btn;

let state = {
    background: { r: 255, g: 255, b: 255 },
    triangle: { r: 255, g: 255, b: 255 },
};

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
        btn = document.createElement("button");
        btn.textContent = "start recording";
        document.body.appendChild(btn);
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
                const {
                    rightShoulder, leftShoulder,
                    rightWrist, leftWrist,
                    rightElbow, leftElbow,
                    rightHip, leftHip,
                    rightEye, leftEye,
                    rigthEar, leftEar,
                    nose } = pose;
                let shoulderDist = p.dist(rightShoulder.x, rightShoulder.y, leftShoulder.x, leftShoulder.y);

                p.fill(state.background.r, state.background.g, state.background.b);
                p.circle(100, 100, 130);

                p.push();
                /* p.fill(255, 130, 0);
                p.stroke(3);
                p.textSize(150);
                // eje x
                p.text(Math.round(rightWrist.y), rightWrist.x, rightWrist.y);
                p.text(Math.round(leftWrist.y), leftWrist.x, leftWrist.y); */
                p.pop();

                p.background(state.background.r, state.background.g, state.background.b, 140);

                let d = Math.round(shoulderDist / (alto / 333));
                // zona 1
                if (d < 75) {
                    p.push();
                    state.background.r = Math.floor(leftElbow.y % 256);
                    state.background.g = Math.floor(rightElbow.y % 256);
                    state.background.b = Math.floor(leftShoulder.x % 256);

                    p.fill(state.background.r, state.background.g, state.background.b);
                    p.stroke(3);
                    p.textSize(100);
                    p.text('Elige el color', 200, 150);
                    p.pop();
                }
                // zona 2 al centro
                else if (d >= 75 && d < 120) {
                    p.push();
                    let pelvisX = Math.round((rightHip.x + leftHip.x) / 2);
                    let pelvisY = Math.round((rightHip.y + leftHip.y) / 2);

                    state.triangle.r = Math.floor(leftElbow.y % 256);
                    state.triangle.g = Math.floor(rightElbow.y % 256);
                    state.triangle.b = Math.floor(leftShoulder.x % 256);
                    p.noFill();
                    p.stroke(p.color(state.triangle.r, state.triangle.g, state.triangle.b));
                    p.strokeWeight(18);
                    p.triangle(rightShoulder.x - 100, rightShoulder.y - 300,
                        leftShoulder.x - 100, leftShoulder.y - 300,
                        pelvisX - 100, pelvisY - 300);
                    p.triangle(rightShoulder.x + 130, rightShoulder.y + 50,
                        leftShoulder.x + 130, leftShoulder.y + 50,
                        pelvisX + 130, pelvisY + 50);
                    p.pop();
                } // zona 3 más cerca
                else if (d >= 120 && d < 200) {
                    p.push();
                    p.fill(state.background.r, state.background.g, state.background.b);
                    p.circle(nose.x + 100, nose.y + 100, 100);
                    p.circle(nose.x - 190, nose.y - 140, 100);
                    p.pop();
                }
                else {
                    p.push();
                    p.fill(state.background.r, state.background.g, state.background.b);
                    p.circle(leftWrist.x, leftWrist.y, 100);
                    p.circle(rightWrist.x, rightWrist.y, 100);
                    p.pop();
                }
                /* p.push();
                let textX = Math.round((rightShoulder.x + leftShoulder.x) / 2);
                let textY = Math.round((rightShoulder.y + leftShoulder.y) / 2);
                p.fill(state.background.r, state.background.g, state.background.b);
                p.stroke(3);
                p.textSize(150);
                p.text(d, textX, textY);
                p.pop();
 */
            }
        }
    };
}