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
    constructor(player) {
        var held_directions = []; // State of which arrow keys we are holding down
        this.held_directions=held_directions;
        document.addEventListener("keydown", (e) => {
            var dir = keys[e.which];
            let keyIndex = held_directions.indexOf(dir)
            if (dir && held_directions.indexOf(dir) === -1) {
                held_directions.unshift(dir)
                console.log(held_directions)
            }
            // console.log(e.key)
        })

        document.addEventListener("keyup", (e) => {
            var dir = keys[e.which];
            var index = held_directions.indexOf(dir);
            if (index > -1) {
                held_directions.splice(index, 1)
            }
        });
    }
}

