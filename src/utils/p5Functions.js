import tinycolor from 'tinycolor2';
import { setCircles, drawCircles } from './shapeFunctions/circles';
import { setTriangle, drawTriangle } from './shapeFunctions/triangles';
import { setSquares, drawSquares } from './shapeFunctions/squares';
import { setCircleChain, drawCircleChain } from "./shapeFunctions/circleChain";
import { setFaceCircles, drawFaceCircles } from "./shapeFunctions/faceCircle";
import { setArmLines, drawArmLines } from "./shapeFunctions/armLines";
import { setFaceTriangles, drawFaceTriangles } from "./shapeFunctions/faceTriangle";

const setBackground = (p, state, pose) => {
    const { leftElbow, rightElbow, leftShoulder } = pose;
    state.background.color.r = Math.floor(leftElbow.y % 256);
    state.background.color.g = Math.floor(rightElbow.y % 256);
    state.background.color.b = Math.floor(leftShoulder.x % 256);
    state.background.tColor = tinycolor(state.background.color);
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
    setFaceCircles,
    drawFaceCircles,
    setArmLines,
    drawArmLines,
    setFaceTriangles,
    drawFaceTriangles,
}