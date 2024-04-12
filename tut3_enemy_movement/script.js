/** @type {HTMLCanvasElement} */  // let VSCode suggest canvas built-in methods
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;  // same as stylesheet
const numberOfEnemies = 5;
const enemiesArray = [];

let gameFrame = 0;

class Enemy {
    constructor(){
        this.image = new Image();
        this.image.src = 'enemy3.png';
        this.speed = Math.random() * 4 + 1;  // random number [1, 5]
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.x = Math.random() * (CANVAS_WIDTH - this.width);
        this.y = Math.random() * (CANVAS_HEIGHT - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = 0;  // this.angle = Math.random() * 2; # Frequency
        this.angleSpeed = Math.random() * 2 + 0.5;
        this.curve = Math.random() * 200 + 50;  // # Amplitude  # Radius
    }
    update(){
        this.x = this.curve * Math.sin(this.angle * Math.PI/180) + (CANVAS_WIDTH/2 - this.width/2);
        this.y = this.curve * Math.cos(this.angle * Math.PI/180) + (CANVAS_HEIGHT/2 - this.height/2);  // change the value '180', different combinations leads to different movement.
        this.angle += this.angleSpeed;
        if (this.x + this.width < 0) this.x = canvas.width;
        // animate sprites
        if (gameFrame % this.flapSpeed === 0){
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw(){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
};

for (let i = 0; i < numberOfEnemies; i++){
    enemiesArray.push(new Enemy());
}

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();


// let gameSpeed = 5;
// // let gameFrame = 0;

// const backgroundLayer1 = new Image();
// backgroundLayer1.src = 'layer-1.png';
// const backgroundLayer2 = new Image();
// backgroundLayer2.src = 'layer-2.png';
// const backgroundLayer3 = new Image();
// backgroundLayer3.src = 'layer-3.png';
// const backgroundLayer4 = new Image();
// backgroundLayer4.src = 'layer-4.png';
// const backgroundLayer5 = new Image();
// backgroundLayer5.src = 'layer-5.png';

// window.addEventListener('load', function(){
//     const slider = document.getElementById('slider');
//     slider.value = gameSpeed;
//     const showGameSpeed = document.getElementById('showGameSpeed');
//     showGameSpeed.innerHTML = gameSpeed;
//     slider.addEventListener('change', function(e){
//         // console.log(e.target.value);
//         gameSpeed = e.target.value;
//         showGameSpeed.innerHTML = e.target.value;
//     });

//     class Layer {
//         constructor(image, speedModifier){
//             this.x = 0;
//             this.y = 0;
//             this.width = 2400;
//             this.height = 700;
//             this.image = image;
//             this.speedModifier = speedModifier;
//             this.speed = gameSpeed * this.speedModifier;
//         }
//         update(){
//             this.speed = gameSpeed * this.speedModifier;
//             if (this.x <= -this.width){
//                 this.x = 0;
//             }
//             this.x = Math.floor(this.x - this.speed);  // method 1
//             // this.x = gameFrame * this.speed % this.width;  // method 2
//         }
//         draw(){
//             ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
//             ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
//         }
//     }

//     const layer1 = new Layer(backgroundLayer1, 0.2);
//     const layer2 = new Layer(backgroundLayer2, 0.4);
//     const layer3 = new Layer(backgroundLayer3, 0.6);
//     const layer4 = new Layer(backgroundLayer4, 0.8);
//     const layer5 = new Layer(backgroundLayer5, 1);

//     const gameObjects = [layer1, layer2, layer3, layer4, layer5];

//     function animate(){
//         ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//         gameObjects.forEach(object => {
//             object.update();
//             object.draw();
//         });
//         requestAnimationFrame(animate);
//         // gameFrame--;
//     };
//     animate();
// });

