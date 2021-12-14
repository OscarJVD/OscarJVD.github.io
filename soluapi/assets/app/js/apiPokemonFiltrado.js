console.info(`La diferencia con esta api es que tenemos varias subsecciones`);

function ele(element = '') {
    let ele = document.getElementById(element);
    return ele;
}

function eve(element = {}, func, eventListener = 'click') {
    element.addEventListener(eventListener, func);
}

const url = "https://pokeapi.co/api/v2/pokemon/?offset=00&limit=10";
// const url = "https://pokeapi.co/api/v2/pokemon/";

let titlePoke = ele("titlePoke")
titlePoke.textContent = "Pokemón Api Filtrado";


const getPoke = async (apiPoke, option) => { // Get data from Api
    return fetch(apiPoke)
        .then(resp => resp.json())
        .then(json => {
            console.log(json);
            if (option == 0)
                getSection(json);
            else
                showPokemon(json);
        })
        .catch(e => console.error(e))
}

// Paint results
let nextPrev;
let html;
let html2;

const getSection = (pokeData) => {

    nextPrev = pokeData;
    valPagination(nextPrev);

    html2 = "";
    pokeData.results.forEach(pokemon => {
        html2 += `<div>`;
        html2 += `<a href="#" onclick="sendUrl('${pokemon.url}')">${pokemon.name}</a>`;
        html2 += `</div>`;
    });

    ele("filterContainer").innerHTML = html2

}

const sendUrl = (url) => {
    getPoke(url, 1);
}

const showPokemon = (pokeData) => {
    html = "";

    html += `<div class="cards">`;
    html += `<div>`;
    html += `<img class="formatoImg" src="${pokeData.sprites.other.dream_world.front_default}">`;
    html += `</div>`;
    html += `<div class="contenedorTextos">`;
    html += `<small class="txtLabel"> Nombre </Small>`;
    html += `<p class="txtTexto">${pokeData.name}</p>`;
    html += `<small class="txtLabel"> Habilidades </Small>`;

    pokeData.abilities.forEach(habilidad => {
        html += `<p class="txtTexto">${habilidad.ability.name}</p>`;
    });

    html += `</div>`;
    html += `</div>`;

    ele("mainContainer").innerHTML = html
}


// Navegación sencilla
const btnNext = ele("btnNext"), btnPrev = ele("btnPrev");

eve(btnPrev, () => getPoke(nextPrev.previous, 0));
eve(btnNext, () => getPoke(nextPrev.next, 0));

function valPagination(poke) {

    if (poke.previous == null) btnPrev.style.display = 'none'
    else btnPrev.style.display = 'block';

    if (poke.next == null) btnNext.style.display = 'none'
    else btnNext.style.display = 'block'
}

getPoke(url, 0);