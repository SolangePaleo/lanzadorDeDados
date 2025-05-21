
export class componedorHTML{
   CLAVE_TITULO = "$LANZADOR_DADOS$" 
   footerURL = "/fragments/_footer.html"
   headerURL = "/fragments/_header.html"

   cargarHeader=async (titulo)=>{

      const HEADER = document.getElementsByTagName("header")[0]

      return this.cargarFragmento(this.headerURL)
         .then(respuesta =>{
            respuesta = respuesta.replace(this.CLAVE_TITULO,titulo)
            HEADER.innerHTML=respuesta
            //-- aca podria comprobar la sesiòn 
         })
   }

   cargarfooter=()=>{

      const FOOTER = document.getElementsByTagName("footer")[0]
      this.cargarFragmento(this.footerURL)
         .then(respuesta =>{
            respuesta = respuesta.replace()
            FOOTER.innerHTML=respuesta
         })
   }


   cargarTodo= async (titulo)=>{
      this.cargarfooter()
      return this.cargarHeader(titulo)
   }

   
   async cargarFragmento(url){
      return fetch(url)
         .then( r => r.text() )
   }
}

export function Saludo(){ 
   alert("hola")
}
export const url = "localhost"

const otraConstante = "otra cosa"
/** Lo mismo que en el ptrp script, mandamos la declaraciòn a nuestro modulo principal. 
const COMPONEDOR = new componedorHTML();
*/
