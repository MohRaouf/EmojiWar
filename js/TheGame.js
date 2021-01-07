

var player = document.getElementById("player");
var container = document.getElementsByClassName("gameArea")[0];

var playerLeft=container.clientWidth/2 - player.clientHeight/2;
var playerTop =container.clientHeight/2 - player.clientHeight/2;
player.style.left=playerLeft+'px';
player.style.top=playerTop+'px';


function Move(e){
    console.log(container.style.width)

    console.log(e.keyCode);
    //Right
    if(e.keyCode==39||e.keyCode==68){
        playerLeft+=20;
        player.style.left=playerLeft+'px';
        console.log(player.style.left);
    }
    //Leftdd
    if(e.keyCode==37 ||e.keyCode==65){
        playerLeft-=20;
        player.style.left=playerLeft+'px';
    }
    //Up
    if(e.keyCode==38 ||e.keyCode==87){
        playerTop-=20;
        player.style.top=playerTop+'px';
        console.log(player.style.top);
    }
    //Down
    if(e.keyCode==40 ||e.keyCode==83){
        playerTop+=20;
        player.style.top=playerTop+'px';
    }
}

document.addEventListener('keydown',Move)
