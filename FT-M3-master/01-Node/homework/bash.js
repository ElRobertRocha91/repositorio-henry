/*//Output un prompt
process.stdout.write('prompt > ');
//el evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
    var cmd = data.toString().trim();
    //remueve la nueva línea
    process.stdout.write('You typed: ' + cmd);
    process.stdout.write('\nprompt > ');
});*/

/*-------------------------------------------------------------------------- */
const commands = require('./commands');
//Refactoreando:
const done = function (output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt >');
}

//Output un prompt
process.stdout.write('prompt > ');
//El evento stdin 'data' se disparara cuando el user escriba una línea:
process.stdin.on('data', function (data) {
    var args = data.toString().trim().split(' ');//remueve la nueva línea
    //el usuario puede escribir "date" para buscar la fecha
    var cmd = args.shift();
    if(commands.hasOwnProperty(cmd)) {
        //process.stdout.write(Date());//-->El objeto Date es nativo de JS y nos devuelve la fecha.
        commands[cmd](args, done);//-->Ahora cada funcion de nuestros comandos va a recibir dos parametros.
    }else{
        process.stdout.write('Command not found');
    }
    //O puede escribir "pwd", aqui tiene dos metodos, pero vamos a usar cwd, que nos mostraria la ruta en la cual estamos parados.
    //if(cmd === 'pwd') {
        //process.cwd()
        //process.stdout.write(process.cwd());
        //commands[cmd]()
    //}
    process.stdout.write('\nprompt > ');
});

/*------------------------------------------------------------------------- */

//Bien ahora vamos a mejorar nuestro Workflow:
//instalaremos npm install --save nodemon, que nos permitira detectar cambios en el código y actualizar automaticamente, reiniciando el programa sin la necesidad de matar(killer) a la terminal.
//cuando lo instalemos en nuestro package.json se nos agregara la nueva dependencia: {"nodemon": "^2.0.20"}
//Ahora cuando escribamos en la consola npm start vamos a ejecutar bash.js tal como lo hicimos manualmente...
//A continuacios importaremos los comandos desde la carpeta ./commands/index.js, para continuar trabajando en modulos.
//Ya importados procedemos a hacer algunos cambios en nuestro bash para que pueda devolvernos un error si el commands que el usuario ingreso no existe.
//Procedimos a agregarle un nuevo comando ls para que cuando el usuario lo tipee ejecutara la funcion ls, que nos mostrara un listado de todas nuestras carpetas en forma de un array dado que usamos un metodo de los array
//Luego le agregamos el comando echo, que cumpliria el papel de console.log de la terminal, para esto vamos a tener que modificar la forma de parsear el input (data)
//echo hola mundo --> hola mundo
//"echo hola mundo".split(' ')-->["echo", "hola", "mundo"].shift()-->"echo" --> ["hola..."]