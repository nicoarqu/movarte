export const setTriangle = (p, state, pose) => {
    const { rightShoulder, leftShoulder, rightHip, leftHip } = pose;
    state.triangle.tColor = state.background.tColor.complement();
    state.triangle.A.x = rightShoulder.x;
    state.triangle.A.y = rightShoulder.y;
    state.triangle.B.x = leftShoulder.x;
    state.triangle.B.y = leftShoulder.y;
    state.triangle.C.x = Math.round((rightHip.x + leftHip.x) / 2);
    state.triangle.C.y = Math.round((rightHip.y + leftHip.y) / 2);
}

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

export const drawMovingTriangles = (p, state, pose, d) => {
    const { rightEye, leftEye, nose } = pose;
    p.fill(state.triangle.tColor.toHexString());
    p.stroke(p.color(state.triangle.tColor.toHexString()));
    p.strokeWeight(16);
    for (let i = 10; i < 40; i += 10) {
        let bR = p.random(-d * 0.35, d * 0.55);
        let bX = rightEye.x - bR * i;
        let bY = rightEye.y - bR * i;
        p.translate(bX, bY);
        p.triangle(leftEye.x, leftEye.y, rightEye.x, rightEye.y, nose.x, nose.y);
    }
}