/* Context Menu
Brings the menu to the right click.
Does not have anything to do with the menu selections.
*/
{
    "use strict"

    let contextMenus = document.querySelectorAll('.context-menu');
    contextMenus.forEach(contextMenu => {
        window.addEventListener('click', evt => {
            contextMenu.hidden = true;
        }, true)
    })

    let contextMenu = document.getElementById('right-click-menu-new-objects');
    document.querySelector('.zdog-canvas').addEventListener('contextmenu', evt => {
        evt.preventDefault();
        contextMenu.style.top  = evt.clientY + 'px';
        contextMenu.style.left = evt.clientX + 'px';
        contextMenu.hidden = false;
        return false;
    })
    document.getElementById('right-click-menu-new-objects').addEventListener('click', evt => {
        if(evt.target.tagName === 'LI'){
            let type = evt.target.attributes[0].value;
            new Element(DefaultShape[type], scene);
            scene.update();
        }
    })
}