import Player from '/js/player.js';
import InputHandler from '/js/input.js';
import Enmy from '/js/enemy.js';
import { characters } from '/js/characterInfo.js'
import {getRandomInt} from '/js/methods.js'

//Get the GameArea Canvas
var canvas = document.getElementById("gameScreen");

//disable context menu
canvas.oncontextmenu =new Function("return false;")

//Set the Game Area Canvas width and height to match the css info (issue solved)
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

//Get the Canvas Context of the game area 
var context = canvas.getContext("2d");

//Get the Game Area boundary
const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;



//Object Contains all Player Info
var playerInfo = characters[1];
console.log(playerInfo)

//enemy params
var enemyCharacters=['enmy1','enmy2','enmy3']
var enemyGenerationLocation=[{"x":100,"y":0},{"x":200,"y":0},{"x":300,"y":0},{"x":400,"y":0}];

// //Default Enemy INFO
// var enemyInfo = {
//     size:100,
//     speed:50,
//     position:{
//         //random position form a known array
//         x:enemyGenerationLocation[getRandomInt(0,4)].x,
//         y:enemyGenerationLocation[getRandomInt(0,4)].y,
//     },
//     gameWidth:GAME_WIDTH,
//     gameHeight:GAME_HEIGHT,
//     //random health hits
//     health:getRandomInt(0,3),
//     //choose enemy character upon the random health
//     character:document.getElementById(enemyCharacters[health])
// };

//Instance of the Player with speed of 5 pixels
let player = new Player(playerInfo);

var enmy =new Enmy(GAME_WIDTH,GAME_HEIGHT,'enmy',{x:500,y:400},{x:30,y:30},100);
var   enmy2 =new Enmy(GAME_WIDTH,GAME_HEIGHT,'enmy3',{x:700,y:10},{x:30,y:30},120);
var  enmy3 =new Enmy(GAME_WIDTH,GAME_HEIGHT,'enmy2',{x:300,y:100},{x:30,y:30},150);

var enemyArray=[enmy,enmy2,enmy3]
console.log(enemyArray)

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
    context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    for(let i =0; i<enemyArray.length ;i++){
        enemyArray[i].update(deltaTime);
        enemyArray[i].draw(context);
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

