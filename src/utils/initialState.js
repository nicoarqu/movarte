import tinycolor from "tinycolor2";

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const initColorRandom = { r: getRndInteger(0, 256), g: getRndInteger(0, 256), b: getRndInteger(0, 256) };

// state with stored user info
export let state = {
    background: {
        color: initColorRandom,
        tColor: tinycolor(initColorRandom),
    },
    armLines: {
        left: [],
        right: [],
        colorL: tinycolor(initColorRandom),
        colorR: tinycolor(initColorRandom),
    },
    squares: [],
    faceTriangles: [],
    triangle: {
        color: initColorRandom,
        tColor: tinycolor(initColorRandom),
        A: { x: 0, y: 0 },
        B: { x: 0, y: 0 },
        C: { x: 0, y: 0 },
        stroke: 1,
    },
    circles: [],
    circleChain: {
        leftE: [],
        rightE: [],
        leftW: [],
        rightW: [],
    },
    faceCircles: [],
};

export let position = {
    dist1: 62,
    dist2: 70,
    dist3: 85,
    dist4: 120,
    dist5: 200,
};