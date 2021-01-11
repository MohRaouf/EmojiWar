var canvas=document.getElementById("gameScreen");
var context=canvas.getContext('2d');
var active_projectiles=[];
var lastTime=0,nextID=0;
const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;
/*****************this will be replaced with the actual player position*****************/
var player_xpos=20,player_ypos=10;
/**************************************************************************************/
class projectile {
    constructor(initial_pos_x,initial_pos_y,rad,color,velocity_vec){
        this.position={
            x:initial_pos_x,
            y:initial_pos_y
        };
        this.radius=rad;
        this.color=color;
        this.velocity_vec=velocity_vec;
        this.ID=nextID++;
    }
    draw(){
        context.beginPath();
        context.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2,false); 
        context.fillStyle=this.color;
        context.fill();
        this.position.x+=3*(this.velocity_vec.x);
        this.position.y+=3*(this.velocity_vec.y);
        //boarders collision
        if(this.position.y>GAME_HEIGHT-this.radius||this.position.y<0||this.position.x>GAME_WIDTH-this.radius||this.position.x<0){
            this.destroy();
        }
    }
    destroy(){
        for(let i=0;i<active_projectiles.length;i++){
            if(active_projectiles[i].ID==this.ID){
                active_projectiles.splice(i,1);
                break;
            }
        }
    }
}

/*input.js */
canvas.addEventListener('mousedown',on_mouseDown);
function on_mouseDown(e){

    // mouse position is: e.clientX , e.clientY
    let yScale=GAME_HEIGHT/canvas.getBoundingClientRect().height;
    let xScale=GAME_WIDTH/canvas.getBoundingClientRect().width;
    let top=canvas.getBoundingClientRect().top;
    let left=canvas.getBoundingClientRect().left;
    let angle=Math.atan2(((e.clientY-top)*yScale)-player_ypos,((e.clientX-left)*xScale)-player_xpos);
    let velocity_vec={
        x:Math.cos(angle),
        y:Math.sin(angle)
    };
    active_projectiles.push(new projectile(player_xpos,player_ypos,3,'brown',velocity_vec));
}
/* gameloop */
function gameloop(timeStamp)
{
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    /**temp representing fixed player */
    context.beginPath();
    context.arc(player_xpos,player_ypos,6,0,Math.PI*2,false); 
    context.fillStyle="black";
    context.fill();
    /******************** */
    for(let i=0;i<active_projectiles.length;i++){
        active_projectiles[i].draw();
    }
    requestAnimationFrame(gameloop);
}
gameloop();