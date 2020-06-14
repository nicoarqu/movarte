// circles in upper body points with analog colors
export const setCircleChain = (p, state, pose) => {
    const { rightElbow, leftElbow, rightWrist, leftWrist, } = pose;
    const { tColor } = state.triangle;
    const analogousColors = tColor.spin(90).analogous(6, 15);
    p.push();
    p.noStroke();
    // por cada codo, quitar ultimo elemento, agregar nuevo con random color o radio
    if (state.circleChain.leftE.length > 10) state.circleChain.leftE.pop();
    state.circleChain.leftE.unshift({
        x: leftElbow.x,
        y: leftElbow.y,
        radius: p.random(8, 40),
        color: analogousColors[Math.floor(Math.random() * analogousColors.length)],
    });
    if (state.circleChain.rightE.length > 10) state.circleChain.rightE.pop();
    state.circleChain.rightE.unshift({
        x: rightElbow.x,
        y: rightElbow.y,
        radius: p.random(8, 40),
        color: analogousColors[Math.floor(Math.random() * analogousColors.length)],
    });
    if (state.circleChain.leftW.length > 10) state.circleChain.leftW.pop();
    state.circleChain.leftW.unshift({
        x: leftWrist.x,
        y: leftWrist.y,
        radius: p.random(8, 40),
        color: analogousColors[Math.floor(Math.random() * analogousColors.length)],
    });
    if (state.circleChain.rightW.length > 10) state.circleChain.rightW.pop();
    state.circleChain.rightW.unshift({
        x: rightWrist.x,
        y: rightWrist.y,
        radius: p.random(8, 40),
        color: analogousColors[Math.floor(Math.random() * analogousColors.length)],
    });
    p.pop();
}

export const drawCircleChain = (p, state) => {
    p.push();
    p.noStroke();
    state.circleChain.leftE.forEach(circle => {
        p.fill(circle.color.toHexString());
        p.circle(circle.x, circle.y, circle.radius);
    });
    state.circleChain.rightE.forEach(circle => {
        p.fill(circle.color.toHexString());
        p.circle(circle.x, circle.y, circle.radius);
    });
    state.circleChain.leftW.forEach(circle => {
        p.fill(circle.color.toHexString());
        p.circle(circle.x, circle.y, circle.radius);
    });
    state.circleChain.rightW.forEach(circle => {
        p.fill(circle.color.toHexString());
        p.circle(circle.x, circle.y, circle.radius);
    });
    p.pop();
};