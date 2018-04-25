// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');


var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
};

ctx.fillStyle = "rgba(0,0,0,0.25)";
ctx.fillRect(0,0,width,height);
class Ball {
  constructor(x, y, vx, vy, color, r) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.r = r;
  };
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    ctx.fill();
  };
  move() {
    if(this.x + this.r >= width){
      this.vx = -this.vx;
    }
    if(this.x - this.r <= 0){
      this.vx = -this.vx;
    }
    if(this.y + this.r >= height){
      this.vy = -this.vy;
    }
    if(this.y - this.r <= 0){
      this.vy = -this.vy;
    }
    this.x += this.vx;
    this.y += this.vy;
  };
  checkCollision(i) {
    for (let index = i + 1; index < 20; index++){
      let dx = this.x - balls[index].x;
      let dy = this.y - balls[index].y;
      let distance = Math.sqrt(dx*dx + dy*dy);
      if(distance < this.r + balls[index].r) {
        this.color = "rgb(" + random(0,255) +","+random(0,255)+","+random(0,255)+")";
        balls[index].color = "rgb(" + random(0,255) +","+random(0,255)+","+random(0,255)+")";
      }
    }
  }
}



class RegBall extends Ball{}

class EvilBall extends Ball{
  constructor(x, y, vx, vy, color, r){
    super(x, y, vx, vy, color, r);
    this._score = 0;
  }
  get score(){
    return this._score;
  }
  set score(num){
    this._score = num;
  }
  checkCollision(index, array) {
    let dx = this.x - array[index].x;
    let dy = this.y - array[index].y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    if(distance < this.r + array[index].r) {
      array[index] = new RegBall(random(0,width), random(0,height), random(-10,10), random(-10,10), 
                          "rgb(" + random(0,255) +","+random(0,255)+","+random(0,255)+")",random(5,20));
      this.score++;
    }
    document.getElementsByTagName("p")[0].innerHTML = "Score:" + this.score;
    
  }

  move(e) {
    //left
    if(e === 37){
      if(this.x > 0){
        this.x -= 5;
      }      
    }
    //up
    if(e === 38){
      if(this.y > 0){
        this.y -= 5;
      }      
    }
    //right
    if(e === 39){
      if(this.x < width){
        this.x += 5;
      }      
    }
    //down
    if(e === 40){
      if(this.y < height){
        this.y += 5;
      }      
    }
  }
}

var evilBall = new EvilBall(random(0,width), random(0,height), 0, 0,"rgb(255,255,255)",random(20,30));

var balls = [];
for(let i = 0; i < 20; i++){
  var ball = new RegBall(random(0,width), random(0,height), random(-10,10), random(-10,10), 
                      "rgb(" + random(0,255) +","+random(0,255)+","+random(0,255)+")",random(5,20));
  ball.draw();
  balls.push(ball);
}


function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);
  for(let i=0; i<20;i++){
    evilBall.draw();
    evilBall.checkCollision(i, balls);
    balls[i].draw();
    balls[i].move();
    balls[i].checkCollision(i);
  }
  document.onkeydown = function() {
    evilBall.move(event.keyCode)
  }
  requestAnimationFrame(loop);
}
loop();

