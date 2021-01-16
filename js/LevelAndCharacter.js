var select_map_btn=document.getElementById("select_level");
var play_btn=document.getElementById("play");
var change_character=document.getElementById("changeCharacter")
var emojis_section=document.getElementsByClassName("available_Emojis")[0];
var maps_section=document.getElementsByClassName("levels")[0];
var emoChoises=document.getElementsByClassName("emo");
var mapChoises=document.getElementsByClassName("lev");
var msg=document.getElementsByClassName("msg");
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

        for(let i=0;i<3;i++){
            mapChoises[i].style.marginTop="2vh";
            if(index==i){
                mapChoises[i].style.width="30%";
                mapChoises[i].style.height="31vh";
                mapChoises[i].style.border="0.25px solid #db9b66";
                mapChoises[i].style.background="linear-gradient(45deg,#000,#836231,#000,#836231,#000)";
                emoChoises[i].style.marginBottom=emoChoises[i].style.marginTop= "1vh";
                emoChoises[i].style.marginLeft=emoChoises[i].style.marginRight= "1%";
            }
            else{
                mapChoises[i].style.width="25%";
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
    msg[0].style.display="none";
    msg[1].style.display="block";
    select_map_btn.style.display="none";
    play_btn.style.display="inline-block";
    change_character.style.display="inline-block";
    emojis_section.style.display="none";
    maps_section.style.display="block";
    msg[1].innerHTML = msg[1].textContent.replace(/\S/g,"<span class='letter'>$&</span>");
    anime.timeline({loop: false})
        .add({
        targets: msg[1],
        scale: [4,1],
        opacity: [0,1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 5000,
        delay: 10
        }).add({
        targets: msg[1],
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
        });
    msg[1].innerHTML='<label>S</label>elect <label>T</label>he <label>M</label>ap <label>O</label>F <label>T</label>he <label>W</label>ar';
}
function choose_character(){
    msg[1].style.display="none";
    msg[0].style.display="block";
    select_map_btn.style.display="block";
    play_btn.style.display="none";
    change_character.style.display="none";
    emojis_section.style.display="block";
    maps_section.style.display="none";
    msg[0].innerHTML = msg[0].textContent.replace(/\S/g,"<span class='letter'>$&</span>");
    anime.timeline({loop: false})
        .add({
        targets: msg[0],
        scale: [4,1],
        opacity: [0,1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 5000,
        delay: 10
        }).add({
        targets: msg[0],
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
        });
    msg[0].innerHTML='<label>C</label>hoose <label>E</label>moji <label>t</label>o <label>E</label>nter <label>t</label>he <label>w</label>ar';

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
for(let i=0;i<3;i++)
    mapChoises[i].addEventListener("click",change_selected_map(i));
play_btn.addEventListener("click",play);
change_character.addEventListener("click",choose_character);
