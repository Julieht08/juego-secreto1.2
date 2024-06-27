//Declarar variables 

let numeroSecreto = 0; //variable de ambito glogal o alcance global
let intentos = 0;
let listaNumeroSorteado = []; //se declara un ARRAY vacio
let numeroMaximo = 10;

console.log(numeroSecreto);

function asignarTextoAElemento(elemento, texto) //dentro de parentesis van los parametros, que quedan disponibles como variables dentro de la función genérica, de múltiple uso
{
    let elementoHTML = document.querySelector(elemento); //elementoHTML = USAR DE FORMA GENÉRICA LA VARIABLE ej: h1, h2, p, elementos de HTML
    elementoHTML.innerHTML = texto;
    return; //aunque la función no retorne nada se usa como BUENA PRACTICA 
}

function verificarIntento() //función para oprimir un botón
{
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value); //para tener disponible el valor directamnete con el identificador del objeto
    //parseInt convierte el string a number, cambia el tipo de dato

    console.log(intentos);
    if (numeroUsuario === numeroSecreto)
    {
        //el usuario acerto el número
        asignarTextoAElemento('p', `Acerto el número secerto en ${intentos} ${(intentos === 1 ? 'intento' : 'intentos')}!!`); //se usa una función dentro de otra, para llamarla, se puede cambiar el texto
        document.getElementById('reiniciar').removeAttribute('disabled');
        //para activar el boton de nuevo juego solo cuando ganer la partida, removiendo el atributo de dasabilitado
    } else {
        //el usuario no acerto el número
        if (numeroUsuario > numeroSecreto) {
            asignarTextoAElemento('p', 'El número secerto es menor!!');
        } else {
            asignarTextoAElemento('p', 'El número secerto es mayor!!');
        }
        intentos++; 
        limpiarCajaDeTexto();
    }
    return;
}

function limpiarCajaDeTexto(){
    document.querySelector('#valorUsuario').value = ''; //se puede usar el quierySelector y el # para buscar por Id
    //al valor que se ingreso en la caja de texto, eliminarlo y vaciar la caja de texto
}

function generarNumeroSecreto() //función para RETORNAR el número secreto
{
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo+1);
    
    console.log(numeroGenerado); 
    console.log(listaNumeroSorteado);
    //Si ya se acertaron todos los números 
    if (listaNumeroSorteado.length == numeroMaximo) {  //si ya se acertaron todos los nérmuros se muestra un mensaje
        asignarTextoAElemento('p', 'Ya se acertaron todos los números posibles');
    } else { //de lo contrario continua el juego
        //Si el numero aleatorio esta en la lista se cumple cierta condición, de lo contrario otra
        if (listaNumeroSorteado.includes(numeroGenerado)) { //se usa el includes para recorrer la lista y verificar si el numero generado ya se encuentra o no
            return generarNumeroSecreto(); //se usa dentro de si misma la función
        } else { //si no esta incluido el numero generado en la lista pasa este al final de la lista y se realiza el resto
            listaNumeroSorteado.push(numeroGenerado); //se usa el PUSH para pasar el dato al final de la lista
            return numeroGenerado; ///se retorna el numero generado
        }
    }
}

function condicionesIniciales() { //función para los mensajes iniciales
    asignarTextoAElemento('h1', 'Juego del número Secreto!!'); //para llamar a la función, también se puede llamar una función desde otra función
    asignarTextoAElemento('p', `Ingrese un número del 1 al ${numeroMaximo}: `); //se asignan los valores a las variables(2) y los elementos de HTML(1)
    numeroSecreto = generarNumeroSecreto(); //no se declara nuevamente la variable, sino que se imvoca con la función, dandole valor a la variable
    intentos = 1; //empieza con un intento
}

function reiniciarJuego() {
    //Una función puede hacer varias acciones
    //1 limpiar la caja de texto
    limpiarCajaDeTexto();
    //2 mostrar el mensaje del intervalo de número
    //3 generar el nuevo número aleatorio
    //4 inicializar el número de los intentos
    condicionesIniciales(); //hace las acciones 2, 3 y4
    //5 deshabilitar nuevamente el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true'); //se vuelve a desabilitar el botón
}

condicionesIniciales(); //se llama la función










