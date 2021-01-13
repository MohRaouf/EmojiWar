import Enemy from '/js/enemy.js';
import { hitDetected } from '/js/methods.js'
import {getRandomInt} from '/js/methods.js'
export var projectileCharacters = [
    {
        size: 80,
        speed: 100,
        character: document.getElementById("projectile1")
    },
    {
        size: 80,
        speed: 100,
        character: document.getElementById("projectile2")
    },
    {
        size: 80,
        speed: 100,
        character: document.getElementById("projectile3")
    }
];

export default class projectile {
    constructor(position, destination, projectileIndex, gameScreen) {
        var projectileInfo = projectileCharacters[projectileIndex];
        this.position = {
            x: position.x,
            y: position.y
        };
        console.log(this.position)
        this.size = projectileInfo.size;
        this.gameWidth = gameScreen.width;
        this.gameHeight = gameScreen.height;
        this.character = projectileInfo.character;
        this.deltaX = destination.x - this.position.x;
        this.deltaY = destination.y - this.position.y;
        this.rotation = Math.atan2(this.deltaX, -this.deltaY) +3.14;
        this.radians = Math.atan2(this.deltaY, this.deltaX);
        this.xSpeedFactor = Math.cos(this.radians);
        this.ySpeedFactor = Math.sin(this.radians);
        this.speed = { x: projectileInfo.speed * this.xSpeedFactor, y: projectileInfo.speed * this.ySpeedFactor };
        this.layout = {
            left: this.position.x - this.size / 2,
            right: this.position.x + this.size / 2,
            top: this.position.y - this.size / 2,
            bottom: this.position.y + this.size / 2
        }
    }
    isHit(enemies, player) {
        //collision is boolean becomes true if collision delected
        //left wall collision
        let walls_collision = (this.position.x - this.size / 2 < 0);
        //right wall collision
        walls_collision |= (this.position.x > this.gameWidth - this.size / 2);
        //top wall collision
        walls_collision |= (this.position.y - this.size / 2 < 0);
        //bottom wall collision
        walls_collision |= (this.position.y > this.gameHeight - this.size / 2);
        if (walls_collision) 
                return true;
        for (let i = 0; i < enemies.length; i++) {
            if(hitDetected(enemies[i], this)) {
                //collision detected between enemy and projectile
                enemies[i].health--;
                if(enemies[i].health <= 0)
                    enemies.splice(i, 1);
                if(enemies.length == 0) {
                    player.wave++;
                    for(let j = 0; j < player.wave; j++) 
                        enemies.push(new Enemy(getRandomInt(0, 3), gameScreen));
                }
                return true;
            }
        }
        return false;
    }
    draw(context, deltaTime) {
        if (!deltaTime) { return }
        this.position.x += this.speed.x / deltaTime;
        this.position.y += this.speed.y / deltaTime;
        console.log(this.speed);

        this.layout.left = this.position.x - this.size / 2,
            this.layout.right = this.position.x + this.size / 2,
            this.layout.top = this.position.y - this.size / 2,
            this.layout.bottom = this.position.y + this.size / 2
        //save other context objects to not be affected by the rotation
        context.save();
        //draw the over context in the x,y position
        context.translate(this.position.x, this.position.y)
        //rotate the draw by the calculated angle
        context.rotate(this.rotation);
        //draw the image over the drawn area to be rotated by the same value
        context.drawImage(this.character, -this.character.style.width - this.size / 2, -this.character.style.height - this.size / 2, this.size, this.size)
        //restore the other context objects
        context.restore();
    }
}

