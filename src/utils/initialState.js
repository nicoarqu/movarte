import tinycolor from "tinycolor2";

// state with stored user info
export let state = {
    background: {
        color: { r: 255, g: 255, b: 255 },
        tColor: tinycolor({ r: 255, g: 255, b: 255 }),
    },
    armLines: {
        left: [],
        right: [],
        colorL: tinycolor({ r: 255, g: 255, b: 255 }),
        colorR: tinycolor({ r: 255, g: 255, b: 255 }),
    },
    squares: [],
    faceTriangles: [],
    triangle: {
        color: { r: 255, g: 255, b: 255 },
        tColor: tinycolor({ r: 255, g: 255, b: 255 }),
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
    dist1: 58,
    dist2: 72,
    dist3: 86,
    dist4: 100,
    dist5: 160,
};