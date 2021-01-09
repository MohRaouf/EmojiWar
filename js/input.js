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
    constructor(canvas) {
        this.canvas=canvas;
        this.shooting=false;
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
        this.mouse= { x: 0, y: 0 };
        document.addEventListener("mousemove", (e)=>{
            const bounds = this.canvas.getBoundingClientRect();
            this.mouse.x = e.pageX - bounds.left - scrollX;
            this.mouse.y = e.pageY - bounds.top - scrollY;
            // console.log(`MouseX = ${this.mouse.x}, MouseY = ${this.mouse.y}`)
        });

        // click detection on the canvas and play shoot sound
        canvas.addEventListener("click",(e)=>{
            if(e.buttons===1) {
                shootSound.play();
            } 
        })
        
        //detect the mouse down for continous shooting
        canvas.addEventListener('mousedown', (e) =>{
            if(e.buttons===1) {
                this.shooting=true;
            } 
        })

        //detect the mouse up to stop shooting
        canvas.addEventListener('mouseup', (e) =>{
            if(e.buttons===0) {
                this.shooting=false;
            } 
        })

    }
}

