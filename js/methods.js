import Enemy from "/js/enemy.js";

export function hitDetected(enemy, player) {
    var tolerance = enemy.size / 4;
    //enemy touches the player from UP_RIGHT
    if (enemy.layout.left + tolerance > player.layout.left &&
        enemy.layout.left + tolerance < player.layout.right &&
        enemy.layout.bottom - tolerance > player.layout.top &&
        enemy.layout.bottom - tolerance < player.layout.bottom) {
        return true;
    }
    //enemy touches the player from UP_LEFT
    if (enemy.layout.right - tolerance > player.layout.left &&
        enemy.layout.right - tolerance < player.layout.right &&
        enemy.layout.bottom - tolerance > player.layout.top &&
        enemy.layout.bottom - tolerance < player.layout.bottom) {
        return true;
    }
    //enemy touches the player from DOWN_LEFT
    if (enemy.layout.right - tolerance > player.layout.left &&
        enemy.layout.right - tolerance < player.layout.right &&
        enemy.layout.top + tolerance > player.layout.top &&
        enemy.layout.top + tolerance < player.layout.bottom) {
        return true;
    }
    //enemy touches the player from DOWN_RIGHT
    if (enemy.layout.left + tolerance > player.layout.left &&
        enemy.layout.left + tolerance < player.layout.right &&
        enemy.layout.top + tolerance > player.layout.top &&
        enemy.layout.top + tolerance < player.layout.bottom) {
        return true;
    } else { return false; }
}

var levelsInfo = [{
    map: "/src/images/mission1.png",
    track: document.getElementById("trackLevel1")
},
{
    map: "/src/images/mission2.png",
    track: document.getElementById("trackLevel2")
},
{
    map: "/src/images/mission3.png",
    track: document.getElementById("trackLevel3")
}]

//get random value in range of 2 values
export function setLevelConfig(level) {
    $('canvas').css("background-image", "url(" + levelsInfo[level].map + ")");
    let track = levelsInfo[level].track;
    track.volume = 0.2;
    track.play();
    Enemy.level = level;
}

//get random value in range of 2 values
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}