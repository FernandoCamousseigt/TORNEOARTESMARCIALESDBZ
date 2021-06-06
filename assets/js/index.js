import { Saiyajin, Humano } from "./clases/Razas.js";

//Obtener los valores que se estan agregando al formulario. Y generar la funcion que va a registrar al peleador en la tabla de participantes:

let participantes = []   //[] porque son varios participantes

//funcion para que al hacer click en el botonRegistrar se agreguen el nombre, raza y  preview
document.getElementById("btnRegistrar").addEventListener("click", () => {

    let nombre  = document.getElementById("nombre"); //nombre de id del html linea 26
    let raza  = document.getElementById("raza");
    let previewElement = document.getElementById("preview"); //
    let imagenSrcBg = previewElement.style.backgroundImage; //obtener el fondo
    let imgSrc = imagenSrcBg.slice(5, imagenSrcBg.length - 2);    // para saque la direccion del string completo del backgroundImage
    let ki = document.getElementById("poderPelea"); //poderPelea que podemos contrar por esa id en el Html

    //creacion de nuevo participante:
    let nuevoParticipante;

    ///segun la raza del participante es que se va a  hacer la instancia de cierta clase. ya que cada clase es una raza diferente habrá que hacer una evaluacion segun la raza que esta seleccionando el usuario:

    if (raza.value == "Saiyajin"){
        nuevoParticipante = new Saiyajin(
            nombre.value, 
            imgSrc.value, 
            ki.value, 
            raza.value
            );
            //sino es humano:
    } else if (raza.value == "Humano"){
        nuevoParticipante = new Humano(
            nombre.value, 
            imgSrc.value, 
            ki.value, 
            raza.value
            );
    }

//Una vez teniendo la instancia del peleador, procederemos a realizar un push en el arreglo participantes que creamos de forma global y le pasamos como argumento nuevo participante

    participantes.push(nuevoParticipante);
    //console.log(participantes); //con console.log confirmaremos que se esta agregando un nuevo participante. poniendo ademas en el html la direccion del index.js

});