var select_map_btn=document.getElementById("select_level");
var play_btn=document.getElementById("play");
var change_character=document.getElementById("changeCharacter")
var emojis_section=document.getElementsByClassName("available_Emojis")[0];
var maps_section=document.getElementsByClassName("levels")[0];
var emoChoises=document.getElementsByClassName("emo");
var mapChoises=document.getElementsByClassName("lev");
var nick_name=document.getElementById("nickname");
var locked=[false,true,true];
var selected_emoji=-1;
var selected_map=-1;
function change_selected_emoji(index){
    return function(){
        selected_emoji=index;
        select_map_btn.disabled = false;
        for(let i=0;i<3;i++){
            if(index==i){
                emoChoises[i].style.width="29%";
                emoChoises[i].style.height="31vh";
                emoChoises[i].style.border="0.25px solid #db9b66";
                emoChoises[i].style.background="linear-gradient(45deg,#000,#836231,#000,#836231,#000)";
                emoChoises[i].style.margin= "1vh 3%";
            }
            else{
                emoChoises[i].style.width="25%";
                emoChoises[i].style.height="75%";
                emoChoises[i].style.border="0px";
                emoChoises[i].style.background="transparent";
                emoChoises[i].style.margin="4% 3% 4% 3%";
            }
        }
    }
}
function change_selected_map(index){
    return function(){
        selected_map=index;
        play_btn.disabled = false;
        for(let i=0;i<4;i++){
            if(index==i){
                mapChoises[i].style.width="24%";
                mapChoises[i].style.height="31vh";
                mapChoises[i].style.border="0.25px solid #db9b66";
                mapChoises[i].style.background="linear-gradient(45deg,#000,#836231,#000,#836231,#000)";
                emoChoises[i].style.marginBottom=emoChoises[i].style.marginTop= "1vh";
                emoChoises[i].style.marginLeft=emoChoises[i].style.marginRight= "1%";
            }
            else{
                mapChoises[i].style.width="20%";
                mapChoises[i].style.height="75%";
                mapChoises[i].style.border="0px";
                mapChoises[i].style.background="transparent";
                mapChoises[i].style.marginBottom=mapChoises[i].style.marginTop="1vh";
                emoChoises[i].style.marginLeft=emoChoises[i].style.marginRight= "1%";
            }
        }
    }
}
function choose_map(){
    select_map_btn.style.display="none";
    play_btn.style.display="inline-block";
    change_character.style.display="inline-block";
    emojis_section.style.display="none";
    maps_section.style.display="block";
}
function choose_character(){
    select_map_btn.style.display="block";
    play_btn.style.display="none";
    change_character.style.display="none";
    emojis_section.style.display="block";
    maps_section.style.display="none";
}
function play(e){
    if(nick_name.value=="")
        e.preventDefault();
}
nick_name.value="Unnamed_Emo"
select_map_btn.disabled = true;
play_btn.disabled = true;
for(let i=0;i<3;i++)
    emoChoises[i].addEventListener("click",change_selected_emoji(i));
select_map_btn.addEventListener("click", choose_map);
for(let i=0;i<4;i++)
    mapChoises[i].addEventListener("click",change_selected_map(i));
play_btn.addEventListener("click",play);
change_character.addEventListener("click",choose_character);
