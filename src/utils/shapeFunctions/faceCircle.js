// circles in upper body points with analog colors
export const setFaceCircles = (p, state, pose) => {
    const { nose, leftEye, rightEye } = pose;
    const colors = state.triangle.tColor.splitcomplement();
    p.push();
    // every 2 seconds
    if (p.millis() % 2000 < 15) {
        let d = p.dist(leftEye.x, leftEye.y, rightEye.x, rightEye.y);
        if (state.faceCircles.length > 3) state.faceCircles.pop();
        state.faceCircles.unshift({
            x: nose.x,
            y: nose.y,
            radius: Math.floor(Math.random() * d / 5),
            color: colors[Math.floor(Math.random() * colors.length)],
        });
    }
    p.pop();
}

export const drawFaceCircles = (p, state) => {
    p.push();
    p.noStroke();
    state.faceCircles.forEach(circle => {
        p.fill(circle.color.toHexString());
        p.circle(circle.x, circle.y, circle.radius);
    });
    p.pop();
};