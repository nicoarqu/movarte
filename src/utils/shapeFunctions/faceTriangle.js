export const setFaceTriangles = (p, state, pose) => {
    const { nose, rightEye, leftEye, rightEar, leftEar } = pose;
    state.faceTriangles = [];
    const triadColors = state.triangle.tColor.triad();
    state.faceTriangles.push({
        Ax: leftEye.x,
        Ay: leftEye.y,
        Bx: nose.x,
        By: nose.y,
        Cx: leftEar.x,
        Cy: leftEar.y,
        color: triadColors[0].setAlpha((p.random(85, 100) / 100)),
    });
    state.faceTriangles.push({
        Ax: rightEye.x,
        Ay: rightEye.y,
        Bx: nose.x,
        By: nose.y,
        Cx: rightEar.x,
        Cy: rightEar.y,
        color: triadColors[2].setAlpha((p.random(85, 100) / 100)),
    });
}

export const drawFaceTriangles = (p, state) => {
    p.push();
    p.noStroke();
    p.scale(1);
    state.faceTriangles.forEach((triangle) => {
        p.fill(triangle.color.toRgbString());
        p.triangle(
            triangle.Ax, triangle.Ay,
            triangle.Bx, triangle.By,
            triangle.Cx, triangle.Cy
        );
    });
    p.pop();
};
