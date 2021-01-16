let loginBtn  = document.getElementById('btn-login'),
    loginUser = document.getElementById('nav-login'),
    logoutBtn = document.getElementById('btn-logout'),
    players;
//get Data from local storage
    if(localStorage.getItem("userData") == null)
    {
        players=[];
    }
    else
    {
        players= JSON.parse(localStorage.getItem("userData")) ;
    }

function is_Login() { 
    let eluserMwgood;
    for(var i=0;i<players.length ;i++)
    {
        players[i].is_login =0;
    }
        logoutBtn.classList.remove('hidden');
        logoutBtn.classList.add('visible');
        loginBtn.classList.remove('visible');
        loginBtn.classList.add('hidden');
 } is_Login();

function logout() {
    for(var i=0;i<players.length ;i++)
    {
        players[i].is_login =0;
    }
    localStorage.setItem("userData" , JSON.stringify(players))
    console.log(players)
    console.log(localStorage.getItem('userData'))
    loginBtn.classList.remove('hidden');
    loginBtn.classList.add('visible');
    logoutBtn.classList.remove('visible');
    logoutBtn.classList.add('hidden');

}logoutBtn.addEventListener("click",logout);

