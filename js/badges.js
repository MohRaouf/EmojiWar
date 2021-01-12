var characterImg = document.getElementById('character');

//change character Img every 2 seconds
function character_one() {
    characterImg.setAttribute('src', "src/images/characters/character2.png");
}

function character_two() {
    characterImg.setAttribute('src', "src/images/characters/character3.png");
}

function character_three() {
    characterImg.setAttribute('src', "src/images/characters/character4.png");
}
function change_character () {  
    character_one();
    setTimeout(character_two, 1000);
    setTimeout(character_three, 2000);
}
setInterval(change_character,4000)
