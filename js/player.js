//import directions from input to check the move direction
import {directions} from '/js/input.js'

//player class
export default class Player {
    constructor(playerInfo) {
        this.size = playerInfo.size;
        this.speed = playerInfo.speed;
        this.position ={
            x:playerInfo.posX(),
            y:playerInfo.posY()
        };
        this.gameWidth=playerInfo.gameWidth;
        this.gameHeight=playerInfo.gameHeight;
    }

    //draw method that will be executed in the game loop after move() method to update the position
    draw(context) {
        context.fillStyle = '#f00';
        console.log(`Player[x]: ${this.position.x} , Player[y]: ${this.position.y} , Player[size]: ${this.size}, Player[speed]: ${this.speed}`)
        context.fillRect(this.position.x, this.position.y, this.size, this.size);
    } 

    //move method that will be executed in the game loop before the draw() method
    move(held_directions,deltaTime) {
        if(!deltaTime)return;
        let heldDirections = [held_directions[0], held_directions[1]];
        //up_right
        if (heldDirections.includes(directions.up) && heldDirections.includes(directions.right)) {
            this.position.y -= this.speed/deltaTime;
            this.position.x += this.speed/deltaTime;
        }
        //up_left
        else if (heldDirections.includes(directions.up) && heldDirections.includes(directions.left)) {
            this.position.y -= this.speed/deltaTime;
            this.position.x -= this.speed/deltaTime;
        }
        //down_right
        else if (heldDirections.includes(directions.down) && heldDirections.includes(directions.right)) {
            this.position.y += this.speed/deltaTime;
            this.position.x += this.speed/deltaTime;
        }
        //down_left
        else if (heldDirections.includes(directions.down) && heldDirections.includes(directions.left)) {
            this.position.y += this.speed/deltaTime;
            this.position.x -= this.speed/deltaTime;
        }
        //up_down_left_right
        else {
            if (heldDirections[0] === directions.right){ this.position.x += this.speed/deltaTime; }
            if (heldDirections[0] === directions.left) { this.position.x -= this.speed/deltaTime; }
            if (heldDirections[0] === directions.down) { this.position.y += this.speed/deltaTime; }
            if (heldDirections[0] === directions.up)   { this.position.y -= this.speed/deltaTime; }
        }
        //set the illusion of a wall
        if(this.position.x<0){this.position.x=0}
        if(this.position.y<0){this.position.y=0}
        if(this.position.x>this.gameWidth-this.size){this.position.x=this.gameWidth-this.size}
        if(this.position.y>this.gameHeight-this.size){this.position.y=this.gameHeight-this.size}
    }
}
