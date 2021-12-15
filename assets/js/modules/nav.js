const usernav = ele('usernav');
const closeSession = ele('close');

let user = getLocalStorage('user');

function addElementA(txt, redirect = false) {
    let a = createEle('a');
    a.id = 'close'
    a.className = 'nav-item nav-link active';
    a.textContent = txt;
    if (redirect) a.href = "../index.html";
    usernav.appendChild(a);
}

if (user != false) {
    if(user.username != undefined){
        ale(`Bienvenid@ ${user.username}`, 'success');
        addElementA(user.username);
    }else{
        ale(`Bienvenid@ ${user.email_or_username}`, 'success');
        addElementA(user.email_or_username);
    }
} else {
    ale('Por favor inicia sesión', 'error');
    addElementA('Iniciar Sesión', true);
}

// LIMPIA LOCALSTORAGE
// const getOut = () => {
//     cleanLocalStorage('user', '../index.html')
// }

// eve(closeSession, 'click', getOut);
