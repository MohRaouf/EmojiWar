export default class Enemy {
    //  constructor(gameWidth,gameHeight,imgID,position,speed,size)
    constructor(gameWidth, gameHeight, ImgId, position, speed, size) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.img = document.getElementById(ImgId);
        this.position = { x: position.x, y: position.y };
        this.speed = { x: speed.x, y: speed.y }
        this.size = size;

        this.layout = {
            left: this.position.x - this.size / 2,
            right: this.position.x + this.size / 2,
            top: this.position.y - this.size / 2,
            bottom: this.position.y + this.size / 2
        }

    }
    draw(context) {
        context.save();
        //draw the over context in the x,y positiondwa
        context.translate(this.position.x, this.position.y)
        //draw the image over the drawn area to be rotated by the same value
        context.drawImage(this.img, -this.img.style.width - this.size / 2, -this.img.style.height - this.size / 2, this.size, this.size)
        //restore the other context objects
        context.restore()
    }
    update(deltaTime) {
        if(!deltaTime) {return}
        this.position.x += this.speed.x/deltaTime;
        this.position.y += this.speed.y/deltaTime;
        if (this.position.x - this.size / 2 < 0|| this.position.x > this.gameWidth - this.size / 2) {
            this.speed.x = -this.speed.x;
        }
        if (this.position.y - this.size / 2 < 0 || this.position.y > this.gameHeight - this.size / 2) {
            this.speed.y = -this.speed.y;
        }
        //set the illusion of a wall for a translated canvas img
        if (this.position.x - this.size / 2 < 0) { this.position.x = this.size / 2 }
        if (this.position.y - this.size / 2 < 0) { this.position.y = this.size / 2 }
        if (this.position.x > this.gameWidth - this.size / 2) { this.position.x = this.gameWidth - this.size / 2 }
        if (this.position.y > this.gameHeight - this.size / 2) { this.position.y = this.gameHeight - this.size / 2 }
        //update player character layout
        this.layout.left = this.position.x - this.size / 2,
        this.layout.right = this.position.x + this.size / 2,
        this.layout.top = this.position.y - this.size / 2,
        this.layout.bottom = this.position.y + this.size / 2

        //console.log(`enemyRight : ${this.layout.left} ` )
    }
}