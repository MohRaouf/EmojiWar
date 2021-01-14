let loginBtn  = document.getElementById('btn-login'),
    loginUser = document.getElementById('nav-login'),
    logoutBtn = document.getElementById('btn-logout');

function is_Login() { 
    let {userName , badges , level ,score,is_login} = JSON.parse(localStorage.getItem('userData'))
    if(is_login==1 ){
        logoutBtn.classList.remove('hidden');
        logoutBtn.classList.add('visible');
        loginBtn.classList.remove('visible');
        loginBtn.classList.add('hidden');
      
    }
 } is_Login();

function logout() {
    let {userName , badges , level ,score,is_login} = JSON.parse(localStorage.getItem('userData'))
    is_login = 0;
    loginBtn.classList.remove('hidden');
    loginBtn.classList.add('visible');
    logoutBtn.classList.remove('visible');
    logoutBtn.classList.add('hidden');

}logoutBtn.addEventListener("click",logout);

