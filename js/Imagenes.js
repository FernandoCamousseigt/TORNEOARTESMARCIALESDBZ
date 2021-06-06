import Personajes from "./Consulta.js";

//obtener nombre de personaje
document.getElementById("buttonImages").addEventListener("click", async () => {
    const { personajes } = await Personajes.getData();
    console.log(personajes);
    const pj = document.getElementById("nombre").value;
//obtener imagen del personaje en el arreglo de dbz.json  . con find encontrar el objeto con la propiedad name = al pj o al nombre que ha seleccionado el usuario. y luego entra al atributo imagenes
const imagenesPjTemplate = personajes
.find((p) => p.name == pj)
// se realiza mapeo del atributo imagenes que tambien es un arreglo y devuelva el template img width 200 etc. template que luego se pondra en la ventana modal. i es el nombre de la imagen de esa iteracion
.imagenes.map((i) => `<img width="200" src="/assets/imgs/${pj}/${i}" />` )
//.map devuelve un arreglo. por eso agrego join para que tranforme un arreglo en un string
.join ("");

//para poner template en el modal .[0] es porque es el 1er elemento. innerHTML para sobreescribir el contenido y le doy como valor el template
document.getElementsByClassName("personajes")[0].innerHTML = imagenesPjTemplate;


// para que la imagen pase como previsualizacion al formulario al hacer click. 
// forEach porque a todas las imagenes se les agrega un evento click. parametro i correspondiente a las etiquetas de imagenes

document.querySelectorAll(".personajes img").forEach((i) => {
    i.addEventListener("click", (e) => {
        $("#imagenModal").modal("toggle");
        const imagenSrc = e.target.src;    //evento.target y atributo src de la imagen donde la persona esta haciendo click dentro de la ventana modal
        document.getElementById("preview"    
        ).style.backgroundImage = `url(${imagenSrc})`;  //mapeo de prototipo para acceder al style y a la propiedad backgroundImage, con valor una interpolacion url

        });
    });

});

//resumen:
// entonces estamos esperando que se resuelva la promesa Personajes resultado del metodo getData y consulta fetch finalmente en consulta.js
//una vez teniendo ese objeto que es todo lo que esta en dbz.json, se saca el atributo personajes, se crea la constante pj y devuelve el valor que esta en el selector (pestaña goku, vegeta, trunks, etc)
//luego se prepara la constante imagenespjtemplate que basicamente es un fabricador de elementos html, en este caso la etiqueta imagenes. que tiene de manera interpolada la direccion de forma dinamica, especificamente para ese peleador seleccionado (eso es en ${pj}/${i}
//luego se realiza neuvamente manipulacion del DOM para obtener el div que esta dentro de la venta modal con la clase personajes, quiero sobreescribir el contenido de ese div. con el innerHTML se le da un nuevo valor con el de la cte imagenesPjTemplate

//luego con document.querySelectorAll se evento click a todas las imagenes dentro del div que tiene personajes (se cambia el texto no se encontraron imagenes de este personaje) por todas las imagenes y a cada una de ellas se le programa el evento click
//para obtener su src, source y con el poder sobreescribir el backgroundimage del dic del preview
