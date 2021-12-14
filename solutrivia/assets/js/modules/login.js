const btnLogin = ele('login');

const login = (e) => {

    e.preventDefault();

    const email_or_username = eleVal('email_or_username');
    const password = ele('password');

    if (email_or_username == '' || password.value == '') {
        ale("Diligencie todos los campos", "error", 7);
    } else {
        if (localStorage.getItem('user')) {
            if (localStorage.getItem('user').length != 0) {

                let arr = localStorage.getItem('user');

                let arrUser = JSON.parse(arr);

                let error = false;

                for (let i = 0; i < arrUser.length; i++) {

                    if (arrUser[i].email == email_or_username ||

                        arrUser[i].username == email_or_username) {
                        if (arrUser[i].password_register == password.value) {
                            localStorage.setItem('session', 1);
                            return location.href = "views/home.html";
                        }

                        else error = true;

                    } else error = true;

                }

                if (error) {
                    password.value = '';
                    ale("Error, Verifique sus credenciales", "error", 10);
                }
            }
        } else ale("No hay usuario registrados, por favor registre uno", "error");
    }
}

eve(btnLogin, 'click', login);