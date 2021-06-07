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

//VALIDACION
//Para colocar una validacion rapida, vamos a condicionar que todos los campos que el usuario tenga que especificar tengan valor, que se consideren TRUE dentro de un IF. 
//Para ello ANTES de hacer el PUSH al arreglo de participantes (nuevoParticipante), agregaremos el siguiente IF:
    if(raza.value && nombre.value && ki.value && imagenSrcBg){  // si estos valores se consideran true entonces que ingresa un nuevo participante
        participantes.push(nuevoParticipante);
            
        nombre.selectedIndex = 0    //Linea que para que despues de que uno agregue el peleador el selector nombre del formulario vuelva a su primer option, que seria el que dice en el html linea 27 <option disabled selected> Seleccione un personaje</option>
        raza.selectedIndex = 0 //lo mismo para raza
        previewElement.style.backgroundImage = "none"; //none para que se quite la imagen del peleador
        imagenSrcBg = previewElement.style.backgroundColor = "#f0f0f0"  //volver a la imagen con el color nativo del css
        ki.value = "";  //para que se vea vacio lo ponemos como un string vacio ("")   ya que se trata de un input
            reloadTable();   //A continuacion agregamos la funcion reload table. despues del push para que se recargue despues del peleador.  agregamos reloadTable aqui porque queremos que cada vez que se registre un nuevo participante se recargue la tabla    //reloadtable aqui, porque es en el caso de exito ( o true)

    }else{
        alert("Faltan datos por llenar")
    }

//Una vez teniendo la instancia del peleador, procederemos a realizar un push en el arreglo participantes que creamos de forma global y le pasamos como argumento nuevo participante

    //participantes.push(nuevoParticipante);
    //console.log(participantes); //con console.log confirmaremos que se esta agregando un nuevo participante. poniendo ademas en el html la direccion del index.js



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

//HABILIDAD ESPECIAL
//Es que cuando el usuario haga click en el boton, se incremente el poder de pelea. Es por ello que en el template de mas arriba, en la linea 85 viene con onclick="activarHabilidad"
// Ahora crearemos la funcion. Como estamos trabajando con SCRIPTS de tipo MODULO, no vamos a poder una funcion como ECMAScript5 ni como ES6, porque no lo va a reconocer. cuando son tipo scripts tipo modulo el SCOPE es DIFerente
//Entonces agregaremos al objeto windows,que es una variable global, le agregaremos el metodo ActivarHabilidad. que recibira como parametro la i , que en este caso corresponde al indice de esta iteracion forEach del arreglo participantes

window.activarHabilidad = (i) => {
    const participante = participantes [i]    //ubicar a ese peleador a traves del indice, ese peleador que se selecciono y se hizo click en el boton
    if (participante.getRaza() == "Saiyajin"){     
        participante.Transformacion();               //metodo en caso de que sea saiyajin
    } else if (participante.getRaza() == "Humano"){
        participante.Coraje();                        //metodo en caso de que sea humano
    }
    reloadTable();                                    //para recargar la tabla
};


////QUIEN ES EL MAS FUERTE

document.getElementById("btnMasFuerte").addEventListener("click", () => {       
    const masFuerte = participantes.sort(      
        (a, b) => b.getPoder() - a.getPoder()
    )[0];                                        
    const nombre = masFuerte.getNombre();         

    document.querySelector(`[data-fighter='${nombre}'] div`).style.boxShadow = 
    "0px 0px 5px 1px yellow"; 
});


/* ////QUIEN ES EL MAS FUERTE

document.getElementById("btnMasFuerte").addEventListener("click", () => {       //manipulacion del DOM, boton en html linea 73 con id= btnMasFuerte  y evento click que ejecuta el siguiente callback:
    const masFuerte = participantes.sort(      // sort es para ordenar elementos dentro de un arreglo
        (a, b) => b.getPoder() - a.getPoder()     //entonces con esa formula los ordeno de Mayor a menor. por lo tanto el 1er elemento del arreglo será el peleador con mayor poder de pelea.
    )[0];                                         //[0]  indice 0 es para indicar que es el 1er elemento dentro del arreglo
    const nombre = masFuerte.getNombre();         // obtenemos el nombre con el getter. getNombre porque corresponde al del template de data-fighter (linea 74 de este index.js) para poder ubicar especificamente este div correspondiente al peleador dentro de la tabla de participantes. 

    document.querySelector(`[data-fighter='${nombre}'] div`).style.boxShadow = 
    "0px 0px 5px 1px yellow";  // al div que esta dentro de este div, o sea ala carta( card)  se le da con el style un box shadow de esos pixeles y color amarillo.

});

// */