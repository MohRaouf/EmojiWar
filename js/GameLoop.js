import Player from '/js/player.js';
import InputHandler from '/js/input.js';
import Enemy from '/js/enemy.js';

import projectile from '/js/projectile.js'
import { getRandomInt, setLevelConfig } from '/js/methods.js'

var canvas = document.getElementById("gameScreen"); //Get the GameArea Canvas
canvas.oncontextmenu = new Function("return false;") //disable context menu

//Set the Game Area Canvas width and height to match the css info (issue solved)
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

var context = canvas.getContext("2d"); //Get the Canvas Context of the game area 
var gameScreen = { width: canvas.width, height: canvas.height } //Get the Game Area boundary

let gameLevel = 1; //set these vars from local storage
let character = 1; //set these vars from local storage

setLevelConfig(gameLevel); //set chosen game Level
let player = new Player(character, gameScreen); //Create the player with Character index=0 
var enemyArray = [new Enemy(getRandomInt(0, 3), gameScreen)]; // Create array of Enemies 
var projectiles = [];
//Instance of InputHander to Handle the Key strokes
var inputHandler = new InputHandler(canvas, player);
var particles = [];

//First Draw of the Player
player.draw(context, inputHandler.mouse);

export function generate_projectile(mouseX, mouseY) {
    projectiles.push(new projectile(player, { x: mouseX, y: mouseY }));
}
// gameloop 
let lastTime = 0;
function gameLoop(timeStamp) {
    // delta time to 
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    context.clearRect(0, 0, gameScreen.width, gameScreen.height);

    for (let i = 0; i < enemyArray.length; i++) {
        enemyArray[i].update(deltaTime, player.position);
        enemyArray[i].draw(context, player.position);
    }

    for (let i = 0; i < projectiles.length; i++) {
        projectiles[i].draw(context, deltaTime);
        if (projectiles[i].isHit(enemyArray, player,context,particles)) {
            projectiles.splice(i, 1);
        }
    }
    player.isHit(enemyArray); // player damaged   
    player.move(inputHandler.held_directions, deltaTime); //Move the player to the held directions
    player.draw(context, inputHandler.mouse);             //Then Draw the Player

    // particles.forEach((particle, index) => {
    //     //[7]particles fadeout
    //     if (particle.alpha <= 0) {

    //         particles.splice(index, 1)
    //     } else {
    //         particle.update();
    //     }
    // })
    //[7]explosion of enemy
 

    //detect if the player is shooting and if so fire a projectile and the effects
    player.shoot(inputHandler.isShooting);

    //request a new frame with a recursion to this function
    requestAnimationFrame(gameLoop);
}

//Run the GameLoop for the first time and it will loop forever
gameLoop();

