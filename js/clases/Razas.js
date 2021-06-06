import Personaje from "./Personaje.js";

//subclase Saiyajin se extiende de la superclase Personaje

class Saiyajin extends Personaje {
    constructor(nombre, img, poder, raza){
        super(nombre, img, poder, raza);  //porque heredo esos atributos  
    }
    
    Transformacion(){
        let poder = this.getPoder();
        this.setPoder( parseInt(poder *1.8));  //ejecuta el setPoder, pasando como argumento parseint de la variable poder x 1.8 ... multiplica el poder actual * 1.8 (o aumento del 80%)
    }
}


//Para el caso de Humano es lo mismo, pero en vez de transformacion es coraje con otro multiplicador

class Humano extends Personaje {
    constructor(nombre, img, poder, raza){
        super (nombre, img, poder, raza);  //porque heredo esos atributos
    }
    
    Coraje() {
        let poder = this.getPoder();
        this.setPoder( parseInt(poder *1.2));  //ejecuta el setPoder, pasando como argumento parseint de la variable poder x 1.8 ... multiplica el poder actual * 1.2 (o aumento del 20%)
    }
}

//hago console.log para probar. y agrego el script en html para enlazar el archivo razas.js.  por ejemplo console.log(new Humano("krillin", "...", 1234, "..."));  en prototipo debe aparecer el metodo Coraje. si funciona entonces lo borro y agrego export

export { Saiyajin, Humano };

//ahora para programar la interaccion con el usuario al hacer click en el boton registrar. entonces creo el archivo index.js