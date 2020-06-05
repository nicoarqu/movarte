export const circles = (state) => {
  const shapeSize = Math.floor((state.dist / 2) * 0.8);
  const position = state.dist / 2 - state.shapeSize / 2;
  const weight = Math.floor(0.1 * state.dist);

  return {
    name: 'circles',
    render: (p) => {
      p.noFill();
      p.stroke(state.color);
      p.strokeWeight(weight);
      for (let i = 0; i <= state.numShapes; i++) {
        p.ellipse(position, 0, shapeSize, shapeSize);
        p.rotate(state.angle);
      }
    },
  };
};
