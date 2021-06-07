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
            imgSrc, //No necesita .value porque ya es la url
            ki.value, 
            raza.value
            );
            //sino es humano:
    } else if (raza.value == "Humano"){
        nuevoParticipante = new Humano(
            nombre.value, 
            imgSrc, //No necesita .value porque ya es la url
            ki.value, 
            raza.value
            );
    }

//Una vez teniendo la instancia del peleador, procederemos a realizar un push en el arreglo participantes que creamos de forma global y le pasamos como argumento nuevo participante

    participantes.push(nuevoParticipante);
    //console.log(participantes); //con console.log confirmaremos que se esta agregando un nuevo participante. poniendo ademas en el html la direccion del index.js

    //A continuacion agregamos la funcion reload table. despues del push para que se recargue despues del peleador.  agregamos reloadTable aqui porque queremos que cada vez que se registre un nuevo participante se recargue la tabla
    reloadTable();

});

//Ahora crearemos una tabla de Participantes:
//funcion que tome todos los participantes del arreglo participantes que ya creamos y que llenamos en cada click de participar y lo muestre en una tarjeta de bootstrap. Será la funcion siguiente:

const reloadTable = () => {
    const participantesTemplate = document.getElementById("Participantes");         //similar a la creacion del template en las imagenes. de crear un string largo con elementos html.  //participantes linea 77 html que es la tabla.
    participantesTemplate.innerHTML = ""; //ahora se le incluye las tarjetas correspondientes a cada peleador.  // se pone .innerHTML=""  para limpiar el espacio previo y no se vaya acumulando. por lo tanto se vaya sobreescribiendo
    participantes.forEach ((p, i) => {   // .forEach para recorrer el arreglo participantes. parametros son personaje (p) y el indice (i).
        //vamos a concatenar a participantesTemplate (la tabla) con el template de bootstrap, que es una carta con data-fighter. los atributos data permiten colocar una variable de forma personalizada a un elemento html para su manipulacion con JS y lo necesitamos hacer con una funcion que agregaremos al final que sera la ubicacion del peleador más fuerte. 
        participantesTemplate.innerHTML += `  
        <div class="px-3 pb-2 participante" data-fighter=" ${p.getNombre()}">
            <div class="card">
            <img
                src="${p.getImg()}"
                class="card-img-top"
            />
            <div class="card-body">
                <h4 class="card-title">${ p.getNombre()}  </h4>
                <hr class="w-50 mx-auto">  
                <h6 class="card-text">Raza: ${ p.getRaza() } </h6>  
                <h6 class="card-text">Poder de pelea: <span class="text-danger"> ${p.getPoder()} </span> </h6> 
                <button class="btn btn-outline-warning" onclick="activarHabilidad('${i}')"> Habilidad Especial </button>        
        
            </div>
            </div>
        </div>

        `;   
    })   

};

