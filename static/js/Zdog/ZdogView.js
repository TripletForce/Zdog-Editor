
class ZdogView extends ZdogCollection {
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
    //This function uses event listners to 
    //automatically advance to the next state.
    //After the state is changed, executeState
    //is called. The function executeState will
    //perform an action an can automatically 
    //advance to the next state if needed.
    changeStateEventListners(illo){
        
        this.state = 'ready';

        //Initialize Needed State Variables
        this.viewRotation = new Zdog.Vector();
        this.origionalPointer;
        this.origionalViewRotation;
        this.origionalObjTranform;

        new Zdog.Dragger({
            startElement: illo.element,
            onDragStart: pointer => {
                if(this.state == 'ready' && pointer.buttons == 1) this.state = 'mouseDown';
                if(this.state == 'ready' && pointer.buttons == 4 && this.selected) this.state = 'beginTransformObj';
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

    //This function uses the state to perform 
    //an action. The args are the same as dragger
    //args.
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
                    this.selected = obj;
                }
                this.state = 'ready';
                break;

            case 'beginTransformObj':
                this.origionalObjTranform = this.selected.translate;
                this.state = 'transformObj';
                break;
            
            case 'transformObj':
                let vert = new Zdog.Vector({x: moveX, y: moveY});
                vert.rotateX(-this.viewRotation.x);
                vert.rotateY(-this.viewRotation.y);
                vert.multiply(.25);
                this.selected.translate = vert.add(this.origionalObjTranform);
                break;

        }
        scene.update();
    }

    

    //________________________________Selecting Object________________________________//
    //Gets the mouse position of a click on a canvas.
    _getMousePos(evt) {
        //From: https://codepen.io/gregja/pen/rEGmGB
        // It's a very reliable algorithm to get mouse coordinates (don't use anything else)
        // it works fine on Firefox and Chrome
        // source : https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
        let rect = this.illo.element.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left) / (rect.right - rect.left) * this.illo.element.width,
            y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * this.illo.element.height
        };
    }

    //Converts a buffer to a hex value (Color) that 
    //can be used to id zdog elements.
    static _buf2hex(buffer) { 
        // buffer is an ArrayBuffer
        return '#' + [...new Uint8Array(buffer)]
            .map(x => x.toString(16).padStart(2, '0'))
            .join('');
    }

    //Gets the color the mouse clicked on in the hex
    //value.
    getMouseClickColor(evt){
        let pos = this._getMousePos(evt);
        let imageData = this.ctx.getImageData( pos.x, pos.y, 1, 1 );
        let color = ZdogView._buf2hex(imageData.data);
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




var scene = new ZdogView('.zdog-canvas')

let previous;

function animate() {
    scene.update();
    requestAnimationFrame( animate );
    //if(scene.state != previous){
    //    console.log(scene.state);
    //    previous = scene.state;
    //}
}
//animate();