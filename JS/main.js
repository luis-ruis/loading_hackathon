const gameArea = document.getElementById("gameArea");
let carroCount = 0;

function createCarro() {
  const carro = document.createElement("div");
  carro.classList.add("carro");
  carro.style.left =  "100px";
  carro.style.top = "0px";
  gameArea.appendChild(carro);
  carroCount++;
}

function moveCarro() {
  const carro = document.querySelectorAll(".carro");
  carro.forEach((carro) => {
    const dx = 0; // Velocidad horizontal constante
    const dy = 2; // Velocidad vertical (0 para que no se mueva verticalmente)
    let left = parseFloat(carro.style.left) + dx;
    let top = parseFloat(carro.style.top) + dy;

    // Eliminar las pelotas que se salen del área de juego

    if (top > gameArea.offsetWidth) {
        carro.remove();
        carroCount--;
    } else {
      if (miVariable) {
        carro.style.left = left + "px";
        carro.style.top = top + "px";
      }
      if(carro.style.top>200+"px"){
        carro.style.top = top + "px";
      }
    }
  });
}

function randomInterval(min, max) {
  return Math.random() * (max - min) + min;
}

function addRandomCarro() {
  createCarro();
  setTimeout(addRandomCarro, randomInterval(700, 2000)); // Añadir una nueva pelota en un intervalo aleatorio entre 500ms y 2000ms
}

// Comenzar el juego agregando la primera pelota
addRandomCarro();

// Mover las pelotas cada 50 milisegundos
setInterval(moveCarro, 50);

//---------------------------------------------------------------------------
// Función para cambiar la variable a verdadero después de 5 segundos
let miVariable = false;

// Función para alternar el valor de la variable entre falso y verdadero
function alternarVariable() {
  miVariable = !miVariable; // Alternar el valor entre falso y verdadero
  console.log("El valor de la variable es:", miVariable);
}

// Llamar a la función cada 2 segundos (2000 milisegundos)
setInterval(alternarVariable, 3000); // Cambiar cada 2 segundos
