const carretera = document.getElementById("carretera");
let carCount = 0;
let carsArray = []; // Array para almacenar las pelotas
function createCar() {
  const car = document.createElement("div");
  car.classList.add("car");
  car.style.left = "10px";
  car.style.top = "0px";
  carretera.appendChild(car);
  carCount++;
  carsArray.push(car); // Agregar el carro al array
}

let prevTop = 0; // Variable para almacenar la posición top del carro anterior
let numero=400;
let posicion;
function moveCars() {
  const balls = document.querySelectorAll(".car");
  carsArray.forEach((car, index) => {
    const dx = 0; // Velocidad horizontal constante
    const dy = 2; // Velocidad vertical (0 para que no se mueva verticalmente)
    let left = parseFloat(car.style.left) + dx;
    let top = parseFloat(car.style.top) + dy;

    // Eliminar el carro en la carretera
    if (top > carretera.offsetHeight) {
      car.remove();
      carCount--;
      carsArray.splice(index, 1); // Eliminar el carro del array
    } else {
      //carros que avanzan antes del rojo
      if(!miVariable&&car.style.top < numero+"px"){
        car.style.left = left + "px";
        car.style.top = top + "px";
      }
      // carros que se detienen en rojo
      if (miVariable) {
        car.style.left = left + "px";
        car.style.top = top + "px";
      }
      // carros que abanzan despues del semaforo
      if (car.style.top > 400 + "px") {// defina la pocion de semaforo
        car.style.top = top + "px";
      }
    }
  });
}

function randomInterval(min, max) {
  return Math.random() * (max - min) + min;
}

function addRandomCar() {
  createCar();
  setTimeout(addRandomCar, randomInterval(700, 2000)); // Añadir un nuevo carro en un intervalo aleatorio entre 500ms y 2000ms
}

// Comenzar agrregando el primer carro
addRandomCar();

// Mover el carro cada 50 milisegundos
setInterval(moveCars, 50);

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
