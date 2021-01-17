let characterImg   = document.getElementById('character'),
    badgesOverlay  = document.querySelectorAll('.badge-item .overlay'),
    lockBadges     = document.querySelectorAll('.badges p'),
    badgeMessage   = document.querySelectorAll('.badges h2'),
    welecomeParag  = document.getElementById('welecome_user'),
    users          = JSON.parse(localStorage.getItem("userData"));

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

}setInterval(change_character,4000)

function changeBadges(){
    let   eluserMwgood  ;
  for(var i=0;i<users.length ;i++)
  {
     if(users[i].is_login ==1) {
      eluserMwgood=i;
     }
  }
  let youbadges = users[eluserMwgood].badges;
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

for(var i=0;i<users.length ;i++)
{
   if(users[i].is_login ==1) {
    changeBadges()
   }
}