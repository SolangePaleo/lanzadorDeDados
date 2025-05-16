/********************** declaraciones **********************/
const HTML_BOTON_LOGIN = `<a href="#login-form" class="aBoton">Iniciar Sesion</a>`
const HTML_CHIP_USUARIO =(usename)=> `
    <p class="chip-usuario">${usename}</p> 
    <button class="btn-cierre" onclick="SESION.cerrarSesion()" > Cerrar Sesión</button> `

const ID_COMPONENTE_USUARIO = "usuario"
const ID_SECCION_FORM_LOGIN = "secion-formulario"

class Sesion{
    usuario=null
    KEY_LOCAL ="sesion_usuario"

    comprobarSesion=()=>{
        let sesionLocal = this.getLocal(this.KEY_LOCAL)
        console.log(sesionLocal)
        if(sesionLocal){
            this.iniciarSesion(sesionLocal,null)
        }
    }
    
    iniciarSesion=(user,pass)=>{
        /**
         * valido al usuario
         */
        this.usuario = user
        this.setCabecera()
        this.hideShowFormulario(false)
        this.setLocal(this.KEY_LOCAL,user)
    }

    cerrarSesion=()=>{
        this.usuario=null
        this.setCabecera(true)
        this.hideShowFormulario()
        localStorage.removeItem(this.KEY_LOCAL)
    }

    sesionActiva=()=>this.usuario!=null

    setCabecera=(cierre=false)=>{
        const el = document.getElementById(ID_COMPONENTE_USUARIO)
        if(!el){
            console.error("No se pudo obtener el componente HTML de ususario")
            alert("Fallo de inicio de sesión")
            return -1
        }
        el.innerHTML = !cierre? HTML_CHIP_USUARIO(this.usuario) : HTML_BOTON_LOGIN
    }

    /** 
     * Funcion para mostrar u ocultar la secciòn del formulaario de login
     * @input mostrar: boolean - por defecto true = mostrar
     * @ouput -1 | undefined: si hay error | ejecuciòn exitosa
     */
    hideShowFormulario=(mostrar=true)=>{
        const form = document.getElementById(ID_SECCION_FORM_LOGIN)
        if(!form){
            console.error("No se pudo obtener el componente HTML de formulario")
            return -1
        }
        form.style.display=mostrar?"block":"none"
    }

    setLocal=(key,value)=>{
        localStorage.setItem(key,value)
    }

    getLocal=(key)=>{
        /** validar que la llave exista */
        return localStorage.getItem(key)
    }

}

function onLogin(event){
    /** evita que se recargue la pagina que es el  
     * evento por defecto del formulario
    */
    event.preventDefault()
    
    console.log("--------SE APRETO EL BOTON SUBMIT -----------")
    console.log(event.target)
    
    if(!event.target){
        console.error("No se pudo capturar el formulario")
        return -1
    }

    let usename, pass;
    usename = document.getElementById("username").value 
    pass = document.getElementById("pass").value  

    /**
     * 
     validaciones.... 
     * 
     */
    
    SESION.iniciarSesion(usename,pass)
     
}

/********************** ejecuciòn ************************/

const SESION = new Sesion()
const FORMULARIO_LOGIN = document.getElementById("login-form")
FORMULARIO_LOGIN.addEventListener("submit",onLogin)

console.log("--------------------------------------------------------")
localStorage.setItem("local","Storage Local") //<--- dominio navegador
sessionStorage.setItem("sesion","Storage Sesion") //<--- dominio pestaña