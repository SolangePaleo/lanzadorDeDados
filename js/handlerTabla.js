
/** Funciòn estandarizada para la creación de elementos HTML 
 * @Input tipo: string
 * @Input id: string <opcional>
 * @Input clase: string <opcional> 
*/
function crearElemento(tipo, id=null, clase=null) {
    let elemento = document.createElement(tipo);
    if (id !== null && id !== undefined) {
        elemento.setAttribute("id", id);
    }
    if (clase !== null && clase !== undefined) {
        elemento.setAttribute("class", clase);
    }
    return elemento;
}


class Tirada{
    constructor(dado, valor=null){
        this.dado = dado
        this.valores = valor? [valor]: []
    }
    dado=""
    valores=[]
}

class TablaPuntajes {
    ID_TABLA = "tablaPuntajes"
    TABLA = document.getElementById(this.ID_TABLA)
    data = []

    /* [{D4 : 4}, {D6 : 3}, {D8 : 1}] */
    cargarTirada=(valores = {})=>{
        if(valores.length<=0) return -1

        /* recorrer todos los atributos de un objeto
                    t = "d4"
                    valores.d4 == valores["d4"]
        */
        for (let t in valores){
            let dado = t
            let valor = valores[t]
            
            if(!dado || !valor)  throw "Valor de tirada inválido"
            
            let coincide = this.data.filter(v=>v.dado==dado)
            
            if(coincide.length>0){
                coincide[0].valores.push(valor)
            }else{
                let tirada = new Tirada(dado,valor)
                this.data.push(tirada)
            }
        }
        this.representarTirada();
    }

    representarTirada=()=>{
        if(!this.TABLA) throw "No se pudo encontrar el objeto con ID: "+this.ID_TABLA
        let tHead = this.TABLA.children[0]
        let tBody = this.TABLA.children[1]
        let tFoot  = this.TABLA.children[2]

        tHead.innerHTML=""
        tBody.innerHTML=""
        tFoot.innerHTML=""

        //----------------------------------------cabecera
        let tr = crearElemento('tr');
        let th = crearElemento('th')
            th.innerHTML = 'Ronda' 
            tr.appendChild(th)
        let contadorRonda = 0
        
        let totalidor = []
        this.data[0].valores.forEach(e => {
            contadorRonda++
            let td = crearElemento('td')
            td.innerHTML = contadorRonda
            tr.appendChild(td)

            // inicializo mis totales por ronda
            totalidor.push(0)
        });

        tHead.appendChild(tr)
        

        //----------------------------------- tbody-
        this.data.forEach(d => {
            
            let trB = crearElemento('tr')
            let thB = crearElemento('th')
            thB.innerHTML = d.dado
            trB.appendChild(thB)

            let pos = 0;
            /** 
             * for of devuleve los valores
             * for in devuelve las llaves
             */
            for(let v of d.valores){
                let tdB = crearElemento('td')
                tdB.innerHTML = v
                trB.appendChild(tdB)
                
                totalidor[pos] = 
                    Number.parseInt(totalidor[pos]) +
                    Number.parseInt(v)
                
                pos ++
            }

            tBody.appendChild(trB)

        })
        
        //----------------------------------- TFOOTER
        let trF = crearElemento('tr')
        let thF = crearElemento('th')
        thF.innerHTML="Totales"
        trF.appendChild(thF)
        
        totalidor.forEach(t => {
            let tdF = crearElemento('td')
            tdF.innerHTML= t
            trF.appendChild(tdF)
        });

        tFoot.appendChild(trF)

        
        //console.log(tHead,tBody,tFoot)

    }


}

const TABLA_PUNTAJES = new TablaPuntajes();

try {
    TABLA_PUNTAJES.cargarTirada({D4 : 4,D8 : 1, D6 : 3 })
    TABLA_PUNTAJES.cargarTirada({D6 : 1,D4 : 2,D8 : 2})
    TABLA_PUNTAJES.cargarTirada({D8 : 8,D4 : 1,D6 : 6})
    TABLA_PUNTAJES.cargarTirada({D4 : 4,D6 : 6,D8 : 5})
} catch (error) {
    console.error(error)
    alert("Ocurrió un error vuelva a intentarlo mas tarde")
}
