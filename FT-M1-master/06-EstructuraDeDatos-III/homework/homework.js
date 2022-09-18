"use strict";

/*
 Implementar la clase BinarySearchTree, definiendo los siguientes métodos recursivos:
  - size: retorna la cantidad total de nodos del árbol
  - insert: agrega un nodo en el lugar correspondiente
  - contains: retorna true o false luego de evaluar si cierto valor existe dentro del árbol
  - depthFirstForEach: recorre el árbol siguiendo el orden depth first (DFS) en cualquiera de sus variantes, según se indique por parámetro ("post-order", "pre-order", o "in-order"). Nota: si no se provee ningún parámetro, hará el recorrido "in-order" por defecto.
  - breadthFirstForEach: recorre el árbol siguiendo el orden breadth first (BFS)

  El ábrol utilizado para hacer los tests se encuentra representado en la imagen bst.png dentro del directorio homework.
*/

function BinarySearchTree(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

BinarySearchTree.prototype.size = function() {
  let size = 1; 
  if(!this.left && !this.right){
    return size;
  }else{
    if(this.left && !this.right){
      return size = this.left.size() + 1;
    }else if(!this.left && this.right){
      return size = this.right.size() + 1;
    }
  }
  /*Si ambos son hijos ---> Caso Default,"PRESTAR ATENCION"*/
  return size + this.left.size() + this.right.size();
}

BinarySearchTree.prototype.insert = function(value) {
  let nodeHoja = new BinarySearchTree(value);
  //let size = 1;
  if(value < this.value){
    if(this.left === null){
      this.left = /*new BinarySearchTree(value)*/nodeHoja;
    }else{
      this.left.insert(value);
    }
  }
  if(/*nodeHoja*/value >= this.value){
    if(this.right === null){
      this.right = /*new BinarySearchTree(value)*/ nodeHoja;
    }else{
      this.right.insert(value);
    }
  }
   //return size = nodeHoja.size();
}

BinarySearchTree.prototype.contains = function(value) {
  //Debe devolver true o false si encuentro el valor en este arbol.
  //Pregunto si en el root (raiz) es este valor.
  if(value === this.value){
    return true;
  }
  if(value < this.value){
    if(!this.left){
      return false;
    }else{
      return this.left.contains(value);
    }
  }else{
    if(!this.right){
      return false;
    }else{
      return this.right.contains(value);
    }
  }
  
}

BinarySearchTree.prototype.depthFirstForEach = function(cb, order) {
  if(order === "in-order" || !order){
    this.left && this.left.depthFirstForEach(cb, order);//*1
    cb(this .value);
    this.right && this.right.depthFirstForEach(cb, order);
  }else if(order === "pre-order"){
    cb(this.value);
    this.left && this.left.depthFirstForEach(cb, order);
    this.right && this.right.depthFirstForEach(cb, order);
  }else if(order ==="post-order"){
    this.left && this.left.depthFirstForEach(cb, order);
    this.right && this.right.depthFirstForEach(cb, order);
    cb(this.value);
  }
  /*if(order === "in-order"){
    callBack(this.value);
    console.log(this.value);
  }
  //*1--if(this.left){
    this.left.depthFirstForEach(cb, order);
  }
  callBack(this.value);
  if(this.right){
    this.depthFirstForEach();
  }
    */
  

}

BinarySearchTree.prototype.breadthFirstForEach = function(callBack,array) {
  if(array == null){//preguntamos si existe array, para poder crear una nuevo y vacio.
    var array = []; 
  }
  if(this.left){
    array.push(this.left)
  }
  if(this.right){
    array.push(this.right)
  }
  
  callBack(this.value)
  array.length > 0 && array.shift().breadthFirstForEach(callBack, array);
 
  /*if(!array){
  var array [];
 }
 //cb(20) ---> [15, 25].shift() --> 15 -->[25]
 callBack(this.value);
 this.left && array.push(this.left);
 this.right && array.push(this.right);
 array.length && array.shift().breadthFirstForEach(callBack, array);
 */
}

// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
  BinarySearchTree,
};
