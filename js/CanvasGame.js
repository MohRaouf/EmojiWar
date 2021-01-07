import Player from '/js/player.js';
import InputHandler from '/js/input.js'

let canvas=document.getElementById("gameScreen");
canvas.width=canvas.getBoundingClientRect().width;
canvas.height=canvas.getBoundingClientRect().height;
let context = canvas.getContext("2d");



console.log(` Context Width ${canvas.getBoundingClientRect().width}`);
const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

console.log(`game width : ${GAME_WIDTH} , game height : ${GAME_HEIGHT}`)

let player = new Player(GAME_WIDTH,GAME_HEIGHT,20,context);
//context.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
player.draw();
new InputHandler(player);


// // gameloop for the enemies and projectiles 
// let lastTime=0;
// function gameLoop(timeStamp){
//     let deltaTime = timeStamp-lastTime;
//     lastTime=timeStamp;
//     console.log("1")
//     context.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
//     console.log("1")

//     // player.update(deltaTime)
//     player.draw(context);
//     requestAnimationFrame(gameLoop)
// }
// gameLoop();
