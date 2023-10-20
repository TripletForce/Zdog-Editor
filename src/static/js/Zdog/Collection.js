/* Collection.js
 * Author: Kael Pavlik
 * 
 * Responsible for handling all Zdog elements as well as implementing
 * JSON save/load, render modes, and id all elements.
 */

class Collection {
    //________________________________Class Variables________________________________//
    //The list of Zdog elements, with ghost color as the key (hex) and the oject as the value
    ZdogElements = {};

    //Children of the illo element
    children = [];
    

    
    //________________________________Scene Functions________________________________//
    //Constructs the scene
    constructor(illo){
        this.illo = illo;

        //Set up illo. Scene will always reference the collection, and 
        //source will reference whichever group to add it too.
        this.scene = this;
        this.source = new Zdog.Anchor({
            addTo: illo,
        })
        
        //Creates the identifier for selected objects
        this.cursor = new Cursor(illo);

        //Set up default scene
        DefaultScene.forEach(v => new Element(v, this));
        illo.updateRenderGraph();
    }

    //Updates the scene by rotating the world in ways that keeps the illusions.
    update(){
        this.source.rotate.set( this.viewRotation );
        this.cursor.setRotation( this.viewRotation );
        this.illo.updateRenderGraph();
    }



    //________________________________Viewing Modes________________________________//
    //Used for viewing the scene
    EditorMode(){
        if(this.cursorWasVisible || this.cursor.visible) this.cursor.show();
        else this.cursor.hide();

        let objects = this.ZdogElements;
        for(let prop in objects){
            objects[prop].EditorMode();
        }
        this.illo.updateRenderGraph();
    }

    //Used for id objects on the screen
    GhostMode(){
        this.cursorWasVisible = this.cursor.visible;
        this.cursor.hide();

        let objects = this.ZdogElements;
        for(let prop in objects){
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



    //________________________________Loading and Saving Scenes________________________________//
    saveJson(){
        return JSON.stringify(
            this.children.map(ele => ele.saveObj())
        )
    }

    loadJson(json){

    }

    reset(){
        let objects = this.ZdogElements;
        for(let prop in objects){
            objects[prop].delete()
        }
        this.update();
    }
}