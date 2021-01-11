import { directions } from '/js/input.js'
export default class Enemy{
    static counter=0;
    //  constructor(gameWidth,gameHeight,imgID,position,speed,size)
    constructor(gameWidth,gameHeight,ImgId,position,speed,size) {
       
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
        this.img=document.getElementById(ImgId);
        this.position={x:position.x,y:position.y};
        this.speed={x:speed.x,y:speed.y}
        this.size=size;
        Enemy.counter++;
    }
    draw(context){
        context.drawImage(this.img,
            this.position.x,
            this.position.y,
            this.size,
            this.size)
    }
    draw(context, playerPosition_x,playerPos_y) {

        let scaleX=1;
        if(this.position.x>playerPosition_x){
            this.rotation = Math.atan2(playerPosition_x - this.position.x, -(playerPos_y - this.position.y)) +1.4;
            scaleX=-1;
        }
        else{
            this.rotation = Math.atan2(playerPosition_x - this.position.x, -(playerPos_y - this.position.y)) - 1.32;
        }

        context.save();
        context.translate(this.position.x, this.position.y)
        context.rotate(this.rotation);
        // context.scale(scaleX*this.scale,this.scale);
        context.drawImage(this.img,
             -this.img.style.width - this.size / 2, 
            -this.img.style.height - this.size / 2,
             this.size, this.size)
        context.restore()
    }

    update(deltaTime){
        this.position.x+=this.speed.x;
        this.position.y+=this.speed.y;
        if(this.position.x>this.gameWidth-this.size||this.position.x<0){
            this.speed.x=-this.speed.x;
        }
        if(this.position.y>this.gameHeight-this.size||this.position.y<0){
            this.speed.y=-this.speed.y;
        }
    }
}