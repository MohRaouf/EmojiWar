import Player from '/js/player.js';
import InputHandler from '/js/input.js';
import Enemy from '/js/enemy.js';
import projectile from '/js/projectile.js'
import { getRandomInt, setLevelConfig ,containerResult} from '/js/methods.js'

function getParameterByName(name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return 0;
    if (!results[2]) return 0;
    return parseInt(decodeURIComponent(results[2].replace(/\+/g, ' '))[0]);
}

var canvas = document.getElementById("gameScreen"); //Get the GameArea Canvas
canvas.oncontextmenu = new Function("return false;") //disable context menu

//Set the Game Area Canvas width and height to match the css info (issue solved)
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

var context = canvas.getContext("2d"); //Get the Canvas Context of the game area 
var gameScreen = { width: canvas.width, height: canvas.height } //Get the Game Area boundary

var levelTrack = setLevelConfig(getParameterByName("level", window.location)); //set chosen game Level
let player = new Player(getParameterByName("character", window.location), gameScreen); //Create the player with Character index=0 
var enemyArray = [new Enemy(getRandomInt(0, 3), gameScreen)]; // Create array of Enemies 
var projectiles = [];
//Instance of InputHander to Handle the Key strokes
var inputHandler = new InputHandler(canvas, player);
var particles = [];

// player.winFlag=1;

//First Draw of the Player
player.draw(context, inputHandler.mouse);

export function generate_projectile(mouseX, mouseY) {
    projectiles.push(new projectile(player, { x: mouseX, y: mouseY }));
}

/**********************************gameloop*********************************** */
let lastTime = 0;
function gameLoop(timeStamp) {
    let ifWin = player.winFlag;
    if (ifWin == 1 || ifWin == 0) {
        levelTrack.pause();
        if (ifWin == 1) {
            //win
            document.getElementById("winTrack").play();
            containerResult((levelTrack+1));
            confetti.start();
        }
        else {
            //lost
            document.getElementById("loseTrack").play();
            containerResult(-1);
        }
    }
    else {
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
            if (projectiles[i].isHit(enemyArray, player, context, particles)) {
                projectiles.splice(i, 1);
            }
        }
        player.isHit(enemyArray); // player damaged   
        player.move(inputHandler.held_directions, deltaTime); //Move the player to the held directions
        player.draw(context, inputHandler.mouse);             //Then Draw the Player

        //detect if the player is shooting and if so fire a projectile and the effects
        player.shoot(inputHandler.isShooting);
        //request a new frame with a recursion to this function
        requestAnimationFrame(gameLoop);
    }
}

//Run the GameLoop for the first time and it will loop forever
gameLoop();

