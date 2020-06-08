import tinycolor from 'tinycolor2';
import { setCircles, drawCircles } from './shapeFunctions/circles';
import { setTriangle, drawTriangle, drawMovingTriangles } from './shapeFunctions/triangles';
import { setSquares, drawSquares } from './shapeFunctions/squares';

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
    p.stroke(3);
    p.textSize(100);
    p.text('Elige el color', 200, 150);
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
    drawMovingTriangles
}