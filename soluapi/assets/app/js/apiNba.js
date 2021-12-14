let playersTab = ele("players-tab"),
    teamsTab = ele("teams-tab"),
    gamesTab = ele("games-tab"),
    apiFlag = 1,
    dtableFlag = false,
    title = ele("title"),
    urlPlayers = "https://www.balldontlie.io/api/v1/players",
    urlTeams = "https://www.balldontlie.io/api/v1/teams",
    urlGames = "https://www.balldontlie.io/api/v1/games",
    // urlSeasonAverages = "https://www.balldontlie.io/api/v1/season_averages",
    urlSeasonPlayerAverages = "https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=1&player_ids[]=2&player_ids[]=3&player_ids[]=4&player_ids[]=5",
    nextPrev;

// console.log(typeof urlPlayers);

eve(playersTab, () => {
    apiFlag = 1;
    execSection()
})

eve(teamsTab, () => {
    apiFlag = 2;
    execSection()
})
eve(gamesTab, () => {
    apiFlag = 3;
    execSection()
})

function showStats(nbaStatsData)
{
    console.log(nbaStatsData);
}

var searchData = [];

const showNba = (nbaData, pagination = true) => { // Paint results
    searchData = [];

    nextPrev = nbaData;

    console.log(nbaData);

    valPagination(nextPrev);

    switch (apiFlag) {
        case 1:
            title.textContent = `Jugadores NBA (${nbaData.meta.total_count})`;
            break;
        case 2:
            ele("title2").textContent = `Equipos NBA (${nbaData.meta.total_count})`;
            break;
        case 3: ele("title3").textContent = `Juegos NBA (${nbaData.meta.total_count})`; break;
    }

    let html = "", tabla = "";

    if (apiFlag === 1) {

        if (pagination) {
            eve(btnNext, () => {
                btnNext.style.display = 'none'
                ele('loader').classList.remove('d-none')

                setTimeout(() => {
                    getNba(`${urlPlayers}?page=${nbaData.meta.next_page}`);
                    ele('loader').classList.add('d-none')
                    btnNext.style.display = 'block'
                }, 3000)
            })
            eve(btnPrev, () => getNba(`${urlPlayers}?page=${nbaData.meta.current_page - 1}`));
        }

        tabla +=
            `
            <table class="table p-4" id="tablePlayers">
            <thead class="thead-light">
                <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Posición</th>
                <th scope="col">Peso en libras</th>
                <th scope="col">Pies de altura</th>
                <th scope="col">Altura en pulgadas</th>
                <th scope="col">Abreviación(equipo)</th>
                <th scope="col">Ciudad(equipo)</th>
                <th scope="col">Conferencia(equipo)</th>
                <th scope="col">División(equipo)</th>
                <th scope="col">Nombre completo(equipo)</th>
                <th scope="col">Nombre(equipo)</th>
                </tr>
            </thead>
            <tbody>
            `;

        nbaData.data.forEach((nba, i) => { // Html de las cartas

            if (!searchData.includes(nba.first_name)) searchData.push(nba.first_name)
            if (!searchData.includes(nba.last_name)) searchData.push(nba.last_name)

            html += `<div class="cards">
                <div class="textContainer">
                    <small class="txtLabel">Nombre</small>
                    <p class="txtTexto">${nba.first_name}</p>
                    <small class="txtLabel">Apellido</small>
                    <p class="txtTexto">${nba.last_name}</p>
                    <small class="txtLabel">Posición</small>
                    <p class="txtTexto">${nba.position}</p>
                    <small class="txtLabel">Peso en libras</small>
                    <p class="txtTexto">${(nba.weight_pounds) ? nba.weight_pounds : 'Sin especificar'}</p>
                    <small class="txtLabel">Pies de altura</small>
                    <p class="txtTexto">${(nba.height_feet) ? nba.height_feet : 'Sin especificar'}</p>
                    <small class="txtLabel">Altura en pulgadas</small>
                    <p class="txtTexto">${(nba.height_inches) ? nba.height_inches : 'Sin especificar'}</p>
                    <button type="button" class="btn btn-success btn-sm w-100 mt-2" onclick="showInfoTeam(${i})">Equipo</button>
                    <div class="d-none bg-grad-blue p-3 rounded-bottom" id="teamInfo${i}">
                        <small class="txtLabel">Abreviación</small>
                        <p class="txtTexto">${nba.team.abbreviation}</p>
                        <small class="txtLabel">Ciudad</small>
                        <p class="txtTexto">${nba.team.city}</p>
                        <small class="txtLabel">Conferencia</small>
                        <p class="txtTexto">${nba.team.conference}</p>
                        <small class="txtLabel">División</small>
                        <p class="txtTexto">${nba.team.division}</p>
                        <small class="txtLabel">Nombre completo</small>
                        <p class="txtTexto">${nba.team.full_name}</p>
                        <small class="txtLabel">Nombre</small>
                        <p class="txtTexto">${nba.team.name}</p>
                    </div>
                </div>
            </div>`;

            // DATATABLE
            tabla += `
            <tr>
                <td>${nba.first_name}</td>
                <td>${nba.last_name}</td>
                <td>${nba.position}</td>
                <td>${(nba.weight_pounds) ? nba.weight_pounds : 'Sin especificar'}</td>
                <td>${(nba.height_feet) ? nba.height_feet : 'Sin especificar'}</td>
                <td>${(nba.height_inches) ? nba.height_inches : 'Sin especificar'}</td>
                <td>${nba.team.abbreviation}</td>
                <td>${nba.team.city}</td>
                <td>${nba.team.conference}</td>
                <td>${nba.team.division}</td>
                <td>${nba.team.full_name}</td>
                <td>${nba.team.name}</td>
            </tr>`;
        });

        ele("mainContainer").innerHTML = html

        tabla += `</tbody></table>`;

        if(!dtableFlag) $(document).ready(() => datatable("tablePlayers"));

        dtableFlag = true;

        // datatable("tablePlayers")

        ele('comparison-table-players').innerHTML = tabla;

        // STATISTIC
        getStatsNba(urlSeasonPlayerAverages);

        // console.log(statsData);

    } else if (apiFlag === 2) {
        searchData = [];

        if (pagination) {
            eve(btnNext, () => {
                btnNext.style.display = 'none'
                ele('loader').classList.remove('d-none')

                setTimeout(() => {
                    getNba(`${urlTeams}?page = ${nbaData.meta.next_page} `);
                    ele('loader').classList.add('d-none')
                    btnNext.style.display = 'block'
                }, 5000)
            })
            eve(btnPrev, () => getNba(`${urlTeams}?page = ${nbaData.meta.current_page - 1} `));
        }

        nbaData.data.forEach(nba => { // Html de las cartas

            if (!searchData.includes(nba.full_name)) searchData.push(nba.full_name)
            if (!searchData.includes(nba.name)) searchData.push(nba.name)

            console.log(nba.name);

            html +=
                `<div class="cards">
                <div class="textContainer">
                    <small class="txtLabel">Nombre completo</small>
                    <p class="txtTexto">${nba.full_name}</p>
                    <small class="txtLabel">Nombre</small>
                    <p class="txtTexto">${nba.name}</p>
                    <small class="txtLabel">Abreviación</small>
                    <p class="txtTexto">${nba.abbreviation}</p>
                    <small class="txtLabel">División</small>
                    <p class="txtTexto">${(nba.division) ? nba.division : 'Sin especificar'}</p>
                    <small class="txtLabel">Conferencia</small>
                    <p class="txtTexto">${(nba.conference) ? nba.conference : 'Sin especificar'}</p>
                    <small class="txtLabel">Ciudad</small>
                    <p class="txtTexto">${(nba.city) ? nba.city : 'Sin especificar'}</p>
                </div>
                </div> `
        })

        ele("mainContainer2").innerHTML = html

    } else if (apiFlag === 3) {
        searchData = [];
        console.log(`JUEGOS`);
        nbaData.data.forEach((nba, i) => { // Html de las cartas

            if (!searchData.includes(nba.date)) searchData.push(nba.date)
            if (!searchData.includes(nba.home_team.full_name)) searchData.push(nba.home_team.full_name)
            if (!searchData.includes(nba.visitor_team.full_name)) searchData.push(nba.visitor_team.full_name)
            if (!searchData.includes(nba.home_team_score)) searchData.push(nba.home_team_score)
            if (!searchData.includes(nba.status)) searchData.push(nba.status)
            if (!searchData.includes(nba.visitor_team_score)) searchData.push(nba.visitor_team_score)

            html +=
                `<div class="cards">
    <div class="textContainer">
        <small class="text-muted bg-white text-sm">#${nba.id}</small>
        <small class="txtLabel">Fecha</small>
        <p class="txtTexto">${nba.date}</p>
        <small class="txtLabel">Puntaje equipo local</small>
        <p class="txtTexto">${nba.home_team_score}</p>
        <small class="txtLabel">Puntaje equipo visitante</small>
        <p class="txtTexto">${(nba.visitor_team_score) ? nba.visitor_team_score : 'Sin especificar'}</p>
        <small class="txtLabel">Periodo</small>
        <p class="txtTexto">${(nba.period) ? nba.period : 'Sin especificar'}</p>
        <small class="txtLabel">Post temporada</small>
        <p class="txtTexto">${(nba.postseason) ? nba.postseason : 'Sin especificar'}</p>
        <small class="txtLabel">Temporada</small>
        <p class="txtTexto">${(nba.season) ? nba.season : 'Sin especificar'}</p>
        <small class="txtLabel">Estado</small>
        <p class="txtTexto">${(nba.status) ? nba.status : 'Sin especificar'}</p>
        <small class="txtLabel">Tiempo</small>
        <p class="txtTexto">${(nba.time.trim() != '') ? nba.time : 'Sin especificar'}</p>

        <button type="button" class="btn btn-success text-sm btn-sm col-5 mt-2" onclick="showInfoHomeTeam(${i})">Equipo Local</button>
        <button type="button" class="btn bg-grad-blue text-light text-sm btn-sm col-5 mt-2" onclick="showInfoVisitorTeam(${i})">Equipo Visitante</button>
        <div class="d-none has-background-success-dark p-3 rounded-bottom" id="homeTeamInfo${i}">
            <small class="text-muted text-sm">#${nba.home_team.id}</small>
            <small class="txtLabel">Abreviación</small>
            <p class="txtTexto">${nba.home_team.abbreviation}</p>
            <small class="txtLabel">Ciudad</small>
            <p class="txtTexto">${nba.home_team.city}</p>
            <small class="txtLabel">Conferencia</small>
            <p class="txtTexto">${nba.home_team.conference}</p>
            <small class="txtLabel">División</small>
            <p class="txtTexto">${nba.home_team.division}</p>
            <small class="txtLabel">Nombre completo</small>
            <p class="txtTexto">${nba.home_team.full_name}</p>
            <small class="txtLabel">Nombre</small>
            <p class="txtTexto">${nba.home_team.name}</p>
        </div>
        <div class="d-none bg-grad-blue p-3 rounded-bottom" id="visitorTeamInfo${i}">
            <small class="text-muted text-sm">#${nba.visitor_team.id}</small>
            <small class="txtLabel">Abreviación</small>
            <p class="txtTexto">${nba.visitor_team.abbreviation}</p>
            <small class="txtLabel">Ciudad</small>
            <p class="txtTexto">${nba.visitor_team.city}</p>
            <small class="txtLabel">Conferencia</small>
            <p class="txtTexto">${nba.visitor_team.conference}</p>
            <small class="txtLabel">División</small>
            <p class="txtTexto">${nba.visitor_team.division}</p>
            <small class="txtLabel">Nombre completo</small>
            <p class="txtTexto">${nba.visitor_team.full_name}</p>
            <small class="txtLabel">Nombre</small>
            <p class="txtTexto">${nba.visitor_team.name}</p>
        </div>
    </div></div>`
        })

        ele("mainContainer3").innerHTML = html

    }

}

function showInfoTeam(index) {

    let teamInfoContainer = ele(`teamInfo${index}`);
    teamInfoContainer.classList.toggle('d-none')

}

function showInfoHomeTeam(index) {

    let homeTeamInfo = ele(`homeTeamInfo${index}`);
    homeTeamInfo.classList.toggle('d-none')

}

function showInfoVisitorTeam(index) {

    let visitorTeamInfo = ele(`visitorTeamInfo${index}`);
    visitorTeamInfo.classList.toggle('d-none')

}

const getNba = async (nbaData = urlPlayers) => { // Get data from Api
    // try {
    //     const res = await fetch(nbaData);
    //     const json = await res.json();
    //     return showNba(json);
    // } catch (e) {
    //     return console.error(e);
    // }
    const controller = new AbortController()
    const signal = controller.signal

    return fetch(nbaData, {
        method: 'get',
        signal: signal, // <------ This is our AbortSignal
    })
        .then(resp => resp.json())
        .then(json => {
            showNba(json)
        })
        .catch(e => {
            controller.abort()
            console.error(e)
        })
}

const getStatsNba = async (nbaStatsData) => { // Get data from Api

    const controller = new AbortController()
    const signal = controller.signal

    return fetch(nbaStatsData, {
        signal: signal, // <------ This is our AbortSignal
        method: 'get',
    })
        .then(resp => resp.json())
        .then(json => showStats(json))
        .catch(e => {
            controller.abort()
            console.error(e)
        })
}

const getPlayerByIdNba = async (playerByIdData) => { // Get data from Api

    const controller = new AbortController()
    const signal = controller.signal

    return fetch(playerByIdData, {
        method: 'get',
        signal: signal, // <------ This is our AbortSignal
    })
        .then(resp => resp.json())
        .then(json => showStats(json))
        .catch(e => {
            controller.abort()
            console.error(e)
        })
}

const searchNba = () => {

    let searchInpNba,
        urlSearch;

    switch (apiFlag) {
        case 1:
            searchInpNba = ele("inputSearchPlayer").value;

            if (searchInpNba != '') {

                urlSearch = `https://www.balldontlie.io/api/v1/players?search=${searchInpNba}`;

                getNba(urlSearch);
            }
            break;
        // case 2:
        //     searchInpNba = ele("inputSearchTeam").value;

        //     if (searchInpNba != '') {

        //         urlSearch = `https://www.balldontlie.io/api/v1/teams?search=${searchInpNba}`;

        //         getNba(urlSearch);
        //     }
        //     break;
        // case 3:
        //     searchInpNba = ele("inputSearchGame").value;

        //     if (searchInpNba != '') {

        //         urlSearch = `https://www.balldontlie.io/api/v1/games?search=${searchInpNba}`;

        //         getNba(urlSearch);
        //     }
        //     break;
    }
}

let btnNext = ele("btnNext"),
    btnPrev = ele("btnPrev"),
    btnNext2 = ele("btnNext"),
    btnPrev2 = ele("btnPrev"),
    btnNext3 = ele("btnNext"),
    btnPrev3 = ele("btnPrev");

function execSection(pagination = true) {

    switch (apiFlag) {
        case 1:
            eve(ele("inputSearchPlayer"), searchNba, 'keyup')
            autocomplete(ele("inputSearchPlayer"), searchData);
            eve(ele("viewAll"), () => getNba());;

            if (pagination) {
                getNba(urlPlayers)

            }
            else
                getNba(urlPlayers, false)
            break;

        case 2:
            // console.log(`here teams`);
            // eve(ele("inputSearchTeam"), searchNba, 'keyup')
            // autocomplete(ele("inputSearchTeam"), searchData);
            // eve(ele("viewAllTeams"), () => getNba(urlTeams));
            if (pagination) {
                getNba(urlTeams)
            }
            else
                getNba(urlTeams, false)
            break;
        case 3:
            // eve(ele("inputSearchGame"), searchNba, 'keyup')
            // autocomplete(ele("inputSearchGame"), searchData);
            // eve(ele("viewAllGames"), () => getNba(urlGames));
            if (pagination) {
                getNba(urlGames)
            }
            else
                getNba(urlGames, false)
            break;
    }


}

if (apiFlag == 1) {
    execSection()
}

let back, end;

function valPagination(nba) {
    switch (apiFlag) {
        case 1:
            back = nba.meta.current_page - 1;
            if (back == 0) btnPrev.style.display = 'none'
            else btnPrev.style.display = 'block';

            end = nba.meta.next_page;
            if (end == null) btnNext.style.display = 'none'
            else btnNext.style.display = 'block'
            break;

        case 2:
            if (nba.meta.next_page == null) btnPrev2.style.display = 'none'
            else btnPrev2.style.display = 'block';

            // if (nba.info.next == null) btnNext2.style.display = 'none'
            // else btnNext2.style.display = 'block'
            break;
        case 3:
            if (nba.meta.next_page == null) btnPrev3.style.display = 'none'
            else btnPrev3.style.display = 'block';

            // if (nba.info.next == null) btnNext3.style.display = 'none'
            // else btnNext3.style.display = 'block'
            break;
    }
}

