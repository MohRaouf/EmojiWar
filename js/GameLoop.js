import Player from '/js/player.js';
import InputHandler from '/js/input.js';
import Enemy from '/js/enemy.js';
import {getRandomInt,setLevelConfig} from '/js/methods.js'

var canvas = document.getElementById("gameScreen"); //Get the GameArea Canvas
canvas.oncontextmenu =new Function("return false;") //disable context menu

//Set the Game Area Canvas width and height to match the css info (issue solved)
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

var context = canvas.getContext("2d"); //Get the Canvas Context of the game area 
var gameScreen={width:canvas.width,height:canvas.height} //Get the Game Area boundary

let gameLevel=0; //set these vars from local storage
let character=2; //set these vars from local storage

setLevelConfig(gameLevel); //set chosen game Level
let player = new Player(character,gameScreen); //Create the player with Character index=0 
var enemyArray=[new Enemy(getRandomInt(0,3),gameScreen)]; // Create array of Enemies 

//Instance of InputHander to Handle the Key strokes
var inputHandler = new InputHandler(canvas,player);

//First Draw of the Player
player.draw(context,inputHandler.mouse);

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

