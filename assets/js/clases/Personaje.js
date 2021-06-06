//creacion de la super clase "Personaje"
class Personaje {
    constructor(nombre, img, poder, raza){

        //Se usará Closures de encapsulamiento. Entonces creo las variables:
        let Nombre = nombre;
        let Img = img;
        let Poder = poder;
        let Raza = raza;
        
        //Cada variable se retorna por medio de un getter, entonces se escribe lo siguiente
        this.getNombre = () => Nombre;  //retorna la variable Nombre
        this.getImg = () => Img;        //retorna la variable Img
        this.getPoder = () => Poder;
        this.getRaza = () => Raza;

        this.setPoder = (poder) => (Poder = poder);
    }
        //la clase Personaje tiene un metodo setter. recibe un parametro poder, reasigna el valor a la variable Poder que está encapsulada dentro del constructor. con lo que que esta recibiendo el parametro ella misma


        //A continuacion se crean los metodos:
        
        get Nombre() {
            return this.getNombre();   //retorna la ejecuion de getNombre
        }

        get Img() {
            return this.getImg();   //retorna la ejecuion de getImg
        }

        get Poder() {
            return this.getPoder();   
        }

        get Raza() {
            return this.getRaza();   
        }

        set Poder(poder) {
            return this.getPoder(poder);
        }
   //importante recordar que se le debe agregar el set Poder

}
//console.log (new Personaje("goku","..", 1234, "wewe"));
//y agregamos el script type src Personaje.js en el html para poder verlo en consola
// veo si corre bien y si lo hace elimino el console.log

//Dejo disponible la clase Personaje con export, para que el archivo razas.js pueda importarla. razas.js contiene las subclases saiyajin y humano
export default Personaje;