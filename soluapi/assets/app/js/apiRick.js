

const url = "https://rickandmortyapi.com/api/character/";

let title = ele("title")
title.textContent = "Rick And Morty Api";

var nextPrev;

// Paint results
const showRick = (rickData) => {

    nextPrev = rickData;

    valPagination(nextPrev);

    let html = "";

    // Html de las cartas
    rickData.results.forEach(rick => html += `<div class="cards"><div><img class="pictureBox" src="${rick.image}"></div><div class="textContainer"><small class="txtLabel">Nombre</small><p class="txtTexto">${rick.name}</p><small class="txtLabel">Especie</small><p class="txtTexto">${rick.species}</p></div></div>`)

    ele("mainContainer").innerHTML = html
}

const getRick = async (rickData = url) => { // Get data from Api
    try {
        const res = await fetch(rickData);
        const json = await res.json();
        return showRick(json);
    } catch (e) {
        return console.error(e);
    }
}

// Navegación sencilla
const btnNext = ele("btnNext"), btnPrev = ele("btnPrev");

eve(btnNext, () => getRick(nextPrev.info.next));
eve(btnPrev, () => getRick(nextPrev.info.prev));

function valPagination(rick) {

    if (rick.info.prev == null) btnPrev.style.display = 'none'
    else btnPrev.style.display = 'block';

    if (rick.info.next == null) btnNext.style.display = 'none'
    else btnNext.style.display = 'block'
}

getRick();