export default class Enmy{
    //  constructor(gameWidth,gameHeight,imgID,position,speed,size)
    constructor(gameWidth,gameHeight,ImgId,position,speed,size) {
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
        this.img=document.getElementById(ImgId);
        this.position={x:position.x,y:position.y};
        this.speed={x:speed.x,y:speed.y}
        this.size=size;
    
    }
    draw(context){
        context.drawImage(this.img,
            this.position.x,
            this.position.y,
            this.size,
            this.size)
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