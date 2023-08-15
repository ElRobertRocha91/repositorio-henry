const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Ability', {

    //Ahora en la tabla Ability(Capacidad)-->'Ability'-->Es nuestro primer parametro
    //Vamos a definir sus atributos: name*, descrption y mana_cost*
    //Los atributos van a ser las columnas de nuestra tabla Ability--> 
    //-->los ingresamos como un segundo argumento dentro de sequalize.define
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'Composite'
    },
    description: {
      type: DataTypes.TEXT
    },
    mana_cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
      unique: 'Composite',
      validate: {
        min: 10.0,
        max: 250.0
      } 
    },
    //La combinación de "name" + "mana_cost" debe ser única:
    //unique: 'Composite': Al hacer esto estamos diciendo que la propiedad unique va a ser unica en ambos
    // y no se pueden repetir,(por ejemplo una 'password(contraseña)') por convención general va siempre "composite"
    //A continuación creamos nuestro campo virtual (Virtual Field):
    summary: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.name} (${Math.floor(this.mana_cost)} points of mana) - Description: ${this.description}`
      }
    }

  })
}