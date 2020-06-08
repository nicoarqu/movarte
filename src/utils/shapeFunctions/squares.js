export const setSquares = (p, state, pose) => {
    const { rightKnee, rightHip, leftElbow } = pose;
    p.push();
    const squares = []
    const points = [rightKnee, rightHip, leftElbow];
    const triad = state.background.tColor.triad();
    points.forEach((point, index) => {
        p.fill(triad[index].toString());
        p.rect(point.x, point.y, 55, 55, 20);
        squares.push({ x: point.x, y: point.y, color: triad[index], edge: 55, round: 20 });
    });
    state.squares = squares;
    p.pop();
}

export const drawSquares = (p, state) => {
    p.push();
    p.noStroke();
    state.squares.forEach(square => {
        p.fill(square.color.toHexString());
        p.rect(square.x, square.y, square.edge, square.edge, square.round);
    })
    p.pop();
};
