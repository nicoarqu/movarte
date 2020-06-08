// circles in upper body points with analog colors
export const setCircles = (p, state, pose, d) => {
    const circles = [];
    const {
        rightElbow, leftElbow,
        rightWrist, leftWrist,
        rightHip, leftHip
    } = pose;
    const analogousColors = state.triangle.tColor.analogous(6, 15);
    const points = [rightWrist, leftWrist, rightHip, leftHip, rightElbow, leftElbow];
    p.push();
    p.noStroke();
    analogousColors.forEach((analog, index) => {
        p.fill(analog.toHexString());
        let radius = Math.floor(0.3 * d);
        p.circle(points[index].x, points[index].y, radius);
        circles.push({ x: points[index].x, y: points[index].y, color: analog, radius });
    });
    p.pop();
    state.circles = circles;
}

export const drawCircles = (p, state) => {
    p.push();
    p.noStroke();
    state.circles.forEach(circle => {
        p.fill(circle.color.toHexString());
        p.circle(circle.x, circle.y, circle.radius);
    })
    p.pop();
};