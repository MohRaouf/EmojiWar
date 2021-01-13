import {generate_projectile} from '/js/GameLoop.js'
/* Direction key state */
export const directions = {
    up: "up",
    down: "down",
    left: "left",
    right: "right"
}
// map keys code to string 
const keys = {
    38: directions.up,
    87: directions.up,
    37: directions.left,
    65: directions.left,
    39: directions.right,
    68: directions.right,
    40: directions.down,
    83: directions.down
}

//InputHandler class contains the event listener
export default class InputHandler {
    constructor(canvas, player) {
        this.isShooting = false;
        this.held_directions = []; // State of which arrow keys we are holding down
        document.addEventListener("keydown", (e) => {
            var dir = keys[e.which];
            let keyIndex = this.held_directions.indexOf(dir)
            if (dir && this.held_directions.indexOf(dir) === -1) {
                this.held_directions.unshift(dir)
            }
            // console.log(e.key)
        })

        document.addEventListener("keyup", (e) => {
            var dir = keys[e.which];
            var index = this.held_directions.indexOf(dir);
            if (index > -1) {
                this.held_directions.splice(index, 1)
            }
        });

        //getting mouse position
        this.mouse = { x: 0, y: 0 };
        document.addEventListener("mousemove", (e) => {
            const bounds = canvas.getBoundingClientRect();
            this.mouse.x = e.pageX - bounds.left - scrollX;
            this.mouse.y = e.pageY - bounds.top - scrollY;
            //  console.log(`MouseX = ${this.mouse.x}, MouseY = ${this.mouse.y}`)
        });

        //detect the mouse down for continous isShooting
        canvas.addEventListener('mousedown', (e) => {
            if (e.buttons === 1) {
                this.isShooting = true;
                console.log(`MouseX: ${this.mouse.x}, MouseY: ${this.mouse.y}`)
                generate_projectile(this.mouse.x,this.mouse.y);
            }
        })

        //detect the mouse up to stop isShooting
        canvas.addEventListener('mouseup', (e) => {
            if (e.buttons === 0) {
                this.isShooting = false;
            }
        })

        //on isShooting sound ended scale to original size
        player.shootingSound.onended = function () { player.scale = 1; };
    }
}

