let guest =
    [
        {},
        {
            id: 1,
            name: 'php',
            photo: 'ele',
            questions:
                [
                    '¿Es cierto que se puede mostrar información con "print_r()"?',
                    '¿Soporta herencia multiple?',
                    '¿La diferencia entre sessiones y cookies es: que las sesiones almacenan los valores en el servidor, y las cookies almacenan valores en el navegador del usuario?',
                    '¿"file_get_contents()" permite leer el contenido de un archivo?',
                    '¿"$_FILES" está compuesta por elementos subidos al actual script a través de una petición POST?'
                ],
            resp: ['si', 'no', 'si', 'si', 'si'],
        },
        {
            id: 2,
            name: 'python',
            photo: 'sna',
            questions:
                [
                    '¿Se utiliza "def" para declarar una función?',
                    '¿"len()" NO se usa para determinar la longitud de una lista, matriz o cadena?',
                    '¿Soporta herencia multiple?',
                    '¿Para eliminar un archivo NO importas el módulo "os" y luego usas la función "remove()"?',
                    '¿Hace uso de especificadores de acceso?'
                ],
            resp: ['si', 'no', 'si', 'no', 'no'],
        },
        {
            id: 3,
            name: 'react',
            photo: 're',
            questions:
                [
                    '¿Usa componentes que sirven para hacer monólitica la aplicación?',
                    '¿Es una biblioteca de JS de front-end para crear aplicaciones web?',
                    '¿Las "keys" NO se utilizan en React para identificar elementos únicos en el DOM virtual?',
                    '¿Existen props y son para configurar el componente?',
                    '¿Los state se refieren al valor de datos predeterminados en un componente?'
                ],
            resp: ['no', 'si', 'no', 'si', 'si'],
        },
        {
            id: 4,
            name: 'vue',
            photo: 'v',
            questions:
                [
                    '¿Es similar a React en su ciclo de vida?',
                    '¿Las funciones, métodos o caracteristicas las colocamos en un objeto methods?',
                    '¿Los datos o modelos del componente se organizan en un objeto data?',
                    '¿Tiene un ecosistema o librería para manejar el estado de la aplicación?',
                    '¿Tiene similitud con Angular en cuanto a directivas?'
                ],
            resp: ['si', 'no', 'si', 'si', 'si'],
        },
        {
            id: 5,
            name: 'swift',
            photo: 's',
            questions:
                [
                    '¿Se utiliza "fun" para declarar una función?',
                    '¿Es más seguro, más rápido en su desarrollo que Objetive-C?',
                    '¿Sirve para el el desarrollo de iOS y web?',
                    '¿Fue creado por Apple?',
                    '¿Es multiparadigma?'
                ],
            resp: ['no', 'si', 'no', 'si', 'si'],
        },
    ];



// al dar click while para validar si el jnumero es diferente
// a los que ya pasaron o se almacenaron en el array
// 1. evento change y validar y pner el resultado de la respuesta
// al enviar recoge los datos y ahce los calcuylos para saber si cumple todas las respuestas
// quitar opacidad de la imagen

// function templateQuestions(){}

function showQuestionsContainer(QuestionsById) {

    let all = ele("all");
    all.classList.remove("d-none");

    let answer = ele("answerContainer");
    answer.classList.remove("d-none");

    for (let i = 1; i <= 5; i++) {
        ele(`input${i}`).classList.remove("d-none");
        ele(`checkForm${i}`).classList.remove("d-none");
    }

    // let asks = guest[QuestionsById];
    let asks = guest.filter(elem => elem.id === QuestionsById)[0];
    const saveId = document.querySelector("#data-edit-id");
    saveId.dataset.idtest = QuestionsById;

    // console.log();
    // return;
    switch (QuestionsById) {
        case 1:
            for (let i = 1; i <= 5; i++) {
                ele(`input${i}`).value = asks.questions[i - 1];
            }
            break;
        case 2:
            for (let i = 1; i <= 5; i++) {
                ele(`input${i}`).value = asks.questions[i - 1];
            }
            break;
        case 3:
            for (let i = 1; i <= 5; i++) {
                ele(`input${i}`).value = asks.questions[i - 1];
            }
            break;
        case 4:
            for (let i = 1; i <= 5; i++) {
                ele(`input${i}`).value = asks.questions[i - 1];
            }
            break;
        case 5:
            for (let i = 1; i <= 5; i++) {
                ele(`input${i}`).value = asks.questions[i - 1];
            }
            break;
    }
}

function showPhoto(src) {
    let photo = ele("photo");
    let template = `../assets/img/${src}.png`;
    photo.classList.remove("d-none");
    if (!photo.classList.contains("blurred")) photo.classList.add("blurred");
    photo.setAttribute("src", template);
}

function win(idTopic) {
    let btnWon = ele("btnWon");
    eve(btnWon, 'click', () => {
        let inputResp = eleVal("resp");
        if (inputResp != '') {
            inputResp = inputResp.toLowerCase();
            if (guest[idTopic].id == idTopic) {
                if (inputResp == guest[idTopic].name) {
                    alert("Has ganado");
                    location.reload();
                } else {
                    ale("¡Casi lo logras! Vuelve a intentar", "error", 5);
                }
            }
        } else {
            ele("resp").classList.add("borderRed");
            setTimeout(() => {
                ele("resp").classList.remove("borderRed");
            }, 4000)
            ale("Por favor especifica el nombre de la imagén preguntada", "error", 5);
        }
    });
}

var alreadyAsked = [];

const randomGuest = (idTopic2 = 0) => {

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (alreadyAsked.length == guest.length - 1) { // Si ya se preguntaron todas las imagernes
        let btnFinal = ele("send");
        btnFinal.id = "btnWon"
        btnFinal.textContent = "Finalizar"

        win(idTopic2);
    }else{
        let randomCharacter = getRandomInt(1, 6) // Aqui hay un error se necesita el No random del 1 al 5

        while (alreadyAsked.includes(randomCharacter)) {
            randomCharacter = getRandomInt(1, 6)
        }

        let character = guest[randomCharacter];

        let idTopic = character.id;

        alreadyAsked.push(idTopic); // Para evitar que se repita la misma pregunta

        console.log(alreadyAsked);

        // e.target.style.display = "none" // no vuelve a jugar hasta termine el juego
        ele("btnPlay").style.display = "none";

        let photoName = character.photo;

        showPhoto(photoName);

        showQuestionsContainer(idTopic); // renderiza las preguntas de cada

        rateTemp(idTopic);
    }
}

eve(btnPlay, 'click', randomGuest); // adEventLsitener

let correct = 0;
let incorrect = 0;

function validaSi(indice) {

    ele(`inputNo${indice}`).disabled = true;
    const test = document.querySelector("#data-edit-id");
    const object = guest.filter(elem => elem.id == test.dataset.idtest)[0];

    if (object.resp[indice - 1] == "si") {

        ele(`correct${indice}`).classList.remove("d-none")

        correct += 1;

    } else {
        incorrect += 1;

        ele(`incorrect${indice}`).classList.remove("d-none")
    }
}

function validaNo(indice) {

    ele(`inputSi${indice}`).disabled = true;
    const test = document.querySelector("#data-edit-id");
    const object = guest.filter(elem => elem.id == test.dataset.idtest)[0];

    if (object.resp[indice - 1] == "no") {

        ele(`correct${indice}`).classList.remove("d-none") // icono correcto

        correct += 1;
    } else {
        incorrect += 1;

        ele(`incorrect${indice}`).classList.remove("d-none")
    }
}

const yes = document.querySelectorAll(".si");

yes.forEach((p, i) => {
    p.addEventListener('click', (e) => {
        let o = e.target;

        console.log(o);

        if (o.value == 1 && o.checked == true) {
            o.disabled = true;
            validaSi(o.value);
        } else if (o.value == 2 && o.checked == true) {
            o.disabled = true;
            validaSi(o.value);
        } else if (o.value == 3 && o.checked == true) {
            o.disabled = true;
            validaSi(o.value);
        } else if (o.value == 4 && o.checked == true) {
            o.disabled = true;
            validaSi(o.value);
        } else if (o.value == 5 && o.checked == true) {
            o.disabled = true;
            validaSi(o.value);
        }

    });
});

const no = document.querySelectorAll(".no");

no.forEach((p, i) => {
    p.addEventListener('click', (e) => {

        let o = e.target;

        console.log(o);

        if (o.value == 1 && o.checked == true) {
            o.disabled = true;
            validaNo(o.value);
        } else if (o.value == 2 && o.checked == true) {
            o.disabled = true;
            validaNo(o.value);
        } else if (o.value == 3 && o.checked == true) {
            o.disabled = true;
            validaNo(o.value);
        } else if (o.value == 4 && o.checked == true) {
            o.disabled = true;
            validaNo(o.value);
        } else if (o.value == 5 && o.checked == true) {
            o.disabled = true;
            validaNo(o.value);
        }
    });
});


let blurringUnless = (e) => {
    if (e.target.disabled == true) {
        if (correct == 3) {
            ele("photo").classList.remove("blurred");
            ele("photo").classList.add("little-blurring");
        }
    }
}

let inpSi3 = ele("inputSi3")
let inpNo3 = ele("inputNo3");
eve(inpSi3, "click", blurringUnless);
eve(inpNo3, "click", blurringUnless);

let removeBlur = (e) => {
    if (e.target.disabled == true) {
        if (correct + incorrect == 5) showResults(correct, incorrect)
        if (correct == 5) ele("photo").classList.remove("blurred");
        if (correct == 5) ele("photo").classList.remove("little-blurring");
    }
}

let inpFinalSi = ele("inputSi5");
let inpFinalNo = ele("inputNo5");
eve(inpFinalSi, "click", removeBlur);
eve(inpFinalNo, "click", removeBlur);

function showResults(correctAns, incorrectAns) {
    let resultsContainer = ele("results");
    resultsContainer.classList.remove("d-none");

    let correct = ele("correctAnswers");
    correct.textContent = `Respuestas correctas: ${correctAns}`

    let incorrect = ele("incorrectAnswers");
    incorrect.textContent = `Respuestas incorrectas: ${incorrectAns}`
}

function rateTemp(idTopic) {

    let btnSend = ele("send");

    eve(btnSend, 'click', () => {
        let inputResp = eleVal("resp");
        if (inputResp != '') {
            inputResp = inputResp.toLowerCase();

            if (guest[idTopic].id == idTopic) {
                if (inputResp == guest[idTopic].name) {

                    ale(`Respuesta acertada: ${inputResp}`, "success", 5);

                    alertify.confirm('¿Quieres revisar las preguntas?',
                        () => {
                            alertify.success('<span class="text-white">¡Genial!</span>')
                        },
                        () => {
                            alertify.success('<span class="text-white">Esta bien, continuemos</span>')

                            let inpRespVal = ele("resp") // limpiar input de respuesta
                            inpRespVal.value = ''

                            // Habilitar y limpiar radio buttons
                            let radioBtnsSi = document.querySelectorAll('.si');
                            radioBtnsSi.forEach((p, i) => {
                                p.disabled = false;
                                if (p.checked == true) p.checked = false;
                            });

                            let radioBtnsNo = document.querySelectorAll('.no');
                            radioBtnsNo.forEach((p, i) => {
                                p.disabled = false;
                                if (p.checked == true) p.checked = false;
                            });

                            // Limpiar iconos de bien y mal
                            for (let i = 1; i <= 5; i++) {
                                if (!ele(`correct${i}`).classList.contains("d-none"))
                                    ele(`correct${i}`).classList.add("d-none")

                                if (!ele(`incorrect${i}`).classList.contains("d-none"))
                                    ele(`incorrect${i}`).classList.add("d-none")
                            }

                            // Ocultar resultados para ser reemplazados en la siguiente vuelta
                            ele("results").classList.add("d-none");

                            randomGuest(idTopic);
                        });


                } else {
                    ale("¡Casi lo logras! Vuelve a intentar", "error", 5);
                }
            }
        } else {
            ele("resp").classList.add("borderRed");
            setTimeout(() => {
                ele("resp").classList.remove("borderRed");
            }, 4000)
            ale("Por favor especifica el nombre de la imagén preguntada", "error", 5);
        }
    });
}

