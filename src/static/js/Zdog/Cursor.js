/**Cursor.js
 * Author: Kael Pavlik
 * 
 * Creates the cursor and gives it basic functions of manipulation.
 */
class Cursor{
    constructor(parent, cursorSize = 20){
        //Note: Since Zdog is orthographic, in order to swich the rendering order,
        //just move the cursor way out front.
        this.cursorSpace = new Zdog.Anchor({
            addTo: parent,
            translate: {z: 1000000000000}
        })
        this.cursor = new Zdog.Anchor({
            addTo: this.cursorSpace,
        })

        //Red x
        new Zdog.Shape({
            addTo: this.cursor,
            path: [ {}, {x: cursorSize} ],
            stroke: 2,
            color: "black",
        });

        //Green y
        new Zdog.Shape({
            addTo: this.cursor,
            path: [ {}, {y: -cursorSize} ],
            stroke: 2,
            color: "black",
        });
        
        //Blue z
        new Zdog.Shape({
            addTo: this.cursor,
            path: [ {}, {z: cursorSize} ],
            stroke: 2,
            color: "black",
        });

        //Red x
        new Zdog.Cone({
            addTo: this.cursor,
            translate: { x: cursorSize },
            rotate: {y: Math.PI*3/2},
            diameter: 6,
            length: 6,
            stroke: false,
            color: '#F00',
            backface: '#600',
        });

        //Green y
        new Zdog.Cone({
            addTo: this.cursor,
            translate: { y: -cursorSize },
            rotate: {x: -Math.PI*3/2},
            diameter: 6,
            length: 6,
            stroke: false,
            color: '#0F0',
            backface: '#060',
        });

        //Red x
        new Zdog.Cone({
            addTo: this.cursor,
            translate: { z: cursorSize },
            diameter: 6,
            length: 6,
            stroke: false,
            color: '#00F',
            backface: '#006',
        });

        //As a default, keep it hidden.
        this.hide();
    }

    hide(){
        this.cursor.children.forEach(v => v.visible = false);
        this.visible = false;
    }

    show(){
        this.cursor.children.forEach(v => v.visible = true);
        this.visible = true;
    }

    setRotation(rot){
        this.cursorSpace.rotate.set( rot );
    }

    setPosition(pos){
        this.cursor.translate = pos;
    }
}