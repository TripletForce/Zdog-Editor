/**View.js
 * Author: Kael Pavlik
 * 
 * This class exends a collection of ZdogElements and adds
 * UI events to manipulate the elements. This class uses a
 * state machine to handle UI events.
 */
class View extends Collection {


    //Initializes the illustration element and state machine
    constructor(canvas){
        let illo = new Zdog.Illustration({
            element: canvas,
            zoom: 4,
        });
        super(illo);
        this.illo = illo;

        this.ctx = illo.element.getContext('2d');

        this.changeStateEventListners(illo);
    }

    //________________________________State Machine________________________________//
    //This function uses event listners to automatically advance to the next state.
    //After the state is changed, executeState is called. The function executeState will
    //perform an action an can automatically advance to the next state if needed.
    changeStateEventListners(illo){
        
        this.state = 'ready';

        //Initialize Needed State Variables
        this.viewRotation = new Zdog.Vector();
        this.origionalPointer;
        this.origionalViewRotation;
        this.origionalObjTranform;
        this.selectedElement;

        new Zdog.Dragger({
            startElement: illo.element,
            onDragStart: pointer => {
                if(this.state == 'ready' && pointer.buttons == 1) this.state = 'mouseDown';
                if(this.state == 'ready' && pointer.buttons == 4 && this.selectedElement) this.state = 'beginTransformObj';
                this.executeState( pointer );
            },
            onDragMove: ( pointer, moveX, moveY ) => {
                if(this.state == 'mouseDown') this.state = 'orbit';
                this.executeState( pointer, moveX, moveY );
            },
            onDragEnd: () => {
                if(this.state == 'mouseDown') this.state = 'selectObj';
                if(this.state == 'orbit') this.state = 'ready';
                if(this.state == 'transformObj') this.state = 'ready';
                this.executeState();
            },
        });
    }

    //This function uses the state to perform an action. The args are the same as dragger args.
    executeState(pointer, moveX, moveY){
        switch(this.state){

            case 'mouseDown':
                this.origionalPointer = pointer;
                this.origionalViewRotation = new Zdog.Vector(this.viewRotation);
                break;

            case 'orbit':
                let moveRX = moveY / this.illo.width * Zdog.TAU * -1;
                let moveRY = moveX / this.illo.width * Zdog.TAU * -1;
                this.viewRotation.x = this.origionalViewRotation.x + moveRX;
                this.viewRotation.y = this.origionalViewRotation.y + moveRY;
                break;

            case 'selectObj':
                let obj = this.getClickedObject(this.origionalPointer);
                if(obj != undefined) {
                    obj.OnSelect();
                    this.selectedElement = obj;
                }
                else {
                    if(this.selectedElement) {
                        this.selectedElement.selected = false;
                        this.selectedElement = undefined;
                    }
                    this.cursor.hide();
                }
                this.state = 'ready';
                break;

            case 'beginTransformObj':
                this.origionalObjTranform = this.selectedElement.translate;
                this.state = 'transformObj';
                break;
            
            case 'transformObj':
                let vert = new Zdog.Vector({x: moveX, y: moveY});
                vert.rotateX(-this.viewRotation.x);
                vert.rotateY(-this.viewRotation.y);
                vert.multiply(.25);
                this.selectedElement.translate = vert.add(this.origionalObjTranform);
                break;

            case 'deleteObj':
                console.warn("not implemented");
                break;
        }
        this.update();
    }



    //________________________________Selecting Object________________________________//
    //Gets the mouse position of a click on a canvas.
    getMousePos(evt) {
        //From: https://codepen.io/gregja/pen/rEGmGB
        let rect = this.illo.element.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left) / (rect.right - rect.left) * this.illo.element.width,
            y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * this.illo.element.height
        };
    }

    //Converts a buffer to a hex value (Color) that can be used to id zdog elements.
    static buf2hex(buffer) { 
        // buffer is an ArrayBuffer
        return '#' + [...new Uint8Array(buffer)]
            .map(x => x.toString(16).padStart(2, '0'))
            .join('');
    }

    //Gets the color the mouse clicked on in the hex value.
    getMouseClickColor(evt){
        //From: https://codepen.io/gregja/pen/rEGmGB
        let pos = this.getMousePos(evt);
        let imageData = this.ctx.getImageData( pos.x, pos.y, 1, 1 );
        let color = View.buf2hex(imageData.data);
        return color;
    }

    //Gets the clicked object or undefined if no obects.
    getClickedObject(evt){
        this.GhostMode();
        let selectedGhostColor = this.getMouseClickColor(evt);
        this.EditorMode();
        return this.ZdogElements[selectedGhostColor];
    }
}