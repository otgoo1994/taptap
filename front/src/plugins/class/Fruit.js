// const P5 = require("p5");
const indexs = 2;
const params = {
  GRAVITY: 0.03,
  construct: null,
  origin: 0,
  lastIndex: indexs,
  splash: [],
  callback: null,
  length: 0,
  counter: 0,
  live: null
}

class Fruit {
  constructor(x, y, size, c, speed, construct, word, index, callback, live) {

    params.construct = construct;
    this.originX = x;
    this.originY = y;
    this.x = x;
    this.y = y + size;
    params.origin = y + size;
    this.c = c; // color
    this.size = size; // size
    this.speed = speed;
    this.end = false;
    this.find = false;
    this.word = word;
    this.index = index;
    this.current = false;
    this.clearC = clearColor(c);   

    this.xV = randomXV(x);
    const ynumber = random(-5, -7);    
    this.yV = ynumber;

    this.split = false;

    if (index+1 > params.length) {
      params.length = index+1;
    }

    if (!params.live) {
      params.live = live;
    }

    if (!params.callback) {
      params.callback = callback;
    }
  }
}

Fruit.prototype.updateIndex = function() {
  params.lastIndex++;

  if (params.lastIndex -indexs >= params.length) {
    params.callback();
  }
}
// Fruit.prototype.reset = function() {
//   this.x = this.originX;
//   this.y = this.originY;
//   this.end = false;
//   this.find = false;
//   this.current = false;
//   params.length = 0;
//   params.counter = 0;
//   this.clearC = clearColor(this.c);   
//   this.xV = randomXV(this.x);
//   const ynumber = random(-5, -7);    
//   this.yV = ynumber;
// }

Fruit.prototype.update = function() {

  if (this.index <= params.lastIndex) {
    if (!this.end) {
      this.current = true;
    }
  }

  if (this.end) {
    return;
  }

  if (!this.current) {
    return;
  }

  this.x += this.xV;
  this.y += this.yV;
  this.rotate += 1;

  // this.xV *= 0.95;
  this.yV += params.GRAVITY;

  if (params.origin < this.y) {
    this.end = true;
    this.current = false;
    if (!this.find) {
      params.lastIndex++;
      params.live();
    }

    // if (this.index+1 >= params.length) {
    //   params.callback();
    // }

    if (params.lastIndex -indexs >= params.length) {
      params.callback();
    }
  }
}

Fruit.prototype.draw = function() {
  params.construct.noStroke();
  params.construct.strokeWeight(5);
  params.construct.fill(this.c);
  
  this.index % 2 == 0 ? 
  params.construct.rect(this.x, this.y, this.size, this.size, this.size / 10)
  :
  params.construct.ellipse(this.x, this.y, this.size, this.size, this.size / 10);
  params.construct.textSize(30);
  params.construct.stroke('#FFFFFF');
  this.index % 2 == 0 ? 
  params.construct.text(!this.find ? this.word : '', this.x + 30, this.y + 50)
  :
  params.construct.text(!this.find ? this.word : '', this.x - 8, this.y + 10);

  // if (!params.splash.length) {
  //   for (let i = 0; i < 3; i++) {

  //     const parent = params.construct.createDiv();
  //     parent.style('display', 'grid');
  //     parent.style('lef', 0);
  //     parent.style('top', 0);
  //     parent.style('grid-template-columns', '1fr 1fr 1fr 1fr');

  //     const bg = 'background-color: blue';

  //     const animation = '@keyframes tilt-shaking { 0% { transform: rotate(0deg); } 25% { transform: rotate(5deg); } 50% { transform: rotate(0eg); } 75% { transform: rotate(-5deg); } 100% { transform: rotate(0deg); } }';


  //     for (let j = 0; j < 16; j++) {
  //       const child = params.construct.createDiv();
  //       child.style('width', '15px');
  //       child.style('height', '15px');
  //       child.style('border', '1px solid black');
  //       child.style('transition', '1s');
  //       child.style('animation: tilt-shaking 0.15s infinite;');
  //       parent.child(child);
  //     }
  //     params.splash.push(parent);
  //   }
  // }
}
Fruit.prototype.check = function() {

}

function randomXV(x) {
  if (x > window.innerWidth / 2) {
    return random(-1.5, -0.5);
  } else {
    return random(0.5, 1.5);
  }
}

function clearColor (c) {
  const r = params.construct.red(c);
  const g = params.construct.green(c);
  const b = params.construct.blue(c);

  return params.construct.color(r, g, b, 0)
}


function random(min, max) {
  return Math.random() * (max - min) + min;
}

export default Fruit;