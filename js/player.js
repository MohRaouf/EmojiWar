//import directions from input to check the move direction
import { directions } from '/js/input.js'

//player class
export default class Player {
    constructor(playerInfo) {
        this.size = playerInfo.size;
        this.speed = playerInfo.speed;
        this.position = {
            x: playerInfo.posX(),
            y: playerInfo.posY()
        };
        this.gameWidth = playerInfo.gameWidth;
        this.gameHeight = playerInfo.gameHeight;
        this.character = playerInfo.character;
        this.shootingSound=playerInfo.shootingSound;
        this.rotation;
        this.scale=1;
    }
    shoot(isShooting){
        if(isShooting){
            //shoot effect
            this.shootingSound.play();
            this.scale=1.08;
        }
        //generation of projectile should be here
        //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
    }

    //draw method that will be executed in the game loop after move() method to update the position
    draw(context, mousePosition) {

        //getting the angle to the mouse position
        //mirorr the character horizontally when it's flipped 
        let scaleX=1;
        if(this.position.x>mousePosition.x){
            this.rotation = Math.atan2(mousePosition.x - this.position.x, -(mousePosition.y - this.position.y)) +1.4;
            scaleX=-1;
        }
        else{
            this.rotation = Math.atan2(mousePosition.x - this.position.x, -(mousePosition.y - this.position.y)) - 1.32;
        }


        //console.log(`Rotation Angle = ${this.rotation}`)
        //console.log(`Player[x]: ${this.position.x} , Player[y]: ${this.position.y} , Player[size]: ${this.size}, Player[speed]: ${this.speed}`)
        
        //save other context objects to not be affected by the rotation
        context.save();
        //draw the over context in the x,y position
        context.translate(this.position.x, this.position.y)
        //rotate the draw by the calculated angle
        context.rotate(this.rotation);

        //scale effect on the contect before draw the image
        context.scale(scaleX*this.scale,this.scale);
        //draw the image over the drawn area to be rotated by the same value
        context.drawImage(this.character, -this.character.style.width - this.size / 2, -this.character.style.height - this.size / 2, this.size, this.size)
        //restore the other context objects
        context.restore()
    }

    //move method that will be executed in the game loop before the draw() method
    move(held_directions, deltaTime) {
        if (!deltaTime) return;
        let heldDirections = [held_directions[0], held_directions[1]];
        //up_right
        if (heldDirections.includes(directions.up) && heldDirections.includes(directions.right)) {
            this.position.y -= this.speed / deltaTime;
            this.position.x += this.speed / deltaTime;
        }
        //up_left
        else if (heldDirections.includes(directions.up) && heldDirections.includes(directions.left)) {
            this.position.y -= this.speed / deltaTime;
            this.position.x -= this.speed / deltaTime;
        }
        //down_right
        else if (heldDirections.includes(directions.down) && heldDirections.includes(directions.right)) {
            this.position.y += this.speed / deltaTime;
            this.position.x += this.speed / deltaTime;
        }
        //down_left
        else if (heldDirections.includes(directions.down) && heldDirections.includes(directions.left)) {
            this.position.y += this.speed / deltaTime;
            this.position.x -= this.speed / deltaTime;
        }
        //up_down_left_right
        else {
            if (heldDirections[0] === directions.right) { this.position.x += this.speed / deltaTime; }
            if (heldDirections[0] === directions.left) { this.position.x -= this.speed / deltaTime; }
            if (heldDirections[0] === directions.down) { this.position.y += this.speed / deltaTime; }
            if (heldDirections[0] === directions.up) { this.position.y -= this.speed / deltaTime; }
        }
        // //set the illusion of a wall for an image 
        // if(this.position.x<0){this.position.x=0}
        // if(this.position.y<0){this.position.y=0}
        // if(this.position.x>this.gameWidth-this.size){this.position.x=this.gameWidth-this.size}
        // if(this.position.y>this.gameHeight-this.size){this.position.y=this.gameHeight-this.size}

        // //set the illusion of a wall for a circle canvas
        // if(this.position.x-this.size<0){this.position.x=this.size}
        // if(this.position.y-this.size<0){this.position.y=this.size}
        // if(this.position.x>this.gameWidth-this.size){this.position.x=this.gameWidth-this.size}
        // if(this.position.y>this.gameHeight-this.size){this.position.y=this.gameHeight-this.size}

        //set the illusion of a wall for a translated canvas img
        if (this.position.x - this.size/2 < 0) { this.position.x = this.size/2 }
        if (this.position.y - this.size /2< 0) { this.position.y = this.size/2 }
        if (this.position.x > this.gameWidth - this.size/2) { this.position.x = this.gameWidth - this.size/2 }
        if (this.position.y > this.gameHeight - this.size/2) { this.position.y = this.gameHeight - this.size/2 }
    }
}
