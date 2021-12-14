// function validator_js(formName) {
//     if (jQuery(`#${formName}`).validate())
//         return true
//     return false;
// }
function valStr(str = '') {
    // if (!str) return console.error(`El nombre ${str} de elemento es invalido`);
    if (str == '') return console.error(`Nombre de elemento vacio`);
    if (typeof str != "string") return console.error(`El valor ${str} no es una cadena de texto`);
}

function valObj(obj = '') {
    if (typeof obj != "object") return console.error(`El valor ${obj} no es un objeto`);
}

function valPasswords(password, password2) {
    valStr(password);
    valStr(password2);
    if (password !== password2) return false;
    return true;
}

function ele(element = '') {
    valStr(element);
    let ele = document.getElementById(element);
    return ele;
}

function eleVal(element = '') {
    valStr(element);
    let eleval = document.getElementById(element).value;
    return eleval;
}

function eve(ele = {}, eventListener = '', func) {
    valObj(ele);
    ele.addEventListener(eventListener, func);
}

function getLocalStorage(itemName = '') {
    valStr(itemName)
    let storage = JSON.parse(localStorage.getItem(itemName));
    if (storage != null) storage = storage[0];
    else return false;
    return storage;
}

function createEle(elementName = '') {
    valStr(elementName)
    let element = document.createElement(elementName);
    return element;
}

function joinEle(element, elementToJoin) {
    let newElement = element.appendChild(elementToJoin);
    return newElement;
}

function createTxtNode(textNode) {
    valStr(textNode);
    let text = document.createTextNode(textNode);
    return text;
}

function cleanLocalStorage(nameItem = '', urlRedirect = '') {
    valStr(nameItem);
    valStr(urlRedirect);
    localStorage.clear(nameItem);
    location.href = urlRedirect;
}

function ale(msg = '¡Acción realizada con exito!', type = 'success', timer = 5, fontColor = 'white') {
    alertify.notify(`<span class='text-${fontColor}'>${msg}</span>`, type, timer, null);
}

function nobackbutton() {
    location.hash = "no-back-button";
    location.hash = "Again-No-back-button"
    window.onhashchange = () => { window.location.hash = "no-back-button"; }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function removeItemLS(keyItem='')
{
    valStr(keyItem)
    localStorage.removeItem(keyItem);
}