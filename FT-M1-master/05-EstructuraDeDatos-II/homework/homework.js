"use strict";

/*
Implementar la clase LinkedList, definiendo los siguientes métodos:
  - add: agrega un nuevo nodo al final de la lista;
  - remove: elimina el último nodo de la lista y retorna su valor (tener en cuenta el caso particular de una lista de un solo nodo y de una lista vacía);
  - search: recibe un parámetro y lo busca dentro de la lista, con una particularidad: el parámetro puede ser un valor o un callback. En el primer caso, buscamos un nodo cuyo valor coincida con lo buscado; en el segundo, buscamos un nodo cuyo valor, al ser pasado como parámetro del callback, retorne true. 
  Ejemplo: 
  search(3) busca un nodo cuyo valor sea 3;
  search(isEven), donde isEven es una función que retorna true cuando recibe por parámetro un número par, busca un nodo cuyo valor sea un número par.
  En caso de que la búsqueda no arroje resultados, search debe retornar null.
*/

function LinkedList() {
  this._lenght = 0;
  this.head = null;
}

function Node(value) {
  this.value = value;
  this.next = null;
}
//Como la estructura de datos tipo lista, no tiene una estructura nativa en JavaScript, la tenemos que crear nosotros:
//1° Crearemos un método que agrege un nuevo nodo al final de la listas;
LinkedList.prototype.add = function(value){
  let node = new Node(value);
  let current = this.head;
  
  if(current === null){
    this.head = node;
    this._length++;
    return node; 
  }

  while(current.next !== null){
    current = current.next;
  }
  current.next = node;
  this._lenght++;
  return node;
}
LinkedList.prototype.remove = function(){
  let current = this.head;
  
  if(!current){
    return null;
  }

  if(!current.next){
    this.head = null;
    return current.value;
  }

  while(current.next.next){
    current = current.next;
  }
  let aux = current.next;
  current.next = null;
  this._length--;
  return aux.value;

}

LinkedList.prototype.search = function(value){
  let current = this.head;
  //let verificador = false;
  if(current === null){//(!current) -->Existe el head? o es una lista vacia!
    return null;
  }
  //Aqui voy a preguntar, si es una lista de un solo nodo y si el valor de parametro buscado esta en este nodo, devolveme el valor del nodo:
  if(current.value === value){
    return value;
  }
  //Pero si es una lista de mas de un nodo, la tengo que recorrer nodo por nodo y preguntarme si el argumento que se le paso es un valor o un callback: 
  while(current !== null){//Mientras current( "apunta a this.head que mira al primer nodo de la lista") sea distinto de null, pregunto:
    //Primero busco el callbacks:
    if(typeof value === "function"){//¿Pregunto con que tipo de operandu estoy tratando?
      //Si lo es, preguntamos "si tiene el value pasado por parametro o si existe devolveme tu value":
      if(value(current.value)){//Si lo tiene, lo retorno
        return current.value;
      }
    }else{//Si typeof value nos devuelve otro tipo de operandu. Ej: "Number".Entra esta pregunta! Ahora busco el valor. 
      if(current.value === value){//El nodo actual tiene el value que pasamos por parametro?, si lo tiene lo retorno y si no salgo.
        return value;
      }
    }
    //Cuando salgo de mi busqueda cambio mi posicion de partida al siguiente nodo, antes de que se repita la nueva busqueda:
    current = current.next;
  }
  //En caso que no este el valor pasado por parametro ni el callback en esta lista, devuelvo null o "No existe en esta lista":
  return null;
    
  /*
  if(current.value === value){
    verificador = true;
   }
  while(!verificador && current.next !== null){
    current = current.next;
    if(current.value === value){
      verificador = true;
    }
  }
  if(verificador){
    return current.value;
  }else{
    return null;
  }
 */
}


/*
Implementar la clase HashTable.

Nuetra tabla hash, internamente, consta de un arreglo de buckets (slots, contenedores, o casilleros; es decir, posiciones posibles para almacenar la información), donde guardaremos datos en formato clave-valor (por ejemplo, {instructora: 'Ani'}).
Para este ejercicio, la tabla debe tener 35 buckets (numBuckets = 35). (Luego de haber pasado todos los tests, a modo de ejercicio adicional, pueden modificar un poco la clase para que reciba la cantidad de buckets por parámetro al momento de ser instanciada.)

La clase debe tener los siguientes métodos:
  - hash: función hasheadora que determina en qué bucket se almacenará un dato. Recibe un input alfabético, suma el código numérico de cada caracter del input (investigar el método charCodeAt de los strings) y calcula el módulo de ese número total por la cantidad de buckets; de esta manera determina la posición de la tabla en la que se almacenará el dato.
  - set: recibe el conjunto clave valor (como dos parámetros distintos), hashea la clave invocando al método hash, y almacena todo el conjunto en el bucket correcto.
  - get: recibe una clave por parámetro, y busca el valor que le corresponde en el bucket correcto de la tabla.
  - hasKey: recibe una clave por parámetro y consulta si ya hay algo almacenado en la tabla con esa clave (retorna un booleano).

Ejemplo: supongamos que quiero guardar {instructora: 'Ani'} en la tabla. Primero puedo chequear, con hasKey, si ya hay algo en la tabla con el nombre 'instructora'; luego, invocando set('instructora', 'Ani'), se almacenará el par clave-valor en un bucket específico (determinado al hashear la clave)
*/

function HashTable() {
  this.numBuckets = 35;
  this.sizeBuckets = [];
}

HashTable.prototype.hash = function(argument){
  let result = 0;
  if(typeof argument === "string"){
    for(let i = 0; i < argument.length; i++){
      result += argument.charCodeAt(i);
    }
  }else{
    return "Solo se aceptan cadenas de caracteres alfabéticos";
  }
  return result % this.numBuckets;
}

HashTable.prototype.set = function(key, value){
  if(typeof key !== "string") throw new TypeError("Keys must be strings"); 
  let indice = this.hash(key);
  if(!this.sizeBuckets[indice]){
    this.sizeBuckets[indice] = {}
  }
  this.sizeBuckets[indice][key] = value;
}
HashTable.prototype.get = function(key){
  let indice = this.hash(key);
  return this.sizeBuckets[indice][key];
}

HashTable.prototype.hasKey = function(key){
  let indice = this.hash(key);
  //return this.sizeBuckets[indice].hasOwnProperty(key); --> Una solución más eficiente.
  if(this.sizeBuckets[indice][key]){
    return true;
  }else{
    return false;
  }
}


// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
  Node,
  LinkedList,
  HashTable,
};
