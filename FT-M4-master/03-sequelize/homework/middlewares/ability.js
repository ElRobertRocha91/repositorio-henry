const { Router } = require('express');
const { Ability } = require('../db');
const router = Router();

router.post('/', async (req, res) => {

    try {
        const { name, mana_cost } = req.body;
        // Validation
        if(!name || !mana_cost){
            throw new Error("Falta enviar datos obligatorios")
        }
        // ability que tendra la instancia creada en la tabla Ability de nuestra base de datos.
        const ability = await Ability.create(req.body)
        // console.log(ability)
        return res.status(201).json(ability)
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

router.put('/setCharacter', async (req, res) => {
    // Recordatorio la petición del tipo put es para actualiar y modificar. 
    // Recordatorio aqui estamos haciendo una relación de uno a muchos por lo tanto solo se creara una columna por cada relación,
    // solo se crearan tablas cuando sea una relación de muchos a muchos.
    try {
        const { idAbility, codeCharacter } = req.body;
        // con findByPk vamos a buscar la ability por su id y lo asociaremos con la columna code de la tabla character
        const ability = await Ability.findByPk(idAbility)
        // console.log(ability)
        await ability.setCharacter(codeCharacter)//set ==> es un metodo de sequelize para establecer asociaciones. 
        // La habilidad N° id va a estar relacionada al personaje de N° id, que ingrese por CodeCharacter
        // console.log(ability)
        // Por ultimo devolvemos el objeto ability con las propiedades name, description, mana_cost y CharacterCode, 
        // este ultimo es la asociación por codigo de id con el personaje. 
        return res.status(200).json(ability)
    } catch (error) {
        return res.status(404).send(error.message)
    }
})


module.exports = router;