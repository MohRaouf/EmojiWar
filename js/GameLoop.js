import Player from '/js/player.js';
import InputHandler from '/js/input.js';
import Enemy from '/js/enemy.js';
import {getRandomInt} from '/js/methods.js'
import projectile from '/js/projectile.js'
var canvas = document.getElementById("gameScreen"); //Get the GameArea Canvas
canvas.oncontextmenu =new Function("return false;") //disable context menu

//Set the Game Area Canvas width and height to match the css info (issue solved)
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

var context = canvas.getContext("2d"); //Get the Canvas Context of the game area 
var gameScreen={width:canvas.width,height:canvas.height} //Get the Game Area boundary
let player = new Player(0,gameScreen); //Create the player with Character index=0 
var enemyArray=[new Enemy(getRandomInt(0,3),gameScreen)]; // Create array of Enemies 
var projectiles=[];
//Instance of InputHander to Handle the Key strokes
var inputHandler = new InputHandler(canvas,player);

//First Draw of the Player
player.draw(context,inputHandler.mouse);

export function generate_projectile(mouseX,mouseY){
    projectiles.push(new projectile(player.position,{x:mouseX,y:mouseY},player.projectileIndex,gameScreen));
}
// gameloop 
let lastTime = 0;
function gameLoop(timeStamp) {
    // delta time to 
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    context.clearRect(0, 0, gameScreen.width, gameScreen.height);

    for(let i =0; i<enemyArray.length ;i++){
        enemyArray[i].update(deltaTime,player.position);
        enemyArray[i].draw(context,player.position);
    }
    
    for(let i =0; i<projectiles.length ;i++){
        if(projectiles[i].isHit(enemyArray,player)){
            projectiles.splice(i,1);
            continue;
        }
        projectiles[i].draw(context,deltaTime);
        //console.log(projectiles.length);
        //console.log(projectiles[0].position);
    }
    player.isHit(enemyArray);
    //Move the player to the held directions [from the inputHandler class] befor redraw 
    //DetaTime to make Sure that the game speed is equal on different computers
    player.move(inputHandler.held_directions,deltaTime);

    //Then Draw the Player again
    player.draw(context,inputHandler.mouse);
    
    //detect if the player is shooting and if so fire a projectile and the effects
    player.shoot(inputHandler.isShooting);

   //request a new frame with a recursion to this function
   requestAnimationFrame(gameLoop);
}

//Run the GameLoop for the first time and it will loop forever
gameLoop();

