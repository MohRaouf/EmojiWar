import Player from '/js/player.js';
import InputHandler from '/js/input.js';
import Enemy from '/js/enemy.js';

//Get the GameArea Canvas
var canvas = document.getElementById("gameScreen");

//disable contect menu
canvas.oncontextmenu =new Function("return false;")

//lood shoot sound
var shootSound=document.getElementById("shoot")
//var shootSound=$("#shoot") //doesn't work

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
//Instance of the Player with speed of 5 pixels
let player = new Player(playerInfo);
//console.log(player.position)
let enemy1 =new Enemy(GAME_WIDTH,GAME_HEIGHT,'enemy1',{x:10,y:10},{x:1,y:1},60),
    enemy2 =new Enemy(GAME_WIDTH,GAME_HEIGHT,'enemy2',{x:700,y:10},{x:2,y:2},40),
    enemy3 =new Enemy(GAME_WIDTH,GAME_HEIGHT,'enemy3',{x:300,y:GAME_HEIGHT-100},{x:2,y:2},70);
   
console.log(Enemy.counter)

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

    //Move the player to the held directions [from the inputHandler class] befor redraw 
    //DetaTime to make Sure that the game speed is equal on different computers
    player.move(inputHandler.held_directions,deltaTime);

    //Then Draw the Player again
    player.draw(context,inputHandler.mouse);
    
    //detect if the player is shooting and if so fire a projectile and the effects
    player.shoot(inputHandler.isShooting);
  
    enemy1.update(deltaTime);
    enemy1.draw(context,player.position.x,player.position.y);
    enemy2.update(deltaTime);
    enemy2.draw(context,player.position.x,player.position.y);
    enemy3.update(deltaTime);
    enemy3.draw(context,player.position.x,player.position.y);
    // for(let i=0;i<3;i++){
    //      enemies.push(enemy)
    //      enemies[i].update(deltaTime);
    //      enemies[i].draw(context);
    //   if(Enemy.counter==10)break;
    // }
   

 
   //request a new frame with a recursion to this function
   requestAnimationFrame(gameLoop);
  
   //enemyCreation(deltaTime,context);
   
}

//Run the GameLoop for the first time and it will loop forever
gameLoop();
enemyCreation(1,1)


console.log(enemies)
