export const drawTriangle = (p, state, width) => {
    p.noFill();
    p.stroke(p.color(state.triangle.tColor.toHexString()));
    p.strokeWeight(Math.floor(width * 0.01));
    p.triangle(
        state.triangle.A.x, state.triangle.A.y,
        state.triangle.B.x, state.triangle.B.y,
        state.triangle.C.x, state.triangle.C.y
    );
}

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
    return circles;
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

export const drawSquares = (p, state) => {
    p.push();
    p.noStroke();
    state.squares.forEach(square => {
        p.fill(square.color.toHexString());
        p.rect(square.x, square.y, square.edge, square.edge, square.round);
    })
    p.pop();
};