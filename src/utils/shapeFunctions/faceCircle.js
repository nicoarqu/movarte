// circles in upper body points with analog colors
export const setFaceCircles = (p, state, pose) => {
    const { nose, leftEye, rightEye } = pose;
    const colors = state.triangle.tColor.analogous(10, 15);
    p.push();
    // every 2 seconds
    if (p.millis() % 500 < 50) {
        let d = p.dist(leftEye.x, leftEye.y, rightEye.x, rightEye.y);
        if (state.faceCircles.length > 10) state.faceCircles.pop();
        const clr = colors[Math.floor(Math.random() * colors.length)];
        const radius = Math.floor(p.random(40, 100) * d / 100);
        state.faceCircles.unshift({
            x: nose.x,
            y: nose.y,
            radius: radius,
            color: clr.setAlpha(Math.random()),
        });
    }
    p.pop();
}

export const drawFaceCircles = (p, state) => {
    p.push();
    p.noStroke();
    state.faceCircles.forEach(circle => {
        p.fill(circle.color.toRgbString());
        p.circle(circle.x, circle.y, circle.radius);
    });
    p.pop();
};