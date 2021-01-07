/* Direction key state */
const directions = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
 }
 const keys = {
    38: directions.up,
    87: directions.up,

    37: directions.left,
    65: directions.left,

    39: directions.right,
    68:directions.right,

    40: directions.down,   
    83: directions.down

 }
 var held_directions = []; //State of which arrow keys we are holding downw
var heldDirections=[];
 function triggerMove(player)
 { 
     heldDirections = [held_directions[0],held_directions[1]];
    // const held_direction = held_directions[0];
    // const pre_held_direction = held_directions[1]; 
 
    if (heldDirections.includes(directions.up) && heldDirections.includes(directions.right)) {
        player.move('up_right');
        console.log(heldDirections)
    }
    else if (heldDirections.includes(directions.up) && heldDirections.includes(directions.left)) {
        player.move('up_left');
    }
    else if (heldDirections.includes(directions.down) && heldDirections.includes(directions.right)) {
        player.move('down_right');
    }
    else if (heldDirections.includes(directions.down) && heldDirections.includes(directions.left)) {player.move('down_left');}
    else{
        if (heldDirections[0] === directions.right) {player.move('right');}
        if (heldDirections[0] === directions.left) {player.move('left');}
        if (heldDirections[0] === directions.down) {player.move('down');}
        if (heldDirections[0] === directions.up) {player.move('up');}
    }
 }

export default class InputHandler{
    constructor(player){
        document.addEventListener("keydown", (e) => {
            var dir = keys[e.which];
            let keyIndex = held_directions.indexOf(dir)
            if (dir && held_directions.indexOf(dir) === -1) {
               held_directions.unshift(dir)
            }
            triggerMove(player)
            console.log(e.key)
         })
         
         document.addEventListener("keyup", (e) => {
            var dir = keys[e.which];
            var index = held_directions.indexOf(dir);
            if (index > -1) {
               held_directions.splice(index, 1)
               console.log(held_directions)
               //triggerMove(player)
            }
         });

         
    //     document.addEventListener('keydown',(event)=>{
    //     //Right
    //     if(event.keyCode==39||event.keyCode==68){
    //         player.move('right');
    //     }
    //     //Left
    //     if(event.keyCode==37 ||event.keyCode==65){
    //         player.move('left');
    //     }
    //     //Up
    //     if(event.keyCode==38 ||event.keyCode==87){
    //         player.move('up');
    //         console.log("moving up")
    //     }
    //     //Down
    //     if(event.keyCode==40 ||event.keyCode==83){
    //         player.move('down');
    //     }
    // })
    }
}

