// const testProgram = [
//     [
//         {"type": "motor", "id": "AB", "power": 100, },
//         {"type": "wait", "cond": "time", "time": 1000},
//         {"type": "motor", "id": "AB", "power": 0}
//     ]
// ];
// paramstest = {len: 2,
//   first: 
//     {type: 'choose',
//     data: 'ABC'},
//   second: 
//     {type: 'int',
//     data: 'get power'}}
// var currentid = 0
// var blocks = []
// function getRandomInt() {
//   return Math.floor(Math.random() * 256);
// }
// function removeElementFromArray(array, element) {
//   const index = array.indexOf(element);
//   if (index > -1) {
//       array.splice(index, 1);
//       console.log(`Элемент '${element}' был удалён из массива.`);
//       return true
//   } else {
//     return false  
//     console.log(`Элемент '${element}' не найден в массиве.`);
//   }
//   return array;
// }
// class block
// {
//   constructor(tip, params, parent)
//   {
//     this.tip = toString(tip);
//     this.id = currentid + 'cl';
//     this.params = params;
//     this.parent = parent;
//     this.createBlock(tip, params, parent);
//     blocks.push(this);
//     this.kids = [];
//     this.parent = null;

//     this.size = 100
//     this.element.style.height = this.size + 'px';
//     this.element.style.backgroundColor = 'rgb(' + getRandomInt() + ',' + getRandomInt() + ',' + getRandomInt() + ')'
//   };

//   makeDraggable(element) {
//     this.isDragging = false;
//     let offsetX, offsetY;

//     element.addEventListener('mousedown', (e) => {
//       this.isDragging = true;
//       offsetX = e.clientX - element.offsetLeft;
//       offsetY = e.clientY - element.offsetTop;
//     });

//     document.addEventListener('mouseup', (e)=> {

//       if (this.isDragging){
//         this.isDragging = false;
//         for (var i = 0; i < currentid; i++)
//         {
//           const blockz = blocks[i];
//           var d = this.id;
//           console.log(blockz)
//           console.log(e)
//           let intervalId = setInterval((e) => {
//             if ( (typeof d !== 'undefined' && typeof blockz.id !== 'undefined')) {
//                 console.log('Переменная d существует:', d);
//                 clearInterval(intervalId); // Останавливаем проверку
//                 if (this.parent != null){
//                 if (removeElementFromArray(this.parent.kids, this)){this.parent = null}

//                 }
//                 if (blockz.id != d)
//                   {

//                     if (blockz.contact(e, this.size))
//                     {
//                       var cordss = blockz.getAbsoluteCoordinates(document.body.id, blockz.id);
//                       console.log(cordss);
//                       this.element.style.left = cordss.x + this.size + 'px'
//                       this.element.style.top = cordss.y + 'px'
//                       console.log(blocks)
//                       blockz.kids.unshift(this)
//                       this.parent = blockz;
//                     }
//                   }
//             }
//         }, 100);

//       }
//     }
//     });

//     document.addEventListener('mousemove', (e) => {
//       globalThis.pos = e
//       if (!this.isDragging) return;
//       this.element.style.left = (e.clientX - offsetX) + 'px';
//       this.element.style.top = (e.clientY - offsetY) + 'px';
//     });
//   };

//   createBlock(tip, params, parent)
//   {
//     const newBlock = document.createElement('block');
//     newBlock.id = currentid + "cl";
//     newBlock.className = 'block';
//     currentid += 1;
//     this.parent.appendChild(newBlock);
//     this.makeDraggable(newBlock);
//     this.element = newBlock;
//     const tenIhitbox = document.createElement('hitbox');
//     newBlock.appendChild(tenIhitbox);
//     this.hitbox = tenIhitbox;
//     this.hitbox.id = (currentid -  1) + 'h';
//     tenIhitbox.className = 'hitbox';
//     const vvod = document.createElement('input')
//     vvod.addEventListener("input", function() {
//       this.data = this.value
//     })
//     this.element.appendChild(vvod);
//     vvod.style.height = 100 + 'px'
//     vvod.style.width = 50 + 'px'



//   };

//   getAbsoluteCoordinates(parentId, childId) {
//     // Получаем элементы по их ID
//     const parentElement = document.body;
//     const childElement = document.getElementById(childId);

//     // Если одного из элементов нет, выводим предупреждение
//     if (!parentElement || !childElement) {
//         console.warn('Элемент не найден. Проверьте правильность ID.');
//         return;
//     }

//     // Получаем координаты родительского блока
//     const parentRect = parentElement.getBoundingClientRect();

//     // Получаем координаты дочернего блока
//     const childRect = childElement.getBoundingClientRect();

//     // Вычисляем абсолютные координаты дочернего элемента относительно родителя
//     const absoluteTop = childRect.top;
//     const absoluteLeft = childRect.left;

//     // Возвращаем результат
//     return {
//         y: this.element.offsetTop,
//         x: this.element.offsetLeft
//     };
//   };

//   contact(e, msize)
//   {
//     var cords = this.getAbsoluteCoordinates(document.body.id,this.element.id);
//     cords.x += this.size * 0.75
//     cords.xp = cords.x + msize;
//     cords.yp = cords.y + this.size;
//     const mouseX = pos.clientX;
//     const mouseY = pos.clientY;
//     console.log(cords, mouseX, mouseY);
//     console.log(cords, mouseX, mouseY)
//     if ((cords.x < mouseX && mouseX < cords.xp &&  cords.y < mouseY && mouseY < cords.yp))
//     {
//         return true;
//     }
//     else
//     {
//       return false;
//     }

//     };
//   }
//     createInput()
//     {
//       this.inputs = []



//     }



// // function makeDraggable(element) {
// //     let isDragging = false;
// //     let offsetX, offsetY;

// //     element.addEventListener('mousedown', (e) => {
// //       isDragging = true;
// //       offsetX = e.clientX - element.offsetLeft;
// //       offsetY = e.clientY - element.offsetTop;
// //     });

// //     document.addEventListener('mouseup', () => {
// //       isDragging = false;
// //     });

// //     document.addEventListener('mousemove', (e) => {
// //       if (!isDragging) return;
// //       element.style.left = (e.clientX - offsetX) + 'px';
// //       element.style.top = (e.clientY - offsetY) + 'px';
// //     });
// //   }

// // function createBlock(tip, params, parent)
// // {
// //     const newBlock = document.createElement('block');
// //     newBlock.id = currentid;
// //     currentid += 1;
// //     newBlock.dataset.type = tip;
// //     newBlock.dataset.params = params;
// //     const tenIhitbox = document.createElement('hitbox')
// //     parent.appendChild(newBlock);
// //     makeDraggable(newBlock);

// // }
var count = 0
const inputUpSize = 50;
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
    blocklist.push(that)
    count += 1
    this.element.style.width = this.size + 'px';
  }

  createBlock(tip, params, parent) {
    if (!parent) {
      console.error("Parent element is not defined!");
      return;
    }
    this.params = params
    this.element = document.createElement('div');
    this.element.id = this.id;
    this.element.classList.add('block');
    
    this.element.style.backgroundColor = 'rgb(' + this.getRandomInt(0, 255) + ',' + this.getRandomInt(0, 255) + ',' + this.getRandomInt(0, 255) + ')';
    parent.appendChild(this.element);
    this.makeDraggable(this.element);
    this.paramas = []
    console.log(params, params.len)
    var elem = this.element
    const that = this;
    for (var i = 0; i < params.length; i++) {
      console.log('a')
      var input = document.createElement('input');
        input.style.height = inputUpSize + 'px';
        input.style.width = wiodthInput + 'px';
        input.style.position = 'absolute'
        input.style.top = 90 - inputUpSize + 'px'
        input.style.left =( wiodthInput + 20) * i +  'px' 
        let d = {inpt: input, data: null}
        d.inpt.addEventListener("input", (event) => {
            d.data = d.inpt.value;
           })
      that.paramas.push(d);
      this.size += wiodthInput + 20;
        elem.appendChild(input)}
    this.size -= 10
    this.element.style.width = (this.size) + 'px';
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
      if (!isDragging) return;
      element.style.left = (e.clientX - offsetX) + 'px';
      element.style.top = (e.clientY - offsetY) + 'px';
    });
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
          that.element.style.left = (parentCoords.x + block.size) + 'px';
          that.element.style.top = parentCoords.y + 'px';
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
testProgram[0].forEach(params => {
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