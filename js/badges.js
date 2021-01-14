let characterImg   = document.getElementById('character'),
    badgesOverlay  = document.querySelectorAll('.badge-item .overlay'),
    lockBadges     = document.querySelectorAll('.badges p'),
    badgeMessage   = document.querySelectorAll('.badges h2'),
    welecomeParag  = document.getElementById('welecome_user'),
    buttonsLogin    = document.querySelectorAll('.nav-login button');
    console.log(buttonsLogin)
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

function changeBadges(){
    let {userName , badges , level ,score,is_login} = JSON.parse(localStorage.getItem('userData')),
        youbadges = badges;
    switch(youbadges){
        case 1:
            takeBronze()
            break;
        case 2:
            takeBronze();
            takeSliver();
            break;
        case 3:
            takeBronze();
            takeSliver();
            takeGold();
            break;
        case 4:
            takeBronze();
            takeSliver();
            takeGold();
            takePlatinum();
            break;
    }
}

function takeBronze () {
    lockBadges[0].innerHTML='<span><i class="fas fa-trophy "></i></span><span>';
    badgeMessage[0].innerHTML="congratulations <br> you got it";
  }
function takeSliver () {
    lockBadges[1].innerHTML='<span><i class="fas fa-trophy "></i></span><span>';
    badgeMessage[1].innerHTML="congratulations <br> you got it";
}
function takeGold(){
    lockBadges[2].innerHTML='<span><i class="fas fa-trophy "></i></span><span>';
    badgeMessage[2].innerHTML="congratulations <br> you got it";
}
function takePlatinum(){
    lockBadges[3].innerHTML='<span><i class="fas fa-trophy "></i></span><span>';
    badgeMessage[3].innerHTML="congratulations <br> you got it";
}
let {userName , badges , level ,score,is_login} = JSON.parse(localStorage.getItem('userData'))
if(is_login==1){
    changeBadges()
}
else{
    for(let i =0;i<badgeMessage.length;i++){
        lockBadges[i].innerHTML='<span><i class="fas fa-lock"></i><span>';
        if(i==0){   
            badgeMessage[i].innerHTML=`we will get it after register`;
        }
        badgeMessage[i].innerHTML=`win level ${i} to get`
    }
}

