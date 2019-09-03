// Este archivo contiene las consultas hacia la API (https://coinmarketcap.com/api/)
// Todo esto se logra con ayuda de async-await y usando formato JSON

class Cotizador{

    // Obtiene todo el JSON con las criptomonedas
    async obtenerMonedasAPI() {
        // Fetch a la api
        const urlObtenerMonedas = await fetch('https://api.coinmarketcap.com/v1/ticker/');

        // Convertimos a JSON la respuesta que nos regresa
        const monedas = await urlObtenerMonedas.json();

        return {
            monedas
        }

    }

    async obtenerValores (moneda, criptomoneda){
        // De acuerdo a lo que el usuario seleccione se inyectara a la url
        const urlConvertir = await fetch(`https://api.coinmarketcap.com/v1/ticker/${criptomoneda}/?convert=${moneda}`);
        // No sabemos cuanto tardara asi que usaremos await para esperar a que termine
        const resultado = await urlConvertir.json();
        return {
              resultado
        }
    }
}