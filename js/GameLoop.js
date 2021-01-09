import Player from '/js/player.js';
import InputHandler from '/js/input.js'

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
    size: 100,
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
    character:document.getElementById("player")
};

//Instance of the Player with speed of 5 pixels
let player = new Player(playerInfo);

//Instance of InputHander to Handle the Key strokes
var inputHandler = new InputHandler(canvas);

//First Draw of the Player
player.draw(context,inputHandler.mouse);

// gameloop 
let lastTime = 0;
function gameLoop(timeStamp) {
    // delta time to 
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    //detect if the player is shooting
    if(inputHandler.shooting){shootSound.play();}
    
    //Move the player to the held directions[from the inputHandler class] befor redraw 
    //DetaTime to make Sure that the game speed is equal on different computers
    player.move(inputHandler.held_directions,deltaTime);

    //Then Draw the Player again
    player.draw(context,inputHandler.mouse);

    //request a new frame with a recursion to this function
    requestAnimationFrame(gameLoop)
}

//Run the GameLoop for the first time and it will loop forever
gameLoop();
