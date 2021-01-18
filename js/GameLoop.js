import Player from '/js/player.js';
import InputHandler from '/js/input.js';
import Enemy from '/js/enemy.js';

import projectile from '/js/projectile.js'
import { getRandomInt, setLevelConfig } from '/js/methods.js'

//lood shoot sound
var shootSound=document.getElementById("shoot")
//var shootSound=$("#shoot") //doesn't work
var canvas = document.getElementById("gameScreen"); //Get the GameArea Canvas
canvas.oncontextmenu =new Function("return false;") //disable context menu
//Set the Game Area Canvas width and height to match the css info (issue solved)
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;
//Get the Canvas Context of the game area 
var context = canvas.getContext("2d");

//Get the Game Area boundary
const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

//Object Contains all Player Info
var playerInfo = {
    size: 130,
    speed: 50,
    posX: function () {
        //Center width
        return GAME_WIDTH / 2 - this.size / 2;
    },
    posY: function () {
        //Center height
        return GAME_HEIGHT / 2 - this.size / 2;
    },
    gameWidth:GAME_WIDTH,
    gameHeight:GAME_HEIGHT,
    character:document.getElementById("player"),
    shootingSound:shootSound
};
const enemies=[];
//enemy params
let enemyCharacters=['enmy1','enmy2','enmy3'],
enemyGenerationLocation=[{x:100,y:0},{x:200,y:0},{x:300,y:0},{x:400,y:0}];

//let enemy1 =new Enemy(GAME_WIDTH,GAME_HEIGHT,'enemy1',{x:10,y:10},{x:1,y:1},60),
//Default Enemy INFO
var enemyInfo = {
    size:100,
    speed:{x:1,y:1},
    position:{
        //random position form a known array
        x:Math.random()*GAME_WIDTH,
        y:Math.random()*GAME_HEIGHT
    },
    gameWidth:GAME_WIDTH,
    gameHeight:GAME_HEIGHT,
    //random health hits
    //health:getRandomInt(0,3),
    //choose enemy character upon the random health
    //character:document.getElementById(enemyCharacters[health])
};
function enemyCreation(deltaTime,context){
    const Size =Math.round(Math.random()*(100-40)+40);
    let x,y,imgId='enemy1';
    if(Math.random()<.5){
        x=Math.random()<.5?0-Size:GAME_WIDTH+Size;
        y=Math.random()*GAME_HEIGHT;
    }
    else{
        x=Math.random()*GAME_WIDTH;
        y=Math.random()<.5?0-Size:GAME_HEIGHT+Size;
    }
   const angle  = Math.atan2(
        GAME_HEIGHT/2 -y ,
        GAME_WIDTH/2 -x
    ) ;
    const speed={
        x:Math.cos(angle),
        y:Math.sin(angle)
    }
    if(enemies.length!=10){
        enemies.push(new Enemy(GAME_WIDTH,GAME_HEIGHT,
            imgId,{x:x,y:y},{x:speed.x,y:speed.y},Size)) 
        
        }
    }
//console.log(player.position)
let enemy1 =new Enemy(GAME_WIDTH,GAME_HEIGHT,'enemy1',{x:10,y:10},{x:1,y:1},60),
    enemy2 =new Enemy(GAME_WIDTH,GAME_HEIGHT,'enemy2',{x:700,y:10},{x:2,y:2},40),
    enemy3 =new Enemy(GAME_WIDTH,GAME_HEIGHT,'enemy3',{x:300,y:GAME_HEIGHT-100},{x:2,y:2},70);
   
console.log(Enemy.counter)

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
