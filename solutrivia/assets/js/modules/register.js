const registerForm = ele('registerForm');

const username = ele('username');
const email = ele('email');
const password_register = ele('password_register');
const password_confirm = ele('password_confirm');

const register = (e) => {
    e.preventDefault();

    let objUser = {
        username: username.value,
        email: email.value,
        password_register: password_register.value,
        password_confirm: password_confirm.value
    };

    let newUser = [objUser];

    let newSession = [{ session: 1 }];

    if (valPasswords(password_register.value, password_confirm.value) !== true)
        return ale('Las contraseñas deben ser iguales', 'error', 8);

    if (localStorage.getItem('user')) {
        if (localStorage.getItem('user').length != 0) {

            let arr = localStorage.getItem('user');

            let arrUser = JSON.parse(arr);

            arrUser.push(objUser);

            console.log(arrUser);

            localStorage.setItem('user', JSON.stringify(arrUser));
            localStorage.setItem('session', 1);
        }
    } else {
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('session', JSON.stringify(newSession));
    }

    location.href = "views/home.html";
}

eve(registerForm, 'submit', register);