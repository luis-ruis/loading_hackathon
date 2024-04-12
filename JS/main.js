class Car {
  constructor(carretera) {
      this.carretera = carretera;
      this.car = this.createCar();
      this.dx = 0; // Velocidad horizontal constante
      this.dy = 2; // Velocidad vertical (0 para que no se mueva verticalmente)
  }

  createCar() {
      const car = document.createElement("div");
      car.classList.add("car");
      car.style.left = "10px";
      car.style.top = "0px";
      this.carretera.appendChild(car);
      return car;
  }

  move() {
      let left = parseFloat(this.car.style.left) + this.dx;
      let top = parseFloat(this.car.style.top) + this.dy;

      if (top > this.carretera.offsetHeight) {
          this.car.remove();
          return false;
      } else {
          this.car.style.left = left + "px";
          this.car.style.top = top + "px";
          console.log("El valor de la variable es:", this.car.style.top);
          return true;
      }
  }
}
//clase que crea el semaforo y controla los colores 
class TrafficLight {
  constructor(circle) {
      this.circle = circle;
      this.miVariable = false;
      setInterval(() => this.alternateVariable(), 3000);
      setInterval(() => this.changeColor(), 3000);
  }

  alternateVariable() {
      this.miVariable = !this.miVariable;
      console.log("El valor de la variable es:", this.miVariable);
  }

  changeColor() {
      if (this.circle.style.backgroundColor === 'green') {
          this.circle.style.backgroundColor = 'red';
      } else {
          this.circle.style.backgroundColor = 'green';
      }
  }
}

class RoadSimulator {
  constructor(carretera, circle) {
      this.carretera = carretera;
      this.circle = circle;
      this.carsArray = [];
      this.addRandomCar();
      setInterval(() => this.moveCars(), 50);
  }

  addRandomCar() {
      const car = new Car(this.carretera);
      this.carsArray.push(car);
      setTimeout(() => this.addRandomCar(), this.randomInterval(700, 2000));
  }

  moveCars() {
      this.carsArray.forEach((car, index) => {
          /*if (!this.miVariable && car.car.style.top < 400 + "px") {
              if (!car.move()) {
                  this.carsArray.splice(index, 1);
              }else{
                car.move();
              }
          }*/
          car.move();
      });
  }

  randomInterval(min, max) {
      return Math.random() * (max - min) + min;
  }
}

const carretera = document.getElementById("carretera");
const circle = document.getElementById('circle');

const roadSimulator = new RoadSimulator(carretera, circle);
const trafficLight = new TrafficLight(circle);
