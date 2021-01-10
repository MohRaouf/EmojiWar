export  function hitDetected(enemy,player){

    if (enemy.layout.left > player.layout.left &&
        enemy.layout.left < player.layout.right &&
        enemy.layout.bottom > player.layout.top &&
        enemy.layout.bottom < player.layout.bottom) {
        return true;
    }
    //enemy touches the player from UP_LEFT
    if (enemy.layout.right > player.layout.left &&
        enemy.layout.right < player.layout.right &&
        enemy.layout.bottom > player.layout.top &&
        enemy.layout.bottom < player.layout.bottom) {
        return true;
    } 
    //enemy touches the player from DOWN_LEFT
    if (enemy.layout.right > player.layout.left &&
        enemy.layout.right < player.layout.right &&
        enemy.layout.top > player.layout.top &&
        enemy.layout.top < player.layout.bottom) {
        return true;
    } 
    //enemy touches the player from DOWN_RIGHT
    if (enemy.layout.left > player.layout.left &&
        enemy.layout.left < player.layout.right &&
        enemy.layout.top > player.layout.top &&
        enemy.layout.top < player.layout.bottom) {
        return true;
    } else { return false;  }
}

//get random value in range of 2 values
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }