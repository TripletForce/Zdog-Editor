/* ui.js
 * Author: Kael Pavlik
 * 
 * This script is responsible for updating all of the HTML and CSS features.
 */

var debug = true;

{
    "use strict";

    /*
    Adding the toggle effect to the transition element.
    Have the two icons one after the other, having the class t-1 and t-2. Then, this js will transition between them when clicked.
    Note: Currently only toggles between t-1 and next sibling.
    */
    document.querySelectorAll(".t-1").forEach(ele=>{
        ele.nextElementSibling.addEventListener("click", e=>{
            ele.classList.toggle("no_opacity");
            ele.nextElementSibling.classList.toggle("no_opacity");
        })
    })

    /*
    Brings the menu to the right click.
    Does not have anything to do with the menu selections.
    */
    let contextMenu = document.getElementById('right-click-menu');
    document.body.addEventListener('contextmenu', evt => {
        evt.preventDefault();
        contextMenu.style.top  = evt.clientY + 'px';
        contextMenu.style.left = evt.clientX + 'px';
        contextMenu.hidden = false;
        return false;
    })
    document.body.addEventListener('mousedown', evt => {
        contextMenu.hidden = true;
    }, true)
}