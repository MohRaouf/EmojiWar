import { getRandomInt } from '/js/methods.js'
//enemy generation Position
var enemyGenerationLocation = [{ "x": 0.2, "y": 0.05 }, { "x": 0.5, "y": 0.05 }, { "x": 0.8, "y": 0.05 },
{ "x": 0.2, "y": 0.95 }, { "x": 0.5, "y": 0.95 }, { "x": 0.8, "y": 0.95 }, { "x": 0.01, "y": 0.3 },
{ "x": 0.01, "y": 0.7 }, { "x": 0.99, "y": 0.3 }, { "x": 0.99, "y": 0.7 }];

//Enemy characters 
var enemyCharacters = [
    {
        size: 80,
        speed: 40,
        health: 3,
        character: document.getElementById("enemy1")
    },
    {
        size: 100,
        speed: 30,
        health: 6,
        character: document.getElementById("enemy2")
    },
    {
        size: 120,
        speed: 20,
        health: 9,
        character: document.getElementById("enemy3")
    }
]

export default class Enemy {
    constructor(characterIndex, gameScreen) {
        var enemyInfo = enemyCharacters[characterIndex]
        this.gameWidth = gameScreen.width;
        this.gameHeight = gameScreen.height;
        this.character = enemyInfo.character;
        let randomLocation = enemyGenerationLocation[getRandomInt(0, 10)];
        console.log(randomLocation)
        this.position = {
            x: randomLocation.x * this.gameWidth,
            y: randomLocation.y * this.gameHeight
        };
        this.speed = {x:enemyInfo.speed,y:enemyInfo.speed}
        this.size = enemyInfo.size;
        this.layout = {
            left: this.position.x - this.size / 2,
            right: this.position.x + this.size / 2,
            top: this.position.y - this.size / 2,
            bottom: this.position.y + this.size / 2
        }
        this.rotation;
    }
    draw(context, playerPosition) {
        this.rotation = Math.atan2(playerPosition.x - this.position.x, -(playerPosition.y - this.position.y)) +3.14;
        context.save();
        //draw the over context in the x,y positiondwa
        context.translate(this.position.x, this.position.y)
        //rotate the draw by the calculated angle
        context.rotate(this.rotation);
        //draw the image over the drawn area to be rotated by the same value
        context.drawImage(this.character, -this.character.style.width - this.size / 2, -this.character.style.height - this.size / 2, this.size, this.size)
        //restore the other context objects
        context.restore()
    }
    update(deltaTime,playerPosition) {
        if (!deltaTime) { return }

        let deltaX= playerPosition.x-this.position.x;
        let deltaY=playerPosition.y-this.position.y;
        //atan2 for angle
        var radians = Math.atan2(deltaY, deltaX); // Don't use squared delta
        //radians into degrees
        var angle = radians * (180 / Math.PI);

        let xSpeedFactor = Math.cos(radians)*1.4;
        let ySpeedFactor = -Math.sin(radians)*1.4;

        this.position.x += this.speed.x*xSpeedFactor / deltaTime;
        this.position.y += this.speed.y*-ySpeedFactor / deltaTime;

        //set the illusion of a wall for a translated canvas this.character
        if (this.position.x - this.size / 2 < 0) { this.position.x = this.size / 2 }
        if (this.position.y - this.size / 2 < 0) { this.position.y = this.size / 2 }
        if (this.position.x > this.gameWidth - this.size / 2) { this.position.x = this.gameWidth - this.size / 2 }
        if (this.position.y > this.gameHeight - this.size / 2) { this.position.y = this.gameHeight - this.size / 2 }

        //update player character layout
        this.layout.left = this.position.x - this.size / 2,
            this.layout.right = this.position.x + this.size / 2,
            this.layout.top = this.position.y - this.size / 2,
            this.layout.bottom = this.position.y + this.size / 2
    }
}