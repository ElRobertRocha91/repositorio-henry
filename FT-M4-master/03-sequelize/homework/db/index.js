const { Sequelize, Op } = require('sequelize');
const modelCharacter = require('./models/Character.js');
const modelAbility = require('./models/Ability.js');
const modelRole = require('./models/Role.js');

const db = new Sequelize('postgres://postgres:1234@localhost:5432/henry_sequelize', {
  logging: false,
});

modelCharacter(db);
modelAbility(db);
modelRole(db);

//Estas van a ser nuestras relaciones de todos los modelos que creamos
//Para eso vamos a obtener los modelos desde la instancia de Sequellize, asociando los modelos dentro del archivo index.js de la carpeta db
const { Character, Ability, Role } = db.models;

//Ahora si vamos a relacionar las tablas:
//Un personaje puede tener muchas habilidades:
Character.hasMany(Ability);
//Las habilidades pueden pertenecer a un solo personaje:
Ability.belongsTo(Character);

//Ahora vamos a realizar la relación entre character y Role, esta seria una relación de muchos a muchos.
//un character(personaje) puede tener muchos role(roles) y un role(roles) puede estar en muchos character(personajes)
//IMPORTANTE ==> Cuando la relación de de muchos a muchos vamos a tener tablas intermedias
Character.belongsToMany(Role, { through: 'Character_Role' });//belongsToMany recibe dos parametros el primero el nombre de la tabla con la que se relaciona y el segundo un objeto con el nombre de la propiedad throungh con el nombre de la tabla intermedia.
Role.belongsToMany(Character, { through: 'Character_Role' });

module.exports = {
  ...db.models,
  db,
  Op
}