//import directions from input to check the move direction
import { directions } from '/js/input.js'
import {hitDetected} from '/js/methods.js'
import Enemy from '/js/enemy.js';
import {getRandomInt} from '/js/methods.js'

export var playerCharacters =[
    {
        size: 120,
        speed: 50,
        character:document.getElementById("character1"),
        shootingSound:document.getElementById("shoot1"),
        hurtSound:document.getElementById("maleHurt"),
        health:5
    },
    {
        size: 120,
        speed: 50,
        character:document.getElementById("character2"),
        shootingSound:document.getElementById("shoot1"),
        hurtSound:document.getElementById("femaleHurt"),
        health:5
    },
    {
        size: 120,
        speed: 50,
        character:document.getElementById("character4"),
        shootingSound:document.getElementById("shoot1"),
        hurtSound:document.getElementById("maleHurt"),
        health:5
    }
] 

//player class
export default class Player {
    constructor(playerIndex,gameScreen) {
        var character=playerCharacters[playerIndex]
        this.size = character.size;
        this.speed = character.speed;
        this.position = {
            x: gameScreen.width / 2 - this.size / 2,
            y: gameScreen.height / 2 - this.size / 2
        };
        this.gameWidth = gameScreen.width;
        this.gameHeight = gameScreen.height;
        this.character = character.character;
        this.shootingSound = character.shootingSound;
        this.rotation;
        this.scale = 1;
        this.health = character.health;
        this.layout = {
            left: this.position.x - this.size / 2,
            right: this.position.x + this.size / 2,
            top: this.position.y - this.size / 2,
            bottom: this.position.y + this.size / 2
        }
        this.hurtSound=character.hurtSound
        this.wave=1;
    }
    shoot(isShooting) {
        if (isShooting) {
            //shoot effect
            this.shootingSound.play();
            this.scale = 1.08;
        }
        //generation of projectile should be here
        //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
    }

    //draw method that will be executed in the game loop after move() method to update the position
    draw(context, mousePosition) {
        let scaleX = 1;
        if (this.position.x > mousePosition.x) {
            //getting the angle to the mouse position
            this.rotation = Math.atan2(mousePosition.x - this.position.x, -(mousePosition.y - this.position.y)) + 1.4;
            //mirorr the character horizontally when it's flipped 
            scaleX = -1;
        }
        else {
            this.rotation = Math.atan2(mousePosition.x - this.position.x, -(mousePosition.y - this.position.y)) - 1.32;
        }
        //save other context objects to not be affected by the rotation
        context.save();
        //draw the over context in the x,y position
        context.translate(this.position.x, this.position.y)
        //rotate the draw by the calculated angle
        context.rotate(this.rotation);
        //scale effect on the contect before draw the image
        context.scale(scaleX * this.scale, this.scale);
        //draw the image over the drawn area to be rotated by the same value
        context.drawImage(this.character, -this.character.style.width - this.size / 2, -this.character.style.height - this.size / 2, this.size, this.size)
        //restore the other context objects
        context.restore()
    }
    isHit(enemies) {
        for (let i = 0; i < enemies.length; i++) {
            //enemy touches the player
            if(hitDetected(enemies[i],this)){
                this.hurtSound.play();
                enemies.splice(i,1);
                if(enemies.length==0)
                {
                    this.wave++;
                    for(let i=0;i<this.wave;i++){
                        enemies.push(new Enemy(getRandomInt(0,3),gameScreen))
                    }
                }
                console.log(enemies)
            }
        }
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

        //set the illusion of a wall for a translated canvas img
        if (this.position.x - this.size / 2 < 0) { this.position.x = this.size / 2 }
        if (this.position.y - this.size / 2 < 0) { this.position.y = this.size / 2 }
        if (this.position.x > this.gameWidth - this.size / 2) { this.position.x = this.gameWidth - this.size / 2 }
        if (this.position.y > this.gameHeight - this.size / 2) { this.position.y = this.gameHeight - this.size / 2 }

        //update player character layout
        this.layout.left = this.position.x - this.size / 2;
        this.layout.right = this.position.x + this.size / 2;
        this.layout.top = this.position.y - this.size / 2;
        this.layout.bottom = this.position.y + this.size / 2;
    }
}
