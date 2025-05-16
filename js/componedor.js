const CLAVE_TITULO = "$LANZADOR_DADOS$" 

class componedorHTML{
   footerURL = "/fragments/_footer.html"
   headerURL = "/fragments/_header.html"

   cargarHeader=async (titulo)=>{

      const HEADER = document.getElementsByTagName("header")[0]

      return this.cargarFragmento(this.headerURL)
         .then(respuesta =>{
            respuesta = respuesta.replace(CLAVE_TITULO,titulo)
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

const COMPONEDOR = new componedorHTML();

