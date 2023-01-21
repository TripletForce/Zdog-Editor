/* ZdogCollection.js
 * Author: Kael Pavlik
 * 
 * Responsible for handling all Zdog elements as well as implementing
 * JSON save/load, render modes, and id all elements.
 */

class ZdogCollection {
    //________________________________Class Variables________________________________//
    //Basic shapes for initial scene.
    _DefaultScene = [
        // circle
        {
            type: "Ellipse",
            diameter: 20,
            translate: { z: 10 },
            stroke: 5,
            color: '#636',
        },
        // square
        {
            type: "Rect",
            width: 20,
            height: 20,
            translate: { z: -10 },
            stroke: 3,
            color: '#E62',
            fill: true,
        }

    ];

    //The list of Zdog elements, with ghost color as the key (hex) and the oject as the value
    ZdogElements = {};



    //________________________________Scene Functions________________________________//
    //Constructs the scene
    constructor(illo){
        this.illo = illo;

        //Set up illo
        this.world = new Zdog.Anchor({ //The Zdog object to add the scene to.
            addTo: illo,
        })
        
        //Set up cursor
        this.cursor = new Cursor(illo);

        //Set up default scene
        let scene = this;
        this._DefaultScene.forEach(v => new ZdogElement(v, this.world, scene));
        illo.updateRenderGraph();
    }

    //Updates the scene by rotating the world in ways that keeps the illusions.
    update(){
        this.world.rotate.set( this.viewRotation );
        this.cursor.setRotation( this.viewRotation );
        this.illo.updateRenderGraph();
    }



    //________________________________Viewing Modes________________________________//
    //Used for viewing the scene
    EditorMode(){
        if(this.cursorWasVisible || this.cursor.visible) this.cursor.show();
        else this.cursor.hide();

        let objects = this.ZdogElements;
        for(const prop in objects){
            objects[prop].EditorMode();
        }
        this.illo.updateRenderGraph();
    }

    //Used for id objects on the screen
    GhostMode(){
        this.cursorWasVisible = this.cursor.visible;
        this.cursor.hide();

        let objects = this.ZdogElements;
        for(const prop in objects){
            objects[prop].GhostMode();
        }
        this.illo.updateRenderGraph();
    }

    //Used for displaying the final output image
    RenderMode(){
        this.cursorWasVisible = this.cursor.visible;
        this.cursor.hide();
    }



    //________________________________Idtentifying Objects________________________________//
    //Gets a random unique color to be used to id clicked objects
    getGhostColor(){
        this.cursor.visible = false;
        this.ghostColorIndex = this.ghostColorIndex + 1 || 1;
        let n = ((this.ghostColorIndex).toString(16)).padStart(6, '0');
        return '#' + n.slice(0, 6)+"ff";
    }
}