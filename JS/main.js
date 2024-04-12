var colorRojo = false;
var colorVerde = false;

class Car {
  constructor(carretera, posicionInicial, posicionFinal, contrario) {
    this.carretera = carretera;
    this.car = this.createCar();
    this.posicionInicial = posicionInicial;
    this.posicionFinal = posicionFinal;
    this.contrario = contrario;
    this.dx = 0; // Velocidad horizontal constante
    this.dy = 2; // Velocidad vertical (0 para que no se mueva verticalmente)
    this.crossedTrafficLight = false; // Indica si el carro ya cruzó el semáforo
    this.stopped = false; // Indica si el carro está detenido
  }
  //se crea el carro
  createCar() {
    const car = document.createElement("div");
    car.classList.add("car");
    car.style.left = "10px";
    console.log(this.posicionFinal);
    car.style.top = "750px";
    this.carretera.appendChild(car);
    return car;
  }

  stop() {
    this.stopped = true;
  }
  //funcion para mover las cordenadas del carro
  move() {
    if (!this.stopped) {
      let left = parseFloat(this.car.style.left) + this.dx;

      if (top > this.carretera.offsetHeight) {
        this.car.remove();
        return false;
      } else {
        if (this.contrario) {
          let top = parseFloat(this.car.style.top) + this.dy;
          this.car.style.left = left + "px";
          this.car.style.top = top + "px";
        }
        if (!this.contrario) {
          let top = parseFloat(this.car.style.top) - this.dy;
          this.car.style.left = left + "px";
          this.car.style.top = top + "px";
        }

        return true;
      }
    }
    return false;
  }
}
//Clase para el semaforo
class TrafficLight {
  constructor(circle) {
    this.circle = circle;
    this.miVariable = false;
    setInterval(() => this.alternateVariable(), 3000);
    setInterval(() => this.changeColor(), 3000);
    colorVerde = true;
    colorRojo = false;
  }
  // funcion para cambio de luces
  alternateVariable() {
    this.miVariable = !this.miVariable;
  }
  //funcion para cambiar el color
  changeColor() {
    if (this.circle.style.backgroundColor === "green") {
      this.circle.style.backgroundColor = "red";
      colorVerde = false;
      colorRojo = true;
    } else {
      this.circle.style.backgroundColor = "green";
      colorVerde = true;
      colorRojo = false;
    }
  }
}

class RoadSimulator {
  constructor(carretera, circle, posicionInicial, posicionFinal, contrario) {
    this.carretera = carretera;
    this.circle = circle;
    this.contador = 0;
    this.posicionInicial = posicionInicial;
    this.posicionFinal = posicionFinal;
    this.contrario = contrario;
    this.carsArray = [];
    this.addRandomCar();
    setInterval(() => this.moveCars(), 50);
  }
  //funcion para agregar carros en la calle
  addRandomCar() {
    const car = new Car(
      this.carretera,
      this.posicionInicial,
      this.posicionFinal,
      this.contrario
    );
    this.carsArray.push(car);
    // Añadir un nuevo carro en un intervalo aleatorio entre 800ms y 4000ms
    setTimeout(() => this.addRandomCar(), this.randomInterval(800, 4000));
  }
  //funcion para mover el carro en la calle
  moveCars() {
    const trafficLightPosition = this.circle.getBoundingClientRect();
    const trafficLightHeight =
      trafficLightPosition.top + trafficLightPosition.height;

    this.carsArray.forEach((car, index) => {
      const carPosition = car.car.getBoundingClientRect();
      const carHeight = carPosition.top + carPosition.height;

      const shouldStop =
        (colorRojo &&
          carHeight >= trafficLightHeight &&
          !car.crossedTrafficLight) ||
        (index > 0 && this.shouldStop(car, index));

      if (shouldStop) {
        car.stop();
      } else {
        if (car.stopped && index > 0 && !this.carsArray[index - 1].stopped) {
          car.stopped = false;
        }
        car.move();
        if (carHeight >= trafficLightHeight) {
          car.crossedTrafficLight = true;
        }
      }
      //cuenta el numero de carros que pasa cunado el semaforo esta en verde
      if (
        colorVerde &&
        car.crossedTrafficLight &&
        carHeight > 460 &&
        carHeight < 462
      ) {
        this.contador++;
        console.log("contaodr: ", carHeight);
        console.log("co: ", this.contador);
      }
      // el contador se reinicia
      if (colorRojo && carHeight > 465) {
        this.contador = 0;
      }
    });
  }
  //funcion para que el carro se detenga
  shouldStop(car, currentIndex) {
    const distanceThreshold = 10; // Umbral de distancia entre carros
    for (let i = currentIndex - 1; i >= 0; i--) {
      const previousCar = this.carsArray[i];
      const distance = this.calculateDistance(car, previousCar);
      if (distance < distanceThreshold) {
        return true;
      } else {
        return false;
      }
    }
  }
  //funcion para calcular la distancia entre un carro del otro
  calculateDistance(car1, car2) {
    const car1Position = car1.car.getBoundingClientRect();
    const car2Position = car2.car.getBoundingClientRect();
    const car1Bottom = car1Position.top + car1Position.height;
    const car2Top = car2Position.top;
    return Math.abs(car1Bottom - car2Top);
  }

  randomInterval(min, max) {
    return Math.random() * (max - min) + min;
  }
}

const carretera = document.getElementById("carretera");
carretera.style.height = "800px";
carretera.style.left = "400px";
carretera.style.width = "50px";
const circle = document.getElementById("circle");

const roadSimulator = new RoadSimulator(carretera, circle, 10, 0, false);
const trafficLight = new TrafficLight(circle);
