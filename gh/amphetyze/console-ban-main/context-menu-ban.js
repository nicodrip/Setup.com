document.onkeydown = keyboardDown;
document.onkeyup = keyboardUp;
document.oncontextmenu = function (e) {
    var evt = new Object({ keyCode: 93 });
    stopEvent(e);
    keyboardUp(evt);
}

function stopEvent(event) {
    if (event.preventDefault != undefined)
        event.preventDefault();
    if (event.stopPropagation != undefined)
        event.stopPropagation();
}

function keyboardDown(e) {

}

function keyboardUp(e) {

}

document.onkeydown = function (e) {
    if (e.ctrlKey && e.key === 'u' || e.ctrlKey && e.key === 's') {
        e.preventDefault();
    }
};

document.onkeydown = function (e) {
    if (event.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)) {
        return false;
    }
}
