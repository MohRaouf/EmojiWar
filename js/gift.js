//gift instances 
var giftInstance = [
    {
        size: 40,
        character: document.getElementById("diamond"),
        type: 1
    },
    {
        size: 40,
        character: document.getElementById("heal"),
        type: 2
    },
    {
        size: 70,
        character: document.getElementById("treasure"),
        type: 3
    }
]
export default class Gift {
    static level = 1;
    constructor(characterIndex, gameScreen,position) {
        // console.log(Enemy.level)
        var currentGift = giftInstance[characterIndex]
        this.gameWidth = gameScreen.width;
        this.gameHeight = gameScreen.height;
        if(position===false)
            this.position = this.getRandomCoordinates();
        else
            this.position=position;
        this.size = currentGift.size;
        this.type=currentGift.type;
        this.layout = {
            left: this.position.x - this.size / 2,
            right: this.position.x + this.size / 2,
            top: this.position.y - this.size / 2,
            bottom: this.position.y + this.size / 2
        }
        this.character = currentGift.character;
    }
    getRandomCoordinates(){
        var position={
            x:Math.random() * this.gameWidth,
            y:Math.random()* this.gameHeight
        }
        return position;
    }
    draw(context) {
        context.save();
        //draw the over context in the x,y positiondwa
        context.translate(this.position.x, this.position.y)
        //draw the image over the drawn area to be rotated by the same value
        context.drawImage(this.character, -this.character.style.width - this.size / 2, -this.character.style.height - this.size / 2, this.size, this.size);
        //restore the other context objects
        context.restore();
    }
}