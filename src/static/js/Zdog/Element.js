/* Element.js
 * Author: Kael Pavlik
 *
 * A wrapper class for all Zdog objects. All of the modify, save, and 
 * load features are implemented in this class.
 * 
 * Inorder to save the object: attributes is JSONifiable.
 * Just as a note: there is a reason why I did not just 
 * modify the origional class or extend it. (Expansion of roles)
 */
class Element{

    children = []

    get translate(){
        return this.source.translate;
    }
    set translate(v){
        this.source.translate = v;
        if(this.selected) this.scene.cursor.setPosition( v );
    }

    get rotate(){
        return this.source.rotate;
    }
    set rotate(v){
        this.source.rotate = v;
    }

    //Upacks the data into the class.
    constructor(attributes, parent){
        //Copy attributes 
        this.attributes = Object.assign({}, attributes)

        //Unpack Info
        this.type = this.attributes.type;
        this.scene = parent.scene;
        this.parent = parent;
        this.attributes.addTo = parent.source;
        delete this.attributes.type;
        
        //Defaults
        this.attributes.color = this.attributes.color || randomColor();
        
        //Ghost Color
        this.ghostColor = parent.getGhostColor();
        parent.ZdogElements[this.ghostColor] = this;

        //Add the source into the scene
        this.source = new Zdog[this.type](this.attributes);
        parent.children.push(this);
    }

    //Used for id object on the screne.
    GhostMode(){
        this.latestColor = this.source.color;
        this.source.color = this.ghostColor;
    }

    //Color in viewport.
    EditorMode(){
        this.source.color = this.latestColor || this.source.color;
    }

    //Called when Element is clicked.
    OnSelect(){
        this.scene.cursor.setPosition(this.translate);
        this.scene.cursor.show();
        this.selected = true;
    }

    delete(){
        delete this.scene.ZdogElements[this.ghostColor];
        let i = this.parent.children.indexOf(this);
        this.parent.children.splice(i, 1);
        this.source.remove();
        this.scene.update();
    }

    saveObj(){
        return this.attributes
    }
}