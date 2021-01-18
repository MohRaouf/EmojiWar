let loginBtn  = document.getElementById('btn-login'),
    loginUser = document.getElementById('nav-login'),
    logoutBtn = document.getElementById('btn-logout'),
    players   = [] ;
var current_player,selected_character,selected_level;
//get Data from local storage
    
function is_Login() { 
    let eluserMwgood;
    players= JSON.parse(localStorage.getItem("userData")) ;
    for(var i=0;i<players.length ;i++)
    {
       if(players[i].is_login ==1) {
            eluserMwgood=true;
            current_player=players[i];
       }
    }
    if(eluserMwgood==true){
        logoutBtn.classList.remove('hidden');
        logoutBtn.classList.add('visible');
        loginBtn.classList.remove('visible');
        loginBtn.classList.add('hidden');
    }
 } is_Login();
function logout() {
    let players= JSON.parse(localStorage.getItem("userData")) ;
    for(var i=0;i<players.length ;i++)
    {
        players[i].is_login =0;
        current_player=undefined;
        window.location.reload();
    }
    localStorage.setItem("userData" , JSON.stringify(players))
    console.log(players)
    console.log(localStorage.getItem('userData'))
    loginBtn.classList.remove('hidden');
    loginBtn.classList.add('visible');
    logoutBtn.classList.remove('visible');
    logoutBtn.classList.add('hidden');
}logoutBtn.addEventListener("click",logout);
