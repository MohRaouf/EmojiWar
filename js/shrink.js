var enemyShrink = document.getElementById("shrink");
console.log(enemyShrink);
const WIDTH = enemyShrink.width;
const HEIGHT = enemyShrink.height;
var circle = 2 * Math.PI;
var particles=[];
var context = enemyShrink.getContext('2d');
class enemyCharacter {
    constructor(posX, posY, radius, color) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.color = color;
    }
    drawEnemy() {
        context.beginPath();
        context.arc(this.posX, this.posY, this.radius, 0, circle);
        context.fillStyle = this.color;
        context.fill();
    }
}
class particle {
    constructor(posX, posY, radius, color) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.color = color;
    }
    drawEnemy() {
        context.beginPath();
        context.arc(this.posX, this.posY, this.radius, 0, circle);
        context.fillStyle = this.color;
        context.fill();
    }
    explosion(){
        particles.push(new particle(enemyCharacter.posX,enemyCharacter.posY,3,0,circle))
        
    }
}
enemyCharacter = new enemyCharacter(100, 100, 30, 'orange');
enemyCharacter.drawEnemy();
