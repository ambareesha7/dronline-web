let pos1 = 0;
let pos2 = 0;
let pos3 = 0;
let pos4 = 0;
let element;

const elementDrag = e => {
  e = e || window.event;
  e.preventDefault();
  // calculate the new cursor position:
  pos1 = pos3 - e.clientX;
  pos2 = pos4 - e.clientY;
  pos3 = e.clientX;
  pos4 = e.clientY;
  // set the element's new position:
  element.style.top = `${(element.offsetTop - pos2)}px`;
  element.style.left = `${(element.offsetLeft - pos1)}px`;
};

const closeDragElement = () => {
  // stop moving when mouse button is released:
  document.onmouseup = null;
  document.onmousemove = null;
};

const dragMouseDown = e => {
  e = e || window.event;
  e.preventDefault();
  // get the mouse cursor position at startup:
  pos3 = e.clientX;
  pos4 = e.clientY;
  document.onmouseup = closeDragElement;
  // call a function whenever the cursor moves:
  document.onmousemove = elementDrag;
};

const subscribe = el => {
  el.addEventListener('mousedown', dragMouseDown);
  element = el;
};

const unsubscribe = el => {
  el.removeEventListener('mousedown', dragMouseDown);
  el.style.top = undefined;
  el.style = undefined;
  element = el;
};

const draggable = {
  inserted: (el, binding) => {
    pos1 = 0;
    pos2 = 0;
    pos3 = 0;
    pos4 = 0;
    if (binding.value) {
      subscribe(el);
    }
  },

  update: (el, binding) => {
    if (binding.value) {
      subscribe(el);
    } else {
      unsubscribe(el);
    }
  },

  unbind: el => {
    unsubscribe(el);
  }
};

export default draggable;
