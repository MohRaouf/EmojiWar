var canvas = document.getElementById("action");
var circle=2*Math.PI;
context= canvas.getContext('2d');
function drawExplosion()
{
    context.arc(200, 200, 30, 0 ,circle);
    context.lineWidth=15;
    context.fillStyle='yellow';
    context.strokeStyle='orange';
    context.fill();
    context.stroke();
}
function drawPullet()
{
    context.arc(350, 350, 5, 0 ,circle);
    context.lineWidth=2;
    context.fillStyle='yellow';
    context.strokeStyle='orange';
    context.fill();
}

function fadeOut() {
    
}
let posX=200;
let posY=200;
function enemyPosition(posX,posY){
    if(posX && posY)
        drawExplosion();
        fadeOut();
}
enemyPosition(posX,posY);
let posX2 = 400; 
let posY2 = 400;
function characterPosition(posX2,posY2){
    if(posX2 & posY2)
    {
        drawPullet();
    }
}
characterPosition(posX2,posY2);