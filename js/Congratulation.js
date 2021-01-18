const winnerMsg = document.querySelector(".winnerMsg")
const bronze = document.querySelector(".bronze");
const silver = document.querySelector(".silver");
const gold = document.querySelector(".gold");
const platinum = document.querySelector(".platinum");
const looser = document.querySelector(".looser");
const nextlevelBtn = document.querySelector(".nextlevelBtn");

function containerResult(score) {
    if (score == 0) {
        silver.style.display = 'none';
        gold.style.display = 'none';
        platinum.style.display = 'none';
        bronze.style.display = 'block';
        congratAudio.play();
        confetti.start();
    } else if (score == 1) {
        bronze.style.display = 'none';
        gold.style.display = 'none';
        platinum.style.display = 'none';
        silver.style.display = 'block';
        congratAudio.play();
        confetti.start();
    } else if (score == 2) {
        bronze.style.display = 'none';
        silver.style.display = 'none';
        platinum.style.display = 'none';
        gold.style.display = 'block';
        congratAudio.play();
        confetti.start();
    } else if (score == 3) {
        bronze.style.display = 'none';
        silver.style.display = 'none';
        gold.style.display = 'none';
        platinum.style.display = 'block';
        congratAudio.play();
        confetti.start();
    } else if (score < 0) {
        winnerMsg.style.display = 'none';
        bronze.style.display = 'none';
        platinum.style.display = 'none';
        nextlevelBtn.style.display = 'none';
        looser.style.display = 'block';
        confetti.stop();
    }
}
var congratAudio = new Audio("src/sound/Congrat.mp3");