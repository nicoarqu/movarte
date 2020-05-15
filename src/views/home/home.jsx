import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
// import sketch from "../../components/p5/sketchExample";
import poseSketch from '../../components/p5/poseDetector';

class SketchExampleApp extends Component {
  constructor() {
    super();
    this.state = {
      color: [Math.random() * 255, Math.random() * 255, Math.random() * 255],
    };
    this.randomColor = this.randomColor.bind(this);
  }

  randomColor() {
    this.setState({
      color: [Math.random() * 255, Math.random() * 255, Math.random() * 255],
    });
  }

  render() {
    return (
      <div>
        <P5Wrapper sketch={poseSketch}></P5Wrapper>
      </div>
    );
  }
}

export default SketchExampleApp;
