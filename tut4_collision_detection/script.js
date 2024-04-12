/** @type {HTMLCanvasElement} */ // let VSCode suggest canvas built-in methods
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;
const explosions = [];
let canvasPostion = canvas.getBoundingClientRect();

class Explosion {
    constructor(x, y) {
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7;
        this.height = this.spriteHeight * 0.7;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = "boom.png";
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2; // 360 degrees in randian
        this.sound = new Audio();
        this.sound.src = "boom.wav";
    }
    update() {
        if (this.frame === 0) this.sound.play();

        this.timer++; // updata with built-in animate frame
        if (this.timer % 10 === 0) {
            this.frame++; // update the sprite-sheet frame
        }
    }
    draw() {
        ctx.save(); // canvas rotation technique.
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.drawImage(
            this.image,
            this.spriteWidth * this.frame, // sx,
            0, // sy
            this.spriteWidth, // sw,
            this.spriteHeight, // sh,
            0 - this.width / 2, // dx
            0 - this.height / 2, // dy // minus an offset, so in mouse click center
            this.width, // dw
            this.height // dh
        );

        ctx.restore();
    }
}

window.addEventListener("click", function (e) {
    createAnimation(e);
});

function createAnimation(e) {
    let positionX = e.x - canvasPostion.left;
    let positionY = e.y - canvasPostion.top;
    explosions.push(new Explosion(positionX, positionY));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // used for display only current frame
    for (let i = 0; i < explosions.length; i++) {
        explosions[i].update();
        explosions[i].draw();

        if (explosions[i].frame > 5) {
            explosions.splice(i, 1);
            i--;
        } // used for reomove object.
    }
    requestAnimationFrame(animate);
}
animate();

// const CANVAS_WIDTH = (canvas.width = window.innerWidth);
// const CANVAS_HEIGHT = (canvas.height = window.innerHeight);

// let timeToNextRaven = 0;
// let ravenInterval = 500;
// let lastTime = 0;

// let ravens = [];
// class Raven {
//     constructor() {
//         this.spriteWidth = 271;
//         this.spriteHeight = 194;
//         this.sizeModifier = Math.random() * 0.6 + 0.4;
//         this.width = this.spriteWidth * this.sizeModifier; // pixel
//         this.height = this.spriteHeight * this.sizeModifier;
//         this.x = canvas.width; // initial X postion
//         this.y = Math.random() * (canvas.height - this.height); // initial Y position
//         this.directionX = Math.random() * 5 + 3; // initial horizontal speed
//         this.directionY = Math.random() * 5 - 2.5; // initial vertical speed
//         this.markedForDeletion = false;
//         this.image = new Image();
//         this.image.src = "raven.png";
//         this.frame = 0;
//         this.maxFrame = 4;
//         this.timeSinceFlap = 0;
//         this.flapInterval = Math.random() * 100 + 100;
//     }
//     update(deltatime) {
//         this.x -= this.directionX;
//         if (this.x < 0 - this.width) this.markedForDeletion = true;
//         this.timeSinceFlap += deltatime; // update base on timeSinceFlap
//         if (this.timeSinceFlap > this.flapInterval) {
//             if (this.frame > this.maxFrame) this.frame = 0;
//             else this.frame++;
//         }
//     }
//     draw() {
//         ctx.drawImage(
//             this.image,
//             this.frame * this.spriteWidth,
//             0,
//             this.spriteWidth,
//             this.spriteHeight,
//             this.x,
//             this.y,
//             this.width,
//             this.height
//         );
//     }
// }

// function animate(timestamp) {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     let deltatime = timestamp - lastTime; // in [ms]
//     lastTime = timestamp;
//     timeToNextRaven += deltatime;
//     if (timeToNextRaven > ravenInterval) {
//         ravens.push(new Raven());
//         timeToNextRaven = 0;
//     }
//     [...ravens].forEach((object) => object.update(deltatime));
//     [...ravens].forEach((object) => object.draw());
//     ravens = ravens.filter((object) => !object.markedForDeletion); // filter(留下符合condition的element); filter(element=>ture => 留下); filter(element=>false => filter out)；  // re-assign the vatiable; 'let'; 'const' cannot be re-assigned;
//     requestAnimationFrame(animate);
// }
// animate(0); // pass timestamp as 0 at the beginning
