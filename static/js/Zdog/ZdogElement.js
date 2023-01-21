/* ModShape.js
 * Author: Kael Pavlik
 *
 * A wrapper class for all Zdog objects. All of the modify, save, and 
 * load features are implemented in this class.
 * 
 * Inorder to save the object: attributes is JSONifiable.
 */
class ZdogElement{

    get translate(){
        return this.shape.translate;
    }
    set translate(v){
        this.shape.translate = v;
        if(this.selected) this.scene.cursor.setPosition( v );
    }

    get rotate(){
        return this.shape.rotate;
    }
    set rotate(v){
        this.shape.rotate = v;
    }

    //Upacks the data into the class.
    constructor(attributes, parent, scene = undefined){
        //Unpack Info
        this.type = attributes.type;
        delete attributes.type;
        attributes.addTo = parent;
        this.scene = scene || parent.scene;

        //Ghost Color
        this.ghostColor = scene.getGhostColor();
        scene.ZdogElements[this.ghostColor] = this;

        //Add the shape into the scene
        this.shape = new Zdog[this.type](attributes);
    }

    //Used for id object on the screne.
    GhostMode(){
        this.latestColor = this.shape.color;
        this.shape.color = this.ghostColor;
    }

    //Color in viewport.
    EditorMode(){
        this.shape.color = this.latestColor || this.shape.color;
    }

    //Called when Element is clicked.
    OnSelect(){
        this.scene.cursor.setPosition( this.translate );
        this.scene.cursor.show();
        this.selected = true;
    }
}