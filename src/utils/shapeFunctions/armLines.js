export const setArmLines = (p, state, pose, d) => {
    const { leftWrist, rightWrist, leftElbow, rightElbow } = pose;
    const split = state.background.tColor.splitcomplement();
    if (state.armLines.left.length > 15) state.armLines.left.pop();
    state.armLines.left.unshift({
        x1: leftWrist.x,
        y1: leftWrist.y,
        x2: leftElbow.x,
        y2: leftElbow.y,
        weight: d * 0.1,
        color: split[1],
    });
    if (state.armLines.right.length > 15) state.armLines.right.pop();
    state.armLines.right.unshift({
        x1: rightWrist.x,
        y1: rightWrist.y,
        x2: rightElbow.x,
        y2: rightElbow.y,
        weight: d * 0.1,
        color: split[2],
    });
    p.line(rightWrist.x, rightWrist.y, rightElbow.x, rightElbow.y);
};

export const drawArmLines = (p, state) => {
    p.push();
    state.armLines.left.forEach(line => {
        p.strokeWeight(line.weight);
        p.stroke(line.color.toRgbString());
        p.line(line.x1, line.y1, line.x2, line.y2);
        p.rotate(-7);
    });
    p.pop();
    p.push();
    state.armLines.right.forEach(line => {
        p.strokeWeight(line.weight);
        p.stroke(line.color.toRgbString());
        p.line(line.x1, line.y1, line.x2, line.y2);
        p.rotate(7);
    });
    p.pop();
};