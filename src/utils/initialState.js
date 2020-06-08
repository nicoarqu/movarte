import tinycolor from "tinycolor2";

// state with stored user info
export let state = {
    background: {
        color: { r: 255, g: 255, b: 255 },
        tColor: tinycolor({ r: 255, g: 255, b: 255 }),
    },
    hatch: {
        color: { r: 255, g: 255, b: 255 },
        distance: 0
    },
    squares: [],
    triangle: {
        color: { r: 255, g: 255, b: 255 },
        tColor: tinycolor({ r: 255, g: 255, b: 255 }),
        A: { x: 0, y: 0 },
        B: { x: 0, y: 0 },
        C: { x: 0, y: 0 }
    },
    circles: [],
};
