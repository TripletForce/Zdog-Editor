{
    "use strict"
    
    /* Resizing Zdog Canvas
    The canvas must be resized by pixel values to prevent stretching. By setting
    the parent to resize to a custom percentage and setting the canvas to the parent
    size, a custom canvas width can be achived.
    */
    let canvas = document.querySelector('.zdog-canvas');
    let parent = canvas.parentElement;
    let resize = evt => {
        scene.illo.setSize(parent.clientWidth, parent.clientHeight);
        scene.update();
    }
    window.onload = resize;
    addEventListener("resize", resize);
}