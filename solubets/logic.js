// LOGICA DEL JUEGO
// Errores
// Apuesta con dinero que no tiene
// No funciona el game over o game won
// No se puede apostar con el mismo número
// Falta el dado
// no resta en la segunda jugada

let dineroInicial = 50000;
let dineroInicial2 = (document.getElementById(
  "money"
).innerHTML = `<span class="h1"><span class="d-block text-uppercase">Fondos: </span><span id="currentMoney" class="text-success font-italic font-weight-bolder">${dineroInicial}</span> <span class="text-warning small">COP</span> </span>`);

// Obtengo el número seleccionado y extraigo el texto de la opción
function bet() {
  // Dinero predeterminado
  let dinero = 50000;

  function reload() {
    document.getElementById(
      "money"
    ).innerHTML = `<span class="h1"><span class="d-block text-uppercase">Fondos: </span><span id="currentMoney" class="text-success">${dinero}</span> <span class="text-warning">COP</span> </span>`;
  }

  reload();

  // Dinero apostado
  let dineroApostado = document.getElementById("dineroApostado").value;

  // Número escogido
  let numSelected = this.options[select.selectedIndex].text;

  // Numero entre 1 y 6
  let m = Math;
  let numRandom = m.round(m.random() * (6 - 1)) + 1;

  let currentMoney = parseInt(
    document.getElementById("currentMoney").textContent
  );

  if (currentMoney >= 200000) {
    alert(
      "Gracias por apostar en Soluapuestas, es suficiente por hoy ve a abrazar a tu familia"
    );
    currentMoney = 0;
  } else if (currentMoney <= 0) {
    alert("Te has quedado sin dinero, has perdido");
    currentMoney = 0;
  } else {
    if (dineroApostado > currentMoney) {
      alert("No tienes el dinero suficiente");
      currentMoney = currentMoney;
    } else {
      if (numSelected == numRandom) {
        dinero += dineroApostado * 2;
        alert(
          "¡Has ganado!, El número ganador fue " +
            numSelected +
            " ¡Vuelve a apostar!"
        );
        reload();
      } else {
        dinero -= dineroApostado;
        alert("¡Ah! por poco, vuelve a intentarlo");
        reload();
      }
    }
  }

  cube.style.transition = "";
  cube.style.transform = `translateY(400px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
  setTimeout(() => {
    cube.style.transition = `transform ${time}s`;
    console.log(numSelected);

    switch (parseInt(numSelected)) {
      case 1:
        cube.style.transform = `translateY(400px) rotateX(3600deg) rotateY(3600deg) rotateZ(3600deg)`;
        break;
      case 2:
        cube.style.transform = `translateY(400px) rotateX(4410deg) rotateY(3600deg) rotateZ(3600deg)`;
        break;
      case 3:
        cube.style.transform = `translateY(400px) rotateX(3600deg) rotateY(4410deg) rotateZ(3600deg)`;
        break;
      case 4:
        cube.style.transform = `translateY(400px) rotateX(3600deg) rotateY(2430deg) rotateZ(3600deg)`;
        break;
      case 5:
        cube.style.transform = `translateY(400px) rotateX(2430deg) rotateY(3600deg) rotateZ(3600deg)`;
        break;
      case 6:
        cube.style.transform = `translateY(400px) rotateX(3600deg) rotateY(1980deg) rotateZ(3600deg)`;
        break;
    }
  }, time * 10);
}

let select = document.getElementById("num");
select.addEventListener("change", bet);
// FINAL DE LA LOGICA E INTERACTIVIDAD DEL JUEGO

// INTERACTIVIDAD DE DADOS
const cube = document.querySelector(".cube");
const time = 2;

cube.addEventListener("click", () => {
  cube.style.transition = "";
  cube.style.transform = `translateY(400px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
  setTimeout(() => {
    cube.style.transition = `transform ${time}s`;
    const randomValue = Math.floor(Math.random() * 6 + 1);
    console.log(`randomValue: ${randomValue}`);

    switch (randomValue) {
      case 1:
        cube.style.transform = `translateY(400px) rotateX(3600deg) rotateY(3600deg) rotateZ(3600deg)`;
        break;
      case 2:
        cube.style.transform = `translateY(400px) rotateX(4410deg) rotateY(3600deg) rotateZ(3600deg)`;
        break;
      case 3:
        cube.style.transform = `translateY(400px) rotateX(3600deg) rotateY(4410deg) rotateZ(3600deg)`;
        break;
      case 4:
        cube.style.transform = `translateY(400px) rotateX(3600deg) rotateY(2430deg) rotateZ(3600deg)`;
        break;
      case 5:
        cube.style.transform = `translateY(400px) rotateX(2430deg) rotateY(3600deg) rotateZ(3600deg)`;
        break;
      case 6:
        cube.style.transform = `translateY(400px) rotateX(3600deg) rotateY(1980deg) rotateZ(3600deg)`;
        break;
    }
  }, time * 10);
});
// FIN DADOS
