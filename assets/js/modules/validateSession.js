const validaSession = () => {

    let session = localStorage.getItem('session');

    if (session){
        if (session != 1) location.href = "../index.html"
    }else location.href = "../index.html";
}

eve(document, "DOMContentLoaded", validaSession);


