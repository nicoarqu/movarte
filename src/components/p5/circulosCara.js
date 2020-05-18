import ml5 from 'ml5';
import { circles } from '../shapes';

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

export default function circulosCara(p) {
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
        let eyeR = pose.rightEye;
        let eyeL = pose.leftEye;
        let dist = p.dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
        console.log(dist);
        console.log(Math.floor(0.7537 * dist));

        let r = p.random(256);
        let g = p.random(256);
        let b = p.random(256);
        let color = p.color(r, g, b);

        let state = {
          crystalSize: 150,
          shapeSize: 30,
          angle: 60,
          numShapes: 6,
          color: color,
          dist: dist,
        };

        if (eyeL.confidence > 0.9 && eyeR.confidence > 0.9) {
          p.push();
          p.translate(pose.nose.x, pose.nose.y);
          let circleShape = circles(state);
          circleShape.render(p);
          p.pop();
        }
      }
    }
  };
}
