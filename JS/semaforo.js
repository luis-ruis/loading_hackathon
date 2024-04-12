const circle = document.getElementById('circle');

function cambiarColor() {
    if (circle.style.backgroundColor === 'green') {
        circle.style.backgroundColor = 'red'; // Cambiar a rojo si es verde
    } else {
        circle.style.backgroundColor = 'green'; // Cambiar a verde si es rojo
    }
}

// Llamar a la función cada 3 segundos (3000 milisegundos)
setInterval(cambiarColor, 3000); // Cambiar cada 3 segundos
