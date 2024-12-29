class Block {
    constructor(tip, params, parent) {
      this.tip = String(tip);
      this.id = 'block_' + Date.now(); // Простой, но не криптографически безопасный ID
      this.params = params;
      this.parent = parent;
      this.kids = [];
      this.size = 100;
      this.createBlock(tip, params, parent);
    }
  
    createBlock(tip, params, parent) {
      if (!parent) {
        console.error("Parent element is not defined!");
        return;
      }
      this.element = document.createElement('div');
      this.element.id = this.id;
      this.element.classList.add('block');
      this.element.style.height = this.size + 'px';
      this.element.style.backgroundColor = 'rgb(' + this.getRandomInt(0, 255) + ',' + this.getRandomInt(0, 255) + ',' + this.getRandomInt(0, 255) + ')';
      parent.appendChild(this.element);
      this.makeDraggable(this.element);
  
      const input = document.createElement('input');
      input.addEventListener("input", () => {
        this.params.data = input.value;
      });
      this.element.appendChild(input);
      input.style.height = '20px';
      input.style.width = '50px';
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
      for (const block of blocks) {
        if (block.id !== this.id && block.contact(e, this.size)) {
          block.kids.push(this);
          this.parent = block;
          break;
        }
      }
    }
  
    contact(e, size) {
      const rect = this.element.getBoundingClientRect();
      return (e.clientX >= rect.left && e.clientX <= rect.right &&
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
  
  // Убрали export default Block;  - это уже не нужно, так как мы не используем модули
  
  