var canvas=document.getElementById("gameScreen");
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;
const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

//Game characters 
export var characters =[
    {
        size: 120,
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
        character:document.getElementById("character1"),
        shootingSound:document.getElementById("shoot1"),
        hurtSound:document.getElementById("maleHurt"),
        health:5
    },
    {
        size: 150,
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
        character:document.getElementById("character2"),
        shootingSound:document.getElementById("shoot1"),
        hurtSound:document.getElementById("femaleHurt"),
        health:5
    },
    {
        size: 120,
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
        character:document.getElementById("character3"),
        shootingSound:document.getElementById("shoot1"),
        hurtSound:document.getElementById("maleHurt"),
        health:5
    }
] 