// Instanciamos las clases que sean necesarias

const cotizador = new Cotizador();
const ui = new Interfaz();

// Obtener el formulario
const formulario = document.getElementById('formulario');

// EvenListener cuando se envia el formulario
formulario.addEventListener('submit', (e)=> {
    e.preventDefault();
    
    // Para saber que moneda ha sido seleccionada
    const monedaSelect = document.getElementById('moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;
    
    // Para saber que criptomoneda ha sido seleccionada
    const criptoMonedaSelect = document.getElementById('criptomoneda');
    const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;
    
    // Comprobar que ambs campos tengas datos
    if(monedaSeleccionada === '' ||criptoMonedaSeleccionada === ''){
        // Faltan datos, imprime un alerta
        ui.mostrarMensaje('Ambos campos son obligatorios', 'deep-orange darken-4 card-panel');//El ultimo parametro son clases de materialize
    } else {
        // Todo correcto, tomar valores del select y ejecutar la busqueda
        cotizador.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada)//Obtener valores regresará un promise
            .then(data => {
                // El primer parametro es la cotizacion(un objeto) y la moneda(mxn, usd, ...)
                ui.mostrarResultado(data.resultado[0], monedaSeleccionada.toLowerCase());
                
              
            })
    }

})