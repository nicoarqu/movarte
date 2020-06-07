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