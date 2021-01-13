let loginBtn  = document.getElementById('btn-login'),
    loginUser = document.getElementById('nav-login')
function is_Login() { 
    let {userName , badges , level ,score,is_login} = JSON.parse(localStorage.getItem('userData'))
    if(is_login==1 ){
       loginBtn.style.display='none';
      // loginUser.innerHTML+=`<span>${userName}</span>`;
       loginUser.innerHTML+='<button class="btn-login" onclick="logout()" id="btn-logout" >logout</button>'
      
    }
    else{
        console.log(localStorage.getItem('userData'));
        console.log("non")
    }

 } is_Login();

// function logout() {
//     console.log("logout")
//     let {userName , badges , level ,score,is_login} = JSON.parse(localStorage.getItem('userData'))
//     userData = {
//         userName : userName,
//         badges   : badges,
//         level    : level,
//         score    : score,
//         is_login : 0
//     }

//     loginUser.style.display='none';
//     loginBtn.style.display='block';
//     console.log(localStorage.getItem('userData'))
// }