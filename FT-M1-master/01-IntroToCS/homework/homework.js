'use strict'

function BinarioADecimal(num) {
  // tu codigo aca
  let array = num.split("").reverse().join("");
  let suma = 0;
  
  for (let i = 0; i < array.length; i++){
    suma += array[i] * 2 ** i;
  }
  return suma;

}

function DecimalABinario(num) {
  // tu codigo aca
  let numBinario = [];

  while(num !== 0){
    let numDivisor = Math.floor(num/2);
    let resto = (num % 2).toString();
    numBinario.push(resto);
    num = numDivisor;
  }
  return numBinario.reverse().join("");

}


module.exports = {
  BinarioADecimal,
  DecimalABinario,
}