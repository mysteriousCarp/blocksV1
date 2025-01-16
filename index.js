globalThis.count = 0
const inputUpSize = 20;
const hitboxSize = 100;
const widhtHitbox = 50;
const wiodthInput = 50;
class Block {
  constructor(tip, params, parent, blocklist) {
    this.tip = String(tip);
    this.id = 'block_' + count;
    this.params = params;
    this.parent = null;
    this.kids = [];
    this.size = 0;
    this.createBlock(tip, params, parent);
    const that = this;
    blocklist.push(that);
    count += 1;
    this.element.style.width = this.size + 'px';
  }

  createBlock(tip, params, parent) {
    if (!parent) {
      console.error("Parent element is not defined!");
      return;
    }
    this.params = params;
    this.element = document.createElement('div');
    this.element.id = this.id;
    this.element.classList.add('block');
    
    this.element.style.backgroundColor = 'rgb(' + this.getRandomInt(0, 255) + ',' + this.getRandomInt(0, 255) + ',' + this.getRandomInt(0, 255) + ')';
    parent.appendChild(this.element);
    this.makeDraggable(this.element);
    this.paramas = [];
    console.log(params, params.length);
    const elem = this.element;
    const that = this;

    for (let i = 0; i < params.length; i++) {
      console.log('a');
      const input = document.createElement('input');
      input.className = 'blockinput';
      input.style.height = inputUpSize + 'px';
      input.style.width = wiodthInput + 'px';
      input.style.position = 'absolute';
      input.style.top = 84 - inputUpSize + 'px';
      input.style.left = (wiodthInput + 19) * i + 2 + 'px';
      
      const d = { inpt: input, data: null };
      d.inpt.addEventListener("input", (event) => {
        d.data = d.inpt.value;
      });

      that.paramas.push(d);
      this.size += wiodthInput + 22;
      elem.appendChild(input);
    }
    
    this.size -= 10;
    this.element.style.width = this.size + 'px';
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  makeDraggable(element) {
    let isDragging = false;
    let offsetX, offsetY;

    element.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - element.offsetLeft;
      offsetY = e.clientY - element.offsetTop;
    });

    document.addEventListener('mouseup', (e) => {
      if (isDragging) {
        isDragging = false;
        this.detachFromParent();
        this.findAndAttachParent(e);
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        this.moveToAbsolute(this.element, e.clientX - offsetX, e.clientY - offsetY); // Абсолютное перемещение
      }
    });
  }
  /**
   * Перемещает элемент в абсолютные координаты X и Y.
   *
   * @param {HTMLElement} element - Элемент, который нужно переместить.
   * @param {number} x - Абсолютная координата X.
   * @param {number} y - Абсолютная координата Y.
   */
  moveToAbsolute(element, x, y) {
    element.style.left = x + 'px';
    element.style.top = y + 'px';
  }

  /**
   * Сдвигает элемент относительно текущего положения на dx и dy.
   *
   * @param {HTMLElement} element - Элемент, который нужно сдвинуть.
   * @param {number} dx - Относительный сдвиг по X.
   * @param {number} dy - Относительный сдвиг по Y.
   */
  moveByRelative(element, dx, dy) {
    const currentLeft = parseInt(element.style.left || 0, 10);
    const currentTop = parseInt(element.style.top || 0, 10);

    element.style.left = (currentLeft + dx) + 'px';
    element.style.top = (currentTop + dy) + 'px';
  }

  detachFromParent() {
    if (this.parent) {
      removeElementFromArray(this.parent.kids, this);
      this.parent = null;
    }
  }

  findAndAttachParent(e) {
    const that = this;
    requestAnimationFrame(function () {
      for (const block of blocks) {
        if (block.id !== that.id && block.contact(e, that.size)) {
          const parentCoords = block.getAbsoluteCoordinates();
          const rect = block.getAbsoluteCoordinates();
          that.moveByRelative(that.element, rect.x + block.size, rect.y); // Относительный сдвиг
          block.kids.push(that);
          that.parent = block;
          break;
        }
      }
    });
  }

  getAbsoluteCoordinates() {
    const rect = this.element.getBoundingClientRect();
    return { x: rect.left, y: rect.top };
  }

  contact(e, size) {
    const rect = this.element.getBoundingClientRect();

    return (e.clientX >= rect.left + hitboxSize && e.clientX <= rect.right + hitboxSize &&
      e.clientY >= rect.top && e.clientY <= rect.bottom);
  }
}
function removeElementFromArray(array, element) {
  const index = array.indexOf(element);
  if (index > -1) {
    array.splice(index, 1);
    console.log(`Элемент '${element.id}' был удалён из массива.`);
    return true;
  } else {
    console.log(`Элемент '${element.id}' не найден в массива.`);
    return false;
  }
}

let blocks = [];
const testProgram = [
  [
    { "type": "motor", "id": "AB", "power": 100 },
    { "type": "wait", "cond": "time", "time": 1000 },
    { "type": "motor", "id": "AB", "power": 0 }
  ]
];
const paramstest = {
  len: 2,
  first: { type: 'choose', data: 'ABC' },
  second: { type: 'int', data: 'get power' }
};



const parentContainer = document.getElementById('container');

// Создайте тестовые блоки
testProgram[0].forEach(params =>  {
  const newBlock = new Block(params.type, [{"pain": 1}, {"pain": 2}, {test: 3}], parentContainer, blocks);
  // blocks.push(newBlock);
});


function gLines(data, parent = null, path = []) {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].parent === parent) {
      let p = path.slice();
      p.push(data[i]);
      if (data[i].kids.length === 0) {
        result.push(p);
      } else {
        let deeper = gLines(data[i].kids, data[i], p);
        for (let j = 0; j < deeper.length; j++) {
          result.push(deeper[j]);
        }
      }
    }
  }
  return result;
}
gLines(blocks)
// params не коректен фиксить
