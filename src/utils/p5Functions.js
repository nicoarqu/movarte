import tinycolor from 'tinycolor2';
import { setCircles, drawCircles } from './shapeFunctions/circles';
import { setTriangle, drawTriangle, drawMovingTriangles } from './shapeFunctions/triangles';
import { setSquares, drawSquares } from './shapeFunctions/squares';
import { setCircleChain, drawCircleChain } from "./shapeFunctions/circleChain";

const setBackground = (p, state, pose) => {
    const { leftElbow, rightElbow, leftShoulder } = pose;
    p.push();
    // background color picker
    state.background.color.r = Math.floor(leftElbow.y % 256);
    state.background.color.g = Math.floor(rightElbow.y % 256);
    state.background.color.b = Math.floor(leftShoulder.x % 256);
    state.background.tColor = tinycolor(state.background.color);
    // instruction text
    p.fill(state.background.r, state.background.g, state.background.b);
    p.pop();
}

export const p5Functions = {
    setBackground,
    setCircles,
    drawCircles,
    setTriangle,
    drawTriangle,
    setSquares,
    drawSquares,
    setCircleChain,
    drawCircleChain,
    drawMovingTriangles
}