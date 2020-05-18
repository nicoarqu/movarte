export const simpleLines = (state) => {
  state.numSteps = randomSelectTwo()
    ? state.stepsOut
    : Number(state.stepsOut * 1.25);
  state.step = state.crystalSize / 2 / state.numSteps;
  state.start = Math.floor(Math.random(0, state.numSteps));
  state.stop = Math.floor(Math.random(state.start, state.numSteps + 1));
  state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke;
  state.numShapes = randomSelectTwo() ? state.sides : state.sides * 2;
  state.angle = 360 / state.numShapes;

  return {
    name: 'Simple Lines',
    render: (p) => {
      p.noFill();
      p.stroke(state.layerColor);
      p.strokeWeight(state.weight);
      p.push();
      //translate(width/2, height/2)
      for (let i = 0; i < state.numShapes; i++) {
        p.line(state.start * state.step, 0, state.stop * state.step, 0);
        p.rotate(state.angle);
      }
      p.pop();
    },
  };
};

const randomSelectTwo = () => {
  const rando = Math.random(1);
  return rando > 0.5 ? true : false;
};
