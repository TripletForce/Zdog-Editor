/**Defaults.js
 * Author: Kael Pavlik
 * 
 * 
 */

const DefaultShape = {
    Ellipse: {
        type: "Ellipse",
        diameter: 20,
        stroke: 3,
    },
    Rect: {
        type: "Rect",
        width: 20,
        height: 20,
        stroke: 3,
    },
    RoundedRect: {
        type: "RoundedRect",
        width: 20,
        height: 20,
        cornerRadius: 5,
        stroke: 3,
    },
    Polygon: {
        type: "Polygon",
        radius: 13,
        sides: 5,
        stroke: 3,
    },
    Sphere: {
        type: "Shape",
        stroke: 15,
    },
    Hemisphere: {
        type: "Hemisphere",
        diameter: 20,
        stroke: false,
    },
    Cone: {
        type: "Cone",
        diameter: 20,
        length: 20,
        stroke: false,
    },
    Cylinder: {
        type: "Cylinder",
        diameter: 20,
        length: 20,
        stroke: false,
    },
    Box: {
        type: "Box",
        width: 20,
        height: 20,
        depth: 20,
    }
}

const GameShowColors = [
    "264653","2a9d8f","e9c46a","f4a261","e76f51"
]

const BrightColors = [
    "fb5607","ff006e","8338ec","3a86ff"
]



//Basic shapes for initial scene.
const DefaultScene = [
    {
        type: "Ellipse",
        diameter: 20,
        translate: { z: 10 },
        stroke: 5,
        //color: '#636',
    },
    {
        type: "Rect",
        width: 20,
        height: 20,
        translate: { z: -10 },
        stroke: 3,
        //color: '#E62',
        fill: true,
    }
];



//Chooses a random color from a pallete
//Always be a different color from the last
let pallete = BrightColors;
//Chooses at random
const randomColor = () => {
    let selection = Math.floor(Math.random() * (pallete.length));
    let color = pallete[selection];
    return "#" + color
}
