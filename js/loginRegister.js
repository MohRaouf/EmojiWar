let loginsSection   = document.getElementById('login'),
    registerSection = document.getElementById('register'),
    nav_to_login    = document.getElementById('login-nav'),
    nav_to_register = document.getElementById('register-nav'),
    registerBtn     = document.getElementById('register-btn'),
    nameInput       = document.getElementById('register-name'),
    loginBtn        = document.getElementById('login-btn'),
    userloginName   = document.getElementById('userName'),
    errorRegister   = document.getElementById('error_register'),
    errorLogin      = document.getElementById('error_login'),
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
 //Display login section and Hide Register   
function loginPage(){
    loginsSection.classList.remove('hidden');
    loginsSection.classList.add('visible');
    registerSection.classList.remove('visible');
    registerSection.classList.add('hidden');

 }  nav_to_login.addEventListener('click',loginPage);

  //show Register section and Hide login   
 function RegisterPage(){
    registerSection.classList.remove('hidden');
    registerSection.classList.add('visible');
    loginsSection.classList.remove('visible');
    loginsSection.classList.add('hidden');

 }  nav_to_register.addEventListener('click',RegisterPage);

 //register new user and save his Data in loacl Storage
 function Register(e) {
    if(nameInput.value===''){
        errorRegister.innerHTML="please Insert vaild name";
        e.preventDefault();
    }
    if(players.length==0){
            one_player = {
            userName     : nameInput.value,

            lastNickname : nameInput.value,
            badges       : 1,
            level        : 1,
            score        : 0,
            maxCharacter :1,
            is_login     :1,
        }
        players.push(one_player);
        current_player=one_player;
        localStorage.setItem("userData" , JSON.stringify(players))
        e.preventDefault();
        window.location.href='index.html';
    }
    else {
        for(var i=0;i<players.length ;i++){
            players[i].is_login=0;
        }
        one_player = {
            userName     : nameInput.value,

            lastNickname : nameInput.value,
            badges       : 1,
            level        : 1,
            score        : 0,
            maxCharacter : 1,
            is_login     : 1,
        }
        players.push(one_player);
        current_player=one_player;
        localStorage.setItem("userData" , JSON.stringify(players))
        e.preventDefault();
        window.location.href='index.html';
    }
    
    } registerBtn.addEventListener('click',Register);

function Login(e){
    if(localStorage.getItem("userData") == null)
    {
        errorLogin.innerHTML="No Data, please Register";
        e.preventDefault();
    }
    else {
        players= JSON.parse(localStorage.getItem("userData")) ;
        let eluserMwgood = false;
        for(var i=0;i<players.length ;i++){
            if(players[i].userName == userloginName.value){

                current_player=players[i];
                eluserMwgood = true; 
                players[i].is_login=1;
                break;
            }
        }
        localStorage.setItem("userData" , JSON.stringify(players))
        if(eluserMwgood == false){
            errorLogin.innerHTML="user doesn't exist";
            e.preventDefault();
        }
        else{
            window.location.href='index.html';
            e.preventDefault();
        }
    }
 }loginBtn.addEventListener('click',Login)

