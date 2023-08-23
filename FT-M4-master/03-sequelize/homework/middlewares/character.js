const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

//POST/character(personaje)
router.post('/', async (req, res) =>{
    //==>Aclaración importante generalmente iria '/character', pero como esta especificado ya en el middlewares no hace falta por que lo identificamos al hacer el post.

    try{//3° ()

        //1° recibo por body los datos del modelo de Character:
        const {code, name, age, race, hp, mana, date_added} = req.body;
        
        //3°()Preguntamos si se recibierón los parámetros necesarios para crear al personaje:
        if(!code || !name || !hp || !mana){
            return res.status(404).send("Falta enviar datos obligatorios")//.send ==>devolvemos un texto como mensaje
        } 

        //2° creamos una instancia del mismo en la base de datos:
        const newCharacter = await Character.create({
            //create ==> es un metodo propio de (sql/sequellize)database 'db' que podemos usar para crear un nuevo personaje en la base de datos.
            code,
            name,
            age,
            race,
            hp,
            mana,
            date_added
        })
        //console.log(newCharacter)
        //5° si todos los datos son provistos debera devolver un status(201) y el objeto del personaje.
        return res.status(201).json(newCharacter)
        //Pero si lo dejamos asi como esta, seguramente se nos creara en la base de datos pero no vamos a tener ninguna respuesta y nos devolvera un objeto vacio.
        //Por que estamos trabajando con una promesa y para manejar promesas se recomiendoa usar "async" indicandole que será una función de tipo asincronica y await, esperamos a que cargue los datos y luego vaya a traerlos de la base de datos.

    //3°Ahora nos pide devolver un status 404 si no se reciben los parámetros necesarios.
    //Por lo tanto nos esta diciendo que tenemos que manejar errores try,catch
    }catch(error){//4° si hay alguna falla interna la capturamos con el catch
        return res.status(404).send("Error en alguno de los datos provistos")
    }
})

//Get/characters 
router.get('/', async (req, res) => {
    //==>Deberá retornar todos los personajes que se encuentren creados en la base de datos
    
    //PARTE DOS:
    //Ahora vamos a agregarle tambien que pueda recibir un age por query y que el filtro sea un AND de ambos campos.
    //nos traera aquellos personajes que tengan la raza dada en race y la edad dada en age:
    try {
        const {race, age} = req.query;

        const condition = {} //==>Creamos un objeto condition que usaremos en el findall()
        const where = {}  //==> Creamos un objeto where, que usaremos para machear el findAll()como en la ruta anterior.
        //Al objeto where le voy a estar agregando propiedades que me pasen por query 

        if(race) where.race = race
        //where: { race }
        if(age) where.age = age
        //where: { race, age }
        condition.where = where//==>Cuando llego aqui, tengo el objeto vacio condition y le creo una propiedad where y le agrego el objeto where que contiene race y age, que recibimos por query.
        //{ where: {race, age } }

        const characters = await Character.findAll(condition)
        return res.status(200).json(characters)
    } catch (error) {
        return res.status(404).send("Error no se pudo realizar la solicitud de consulta")
    }
    
    // try{
    //     //(2°)
    //     const {race} = req.query;

    //     //si race no existe osea si no se ingreso en la consulta(query)
    //     if(!race){

    //        //creamos una constante para guardar todos los personajes que nos traigan de la base de datos:
    //        const allCharacters = await Character.findAll()//==> findAll nos trae todos los personajes que se encuentran en la base de datos.

    //        return res.status(200).json(allCharacters)//El json lo usamos siempre que queramos devolver objetos
    //     }else{
    //         //Pero si exite por que esta entrando el valor: 
    //         const charactersByRace = await Character.findAll({//==>anda a nuestra tabla characters y traeme todos donde su atributo race coincida con el que esta en query.
    //             where: {race}
    //         })
    //         return res.status(200).json(charactersByRace)
    //     }
    // }catch(error){
    //     return res.status(404).send("Error no se pudo realizar la solicitud de consulta")
    // }

    //(2°)Ademas de consultar, necesitamos que pueda realizarlo por raza, por lo tanto nos traeremos race.
    //que deberá aceptar por query(consulta) un valor de raza para filtrar los resultados:
    //Ejemplo de la consulta: GET/characters?race=human
})

//GET/character/young
//Implementamos un nuevo endpoint que deberá traer todos los personajes
//considerados "jovenes" que serán aquellos con menos de 25 años.
//CUIDADO con el orden de las rutas...==>
//==>Si lo ponemos despues de GET/character/:code, cuando pongamos young lo va a tomar como si fuera un params,
//==>y cuando entre al findAll() no lo va a encontrar y va a romper.
//==>Por lo tanto, esta ruta es una consulta y la debemos poner antes de cualquier otra ruta que acepte parametros.
router.get('/young', async (req, res) =>{ //=> async por que vamos a manejar promesas, IMPORTANTE.
    //1°Super importante que manejemos errores:
    try {
        //2° Vamos a realizar una busqueda que nos traiga a todos los personajes(character) de la base de datos, que sean menores de 25 años:
        const characters = await Character.findAll({
            where: {
                age: { [Op.lt]: 25 }//==>Los buscamos usando el operador de comparación que sequellize ofrece entre sus distintos metodos de consultas a base de datos.
            }
        })
        //retornamos los resultados de la require(req):
        return res.status(200).json(characters)
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

//GET/character/roles/:code
//Consultamos al personaje por su codigo y cuando lo muestre debera traernos asociado la información que hay en la tabla Role:
//Esta ruta la ponesmos antes del /:code por que sino:
router.get('/roles/:code', async (req, res) => {
    try {
        const { code } = req.body;

        //Ahova vamos a buscar al personaje a la base de datos y ademas traeme la información que esta asociado en la tabla Role con el personaje
        const character = await Character.findByPk(code, { include: Role })

        return res.status(200).json(character)
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

//GET/character/:code
//Consultamos al personaje por su codigo
router.get('/:code', async (req, res) => {
    const {code} = req.params;//==> lo solicita por parámetro
    
    const characterByPk = await Character.findByPk(code)
    console.log(characterByPk)

    if(!characterByPk) return res.status(404).send(`El código ${code} no corresponde a un personaje existente`)

    return res.status(200).json(characterByPk)
})


//PUT/character/addAbilities
//Ahora vamos a agregar un PUT desde el lado del personaje que agregue una o mas habilidades.
//Lo ponemos antes de la ruta del params de put('/:attribute') para evitar romper la ruta
router.put('/addAbilities', async (req, res) => {
    try {
        
        const { codeCharacter, abilities } = req.body;

        const character = await Character.findByPk(codeCharacter)//Busca y encontra al personaje con el code que se ingreso

        //Aqui vamos a generar un array de promesas
        //Por que, sequelize trabaja con promesas por eso usamos await y async, por lo tanto vamos a mapear el arreglo abilities que nos llega.
        //Entonces en el personaje que encontraste(character) creale la habilidad que te pasamos por parámetro
        const promise = abilities.map(ab => character.createAbility(ab))
        //Ahora como .map() va a mapear cada elemento del array (abilities) que le pasamos por body y se lo vamos a  agregar al personaje que encontro en la const character(personaje)
        // y como todo método de sequelize devuelve una promesa, vamos a usa promise.all() para trabajar con el arreglo de promesas que va a estar el la const promise
        await Promise.all(promise)//con await va a esperar a que se resuelvan cada una de las promesas del arreglo

        return res.status(200).send('Salió todo Ok')

    } catch (error) {
        return res.status(404).send(error.message)
    }
})



//PUT/character/:attribute?value=...
//Hagamos un recordatorio para entender que hace un request a PUT.
//La petición a HTTP PUT crea un nuevo elemento o reemplaza una representación del elemento de destino con los datos de la petición.
//Por lo tanto esta ruta  del tipo PUT  va a modificar y actualizar los valores, de determinado atributo, que recibamos por parametro.
router.put('/:attribute', async (req, res) => {
    
    try {
        //bien ahora vamos a usar Destructuring paradesempacar la propiedad del objeto solicitado, a attibute los recibimos por parametro y a value por consulta. 
        const {attribute} = req.params;
        const {value} = req.query;

        //Ahora vamos a esperar que el metodo update vaya a nuestra base de datos, busque a  todos nuestros personajes donde su atributo  edad (age), este vacio(null) y lo reemplazar con el value ingresado (aclaración a value podemos recibirlo como tambien es posible que no)
        await Character.update({[attribute]: value}, {//==>update recibe dos parametros el primero van a ser los datos que se van a recibir por la ruta y el segundo parametro la condición, para que se puedan realizar las modificaciones.
            where:{
                [attribute]: null
            }
        })

        return res.status(200).send('Personajes actualizados')
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router;