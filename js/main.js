/** Vamos a ver lo que es una importación modular */

/** por un lado me aseguro de importar la clase Sesion declaradas dentro de mi 
 * archivo "manejoSesion.js"
se puede importar un elemento puntual de un archivo como es este caso
*/
import {Sesion} from "./manejoSesion.js";

/** o se pueden importar todos los elementos de la siguiente manera */
import * as componedor from "./componedor.js";

const SESION = new Sesion()
const FORMULARIO_LOGIN = document.getElementById("login-form")
if(FORMULARIO_LOGIN) FORMULARIO_LOGIN.addEventListener("submit",SESION.onLogin)

/** cuando lo importo con un alias debo llamar a sus elementos internos a travès del mismo */
const COMPONEDOR = new componedor.componedorHTML();

/** como no podemos acceder a las declaraciones de un modulo directamente 
 * lo que haremos será poner disponibles en nuestro contexto lo que sea necesario
 * De esta forma limitamos el acceso desde el DOM 
 */

/** para el componedor: genero una funciòn con los pasos que vimos anterioremente */
const cargarTodo=(titulo) => {
    COMPONEDOR.cargarTodo(titulo)
    .then(()=>SESION.comprobarSesion())
}
window.cargarTodo = cargarTodo

/** para el cierre de sesiòn tenemos que dar la funciòn */
window.cerrarSesion = SESION.cerrarSesion

/** 
 * otra forma de ejecutar una función al cargar el documento desde el modulo 
 * sin tener que hacerla accesible en el DOM es usabdo el listener del 
 * document del evento  "DOMContentLoaded"
 */
document.addEventListener("DOMContentLoaded", () => {
    console.log("Ejecuto al cargar desde el modulo")
})