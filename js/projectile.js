import Enemy from '/js/enemy.js';
import { hitDetected, getRandomInt, updateLayout, resetIfOutOfScreen } from '/js/methods.js'

export default class projectile {
    constructor(player, destination ) {
        this.position = {
            x: player.position.x,
            y: player.position.y
        };
        console.log(this.position)
        this.size = player.characterInfo.projectileInfo.size;
        this.gameWidth = player.gameWidth;
        this.gameHeight = player.gameHeight;
        this.character = player.characterInfo.projectileInfo.character;
        this.deltaX = destination.x - this.position.x;
        this.deltaY = destination.y - this.position.y;
        this.rotation = Math.atan2(this.deltaX, -this.deltaY) - 1.5;
        this.radians = Math.atan2(this.deltaY, this.deltaX);
        this.xSpeedFactor = Math.cos(this.radians);
        this.ySpeedFactor = Math.sin(this.radians);
        this.speed = { x:  player.characterInfo.projectileInfo.speed * this.xSpeedFactor, y:  player.characterInfo.projectileInfo.speed * this.ySpeedFactor };
        this.layout = {
            left: this.position.x - this.size / 2,
            right: this.position.x + this.size / 2,
            top: this.position.y - this.size / 2,
            bottom: this.position.y + this.size / 2
        }
    }
    isHit(enemies, player) {
        //collision is boolean becomes true if collision delected
        if (resetIfOutOfScreen(this)) return true;

        for (let i = 0; i < enemies.length; i++) {
            if (hitDetected(this, enemies[i], true)) {
                //collision detected between enemy and projectile
                enemies[i].health--;
                if (enemies[i].health <= 0){
                    enemies.splice(i, 1);
                }
                if (enemies.length == 0) {
                    player.wave++;
                    for (let j = 0; j < player.wave; j++){
                        enemies.push(new Enemy(getRandomInt(0, 3), gameScreen));
                    }
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
        //update player character layout
        updateLayout(this)
    }
}

