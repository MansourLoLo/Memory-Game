document.addEventListener("DOMContentLoaded", function() {
    let cajas = document.querySelectorAll('.caja');
    let recordActual = document.querySelector('#recordActual');
    let btnempezar = document.querySelector('#btn-empezar');
    let btnreiniciar = document.querySelector('#btn-reiniciar');

    let cartasUsadas = [];

    function generarNumerosAleatorios() {
        const numerosUsados = [];
        
        while (numerosUsados.length < 12) {
            let numeroAleatorio;
            
            do {
                // Genera del 1 al 6 inclusive
                numeroAleatorio = Math.floor(Math.random() * 6); 
            } while (numerosUsados.includes(numeroAleatorio) && numerosUsados.filter(num => num === numeroAleatorio).length >= 2);
            
            numerosUsados.push(numeroAleatorio);
        }
        
        console.log("Numeros usados: " + numerosUsados);

        for (let i = 0; i < 12; i++) {
            cajas[i].setAttribute("data-valor", numerosUsados[i]);
        }
    }

    function ocultarCajas(cajas) {
        cajas.forEach(caja => {
            caja.innerHTML = "caja";
        });
    }

    function mostrarNumeros() {
        cajas.forEach(function(caja) {
            caja.addEventListener("click", function() {
                caja.innerHTML = caja.getAttribute("data-valor");
                console.log(caja.getAttribute("data-valor"));

                cartasUsadas.push(caja);

                if (cartasUsadas.length === 2) {
                    setTimeout(() => {
                        if (cartasUsadas[0].getAttribute("data-valor") === cartasUsadas[1].getAttribute("data-valor")) {
                            console.log('Las cartas coinciden');
                            recordActual.innerHTML += 1;
                        } else {
                            console.log('Las cartas no coinciden');
                            ocultarCajas(cartasUsadas);
                        }

                        cartasUsadas.forEach(caja => {
                            caja.removeEventListener("click", null); // Desactiva el evento click de las cajas usadas
                        });

                        cartasUsadas.length = 0;
                    }, 1500);
                }
            });
        });
    }

    mostrarNumeros();

    btnempezar.addEventListener('click', () => {
        generarNumerosAleatorios();
        cartasUsadas = []; // Reiniciar el array de cartas usadas al empezar un nuevo juego
    });

    btnreiniciar.addEventListener('click', () => {
        console.log('Boton de reiniciar');
    });
});
