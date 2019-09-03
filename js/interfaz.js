// Este archivo heredara los resultados de la consultas que se hicieron al API, asi tambien se encargara de
// mostrar los resultados de dichas consultas. Tambien manejara los evenListeners.
class Interfaz {

    // Cada que se cree un objeto de tipo Interfaz el constructor se ejecutara
    constructor() {
        this.construirSelect();
    }

    construirSelect() {
        // Usamos el metodo obtenerMonedasAPI de la clase cotizador
        cotizador.obtenerMonedasAPI()
            .then(monedas => {
                // Crear un select con las opciones
                const arregloMonedas = monedas.monedas;

                const select = document.getElementById('criptomoneda');
                // Construir select desde la rest API
                arregloMonedas.forEach(moneda => {
                    // Añadir el ID y el valor despues asignarlo al select
                    const option = document.createElement('option');
                    option.value = moneda.id;
                    option.appendChild(document.createTextNode(moneda.name));
                    select.appendChild(option);
                })
            })
    }

    mostrarMensaje(mensaje, clases) {
        // Para mostrar el mensaje creamos un nuevo div
        const div = document.createElement('div');
        div.className = clases;//Le agregamos las clases que recibimos por parametro
        div.appendChild(document.createTextNode(mensaje));//Agregamos el texto a mostrar
        // div para mensjaes del HTML
        const divMensaje = document.querySelector('.mensajes');
        // Agregamos el div a mensajes
        divMensaje.appendChild(div);//Agregamos el divo con el mensaje

        // El mensaje de error desaparecera despues de 3 seg.
        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 3000);

    }

    // Imprime el resultado de la cotizacion
    mostrarResultado(resultado, moneda) {

        // Sólo nos interesa lo que se encuentra dentro del div con el id de resultado
        const resultadoAnterior = document.querySelector('#resultado > div');
        // en caso de que hay algun resultado anterior debemos borrarlo 
        if(resultadoAnterior){
            resultadoAnterior.remove();
        }

        // Muestra el spinner 
        this.mostrarSpinner();

        // Construir la etiqueta de acuerdo a la moneda(mxn, usd, ....) 
        const etiquetaMoneda = `price_${moneda}`
        // Leer el valor de resultado
        const valor = resultado[etiquetaMoneda];

        // Esta variable convierte a mayusculas la moneda, unicamente es para que se vea ,ejor
        const monedaUpper = moneda.toUpperCase();

        // Convierte lahora de UNIX a horas y minutos 
        const hora = new Date(resultado.last_updated * 1000);
        const horaActualizada = `${hora.getHours()}:${hora.getMinutes()} hrs.`;

        // Construir el template
        let templateHTML = '';
        templateHTML += `
            <div class="card cyan darken-3">
                <div class="card-content white-text">
                    <span class="card-title">Resultado</span>
                    <p>El precio de ${resultado.name} a moneda ${monedaUpper} es de: $${valor}</p>
                    <p>Última hora: ${resultado.percent_change_1h}%</p>
                    <p>Último dia: ${resultado.percent_change_24h}%</p>
                    <p>Última 7 días: ${resultado.percent_change_7d}%</p>
                    <p>Última actualización: ${horaActualizada}</p>

                <div/>

            <div/>
        `;
        // Oculta el spinner y muestra el resultado
        setTimeout(() => {
            // Imprimir el resultado
            document.querySelector('#resultado').innerHTML = templateHTML;

            // Ocultar el spinner
            document.querySelector('.spinner img').remove();

        }, 3000)
    }

    // Muestra el spinner para cuando se cotiza
    mostrarSpinner() {
        const spinnerGIF = document.createElement('img');
        spinnerGIF.src = 'img/spinner.gif';
        document.querySelector('.spinner').appendChild(spinnerGIF);
    }
}