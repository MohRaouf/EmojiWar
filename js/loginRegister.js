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
    userData        = {}
   
function loginPage(){
    loginsSection.classList.remove('hidden');
    loginsSection.classList.add('visible');
    registerSection.classList.remove('visible');
    registerSection.classList.add('hidden');

 }  nav_to_login.addEventListener('click',loginPage);

 function RegisterPage(){
    registerSection.classList.remove('hidden');
    registerSection.classList.add('visible');
    loginsSection.classList.remove('visible');
    loginsSection.classList.add('hidden');

 }  nav_to_register.addEventListener('click',RegisterPage);

 function Register(e) {
    if(nameInput.value===''){
        errorRegister.innerHTML="please Insert vaild name";
        e.preventDefault();
    }
    else{
      
        userData = {
            userName : nameInput.value,
            badges   : 1,
            level    : '',
            score    : 0,
            is_login : 1
        }
        localStorage.setItem('userData',JSON.stringify(userData));
        e.preventDefault();
        window.location.href='EmojiWarHome.html';
    }
        
    } registerBtn.addEventListener('click',Register);

 function Login(e){
     let {userName , badges , level ,score,is_login} = JSON.parse(localStorage.getItem('userData'))
     if(userloginName.value ===userName ){
        e.preventDefault();
        window.location.href='EmojiWarHome.html';
       
     }
     else{
       errorLogin.innerHTML="please insert vaild Data";
        e.preventDefault();
     }
 }loginBtn.addEventListener('click',Login)


 