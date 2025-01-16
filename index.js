function checkSquaresIntersection(square1, square2) {
  // Функция для проверки, находится ли точка внутри прямоугольника (не квадрата)
  function isPointInsideRect(point, rect) {
    const [x, y] = point;
    const xMin = Math.min(rect[0][0], rect[1][0], rect[2][0], rect[3][0]);
    const xMax = Math.max(rect[0][0], rect[1][0], rect[2][0], rect[3][0]);
    const yMin = Math.min(rect[0][1], rect[1][1], rect[2][1], rect[3][1]);
    const yMax = Math.max(rect[0][1], rect[1][1], rect[2][1], rect[3][1]);

    return x >= xMin && x <= xMax && y >= yMin && y <= yMax;
  }


  // Проверяем, находится ли хотя бы одна точка одного квадрата внутри другого квадрата
  for (const point of square1) {
      if (isPointInsideRect(point, square2)) {
          return true;
      }
  }
  for (const point of square2) {
      if (isPointInsideRect(point, square1)) {
          return true;
      }
  }
  

    // Проверка, пересекаются ли стороны
  function linesIntersect(line1Start, line1End, line2Start, line2End) {
    const x1 = line1Start[0];
    const y1 = line1Start[1];
    const x2 = line1End[0];
    const y2 = line1End[1];
    const x3 = line2Start[0];
    const y3 = line2Start[1];
    const x4 = line2End[0];
    const y4 = line2End[1];

    const det = (x2 - x1) * (y4 - y3) - (y2 - y1) * (x4 - x3);
    if (det === 0) {
      return false; // Параллельны
    }

    const t = ((x3 - x1) * (y4 - y3) - (y3 - y1) * (x4 - x3)) / det;
    const u = -((x1 - x2) * (y3 - y1) - (y1 - y2) * (x3 - x1)) / det;
    return t >= 0 && t <= 1 && u >= 0 && u <= 1;
  }


   function checkSidesIntersection(square1, square2) {
      const sides1 = [
        [square1[0], square1[1]],
        [square1[1], square1[2]],
        [square1[2], square1[3]],
        [square1[3], square1[0]]
      ];
      const sides2 = [
          [square2[0], square2[1]],
        [square2[1], square2[2]],
        [square2[2], square2[3]],
        [square2[3], square2[0]]
      ];

      for (const side1 of sides1) {
          for (const side2 of sides2) {
              if (linesIntersect(side1[0], side1[1], side2[0], side2[1]))
                return true;
            }
      }
       return false;
    }
  

    return checkSidesIntersection(square1,square2)

}

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
        this.moveToAbsolute(e.clientX - offsetX, e.clientY - offsetY); // Абсолютное перемещение
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
  moveToAbsolute(x, y) {
    this.element.style.left = x + 'px';
    this.element.style.top = y + 'px';
    console.log(this.getAbsoluteCoordinates())
  }

  /**
   * Сдвигает элемент относительно текущего положения на dx и dy.
   *
   *  - Элемент, который нужно сдвинуть.
   * @param {number} dx - Относительный сдвиг по X.
   * @param {number} dy - Относительный сдвиг по Y.
   */
  moveByRelative(dx, dy) {
    const currentLeft = parseInt(this.element.style.left || 0, 10);
    const currentTop = parseInt(this.element.style.top || 0, 10);

    this.element.style.left = (currentLeft + dx) + 'px';
    this.element.style.top = (currentTop + dy) + 'px';
  }

  detachFromParent() {
    if (this.parent) {
      removeElementFromArray(this.parent.kids, this);
      this.parent = null;
    }
  }
  /**
   * 
   * @param {Block} block 
   */
  connect(block) {
    const parentCoords = block.getAbsoluteCoordinates();
          this.moveToAbsolute(parentCoords.x, parentCoords.y)
          this.moveByRelative(block.size, 0); // Относительный сдвиг
          block.kids.push(this);
          this.parent = block;
  }
  findAndAttachParent(e) {
    const that = this;
    requestAnimationFrame(function () {
      for (const block of blocks) {
        if (block.id !== that.id && block.contact(block, e)) {
          that.connect(block)
          break;
        }
      }
    });
  }
/**
 * 
 * @returns {{x: number, y: number}}
 */
  getAbsoluteCoordinates() {
    const rect = this.element.getBoundingClientRect();
    return { x: rect.left, y: rect.top };
  }
/**
 * 
 * @param {Block} block 
 * @returns {boolean}
 */
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
  newBlock.moveToAbsolute(count * 100, count * 250)
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
