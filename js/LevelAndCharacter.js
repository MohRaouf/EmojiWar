var select_level_btn=document.getElementById("select_level");
var play_btn=document.getElementById("play");
var emojis_section=document.getElementsByClassName("available_Emojis")[0];
var levels_section=document.getElementsByClassName("levels")[0];
var emoChoises=document.getElementsByClassName("emo");
var levChoises=document.getElementsByClassName("lev");
var nick_name=document.getElementById("nickname");
var locked=[false,true,true];
var selected_emoji=-1;
var selected_level=-1;
function on_click_unlocked(){
    for(let i=0;i<3;i++){
        if(locked[i]===false){
            selected_level=i;
            play_btn.disabled = false;
            levChoises[i].style.width="29%";
            levChoises[i].style.height="98%";
            levChoises[i].style.border="0.25px solid #db9b66";
            levChoises[i].style.background="linear-gradient(45deg,#000,#836231,#000,#836231,#000)";
            levChoises[i].style.margin="2% 0% 0% 0%";
        }
    }
}
function choose_level(){
    emojis_section.style.display="none";
    levels_section.style.display="block";
    select_level_btn.style.display="none";
    play_btn.style.display="block";
    for(let i=0;i<3;i++){
        if(locked[i]===false){
            emoChoises[i].addEventListener("click",on_click_unlocked);
            if(selected_emoji===0)
                document.getElementsByTagName("img")[3].setAttribute("src","../EmojiWar/src/images/laughing_emoji.png");
            else if(selected_emoji===1)
                document.getElementsByTagName("img")[3].setAttribute("src","../EmojiWar/src/images/smile_with_hearts.png");            
            else if(selected_emoji===2)
                document.getElementsByTagName("img")[3].setAttribute("src","../EmojiWar/src/images/sarcastic_emoji.png");            
        }
        else 
            document.getElementsByTagName("img")[3+i].setAttribute("src","../EmojiWar/src/images/locked.png");                    
    }    
}
function change_selected_emoji(index){
    return function(){
        selected_emoji=index;
        select_level_btn.disabled = false;
        for(let i=0;i<emoChoises.length;i++){
            if(index==i){
                emoChoises[i].style.width="29%";
                emoChoises[i].style.height="98%";
                emoChoises[i].style.border="0.25px solid #db9b66";
                emoChoises[i].style.background="linear-gradient(45deg,#000,#836231,#000,#836231,#000)";
                emoChoises[i].style.margin="2% 0% 0% 0%";
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
function play(e){
    if(nick_name.value=="")
        e.preventDefault();
}
nick_name.value="Unnamed_Emo"
select_level_btn.disabled = true;
play_btn.disabled = true;
emoChoises[0].addEventListener("click",change_selected_emoji(0));
emoChoises[1].addEventListener("click",change_selected_emoji(1));
emoChoises[2].addEventListener("click",change_selected_emoji(2));
select_level_btn.addEventListener("click", choose_level);
for(let i=0;i<3;i++){
    if(locked[i]===false)
        levChoises[i].addEventListener("click",on_click_unlocked);
}
play_btn.addEventListener("click",play);
