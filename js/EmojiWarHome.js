var about_btn=document.getElementById("about");
var play_btn=document.getElementById("play");

about_btn.addEventListener("click",()=>{window.location='AboutUs.html';});
play_btn.addEventListener("click",()=>{window.location='LevelAndCharacter.html';})

window.onload = function() {
    let homeTrack= document.getElementById("homeTrack");
    homeTrack.volume=0.2;
    homeTrack.play();
}
