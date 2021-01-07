export default class Player{
    constructor(gameWidth,gameHeight,speed,context){
        this.radius=100;
        this.context=context;
        this.speed=speed;
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
        this.position={
            x:gameWidth/2 - this.radius/2,
            y:gameHeight/2 - this.radius/2
        };
    }

    draw(){
        this.context.clearRect(0,0,this.gameWidth,this.gameHeight);
        this.context.fillStyle='#f00';
        this.context.fillRect(this.position.x,this.position.y,this.radius,this.radius);
        // console.log(`x : ${this.position.x} and y : ${this.position.y}`)
        // console.log(`clear width : ${this.gameWidth} and clear height : ${this.gameHeight}`)

    }
    update(){
        this.draw();
    }
    move(direction){
        switch(direction){
            case 'up':{
                this.position.y-=this.speed;
                //console.log("moving up update")
            }
            break;
            case 'down':{
                this.position.y+=this.speed;
            }
            break;
            case 'right':{
                this.position.x+=this.speed;
            }
            break;
            case 'left':{
                this.position.x-=this.speed;
            }
            break;
            case 'up_right':{
                this.position.y-=this.speed;
                this.position.x+=this.speed;
            }
            break;
            case 'up_left':{
                this.position.y-=this.speed;
                this.position.x-=this.speed;            
            }
            break;
            case 'down_right':{
                this.position.y+=this.speed;
                this.position.x+=this.speed;            
            }
            break;
            case 'down_left':{
                this.position.y+=this.speed;
                this.position.x-=this.speed;            
            }
            break;
        }
        this.update()
    }
}

