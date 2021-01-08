$(document).ready(function(){
    
})

$(".winner").click(function () {
    $(".container2").show();
    $("#cong").show();
    $(".action").show();
    appendBadges();
    confetti.start();
    congratAudio.play();
    soundTrack.pause();
})
$(".looser").click(function () {
    $(".container2").show();
    $("#loos").show();
    $(".action").show();
    $("#loos").append(
        `<figure>
                <img src="imgs/sad(2).png" >
                <figcaption>DONT' LEAVE </figcaption>
            </figure>`
    )
})
function appendBadges() {
    var score = 1000;
    if (score == 1000) {
        $(".badgesImg").append(
            `<figure>
                <img src="imgs/Gold.png">
                <figcaption>YOUR GOT GOLD MEDAL</figcaption>
            </figure>`
        )
    }
}
var congratAudio = new Audio("audio/Congrat.mp3");
var btnClick = new Audio("audio/btnClick.mp3");
var soundTrack = new Audio("audio/intro.mp3");
$(".tryBtn").click(function(){btnClick.play(); soundTrack.play();})
$("input").click(function(){btnClick.play();})