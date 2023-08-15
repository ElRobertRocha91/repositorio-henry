const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Character', {
    //El primer parametro que le pasamos 'Character'(Personaje), va a ser el nombre de nuestra tabla.
    //El segundo parametro le pasamos un objeto en el que vamos a ir definiendo todos los atributos.
    code: {
      type: DataTypes.STRING(5),//-->Tipo de dato string, con un maximo de 5 caracteres.
      primaryKey: true,//(Clave primaria)
      allowNull: false,//-->allowNull(Permitir nulo) no se permiten caracteres vacios, es obligatoria esos 5 campos.
      //Validación(Validations):
      validate: {
        isNotHenry(value) {
          if(value.toLowerCase() === 'henry'){
            throw new Error('is henry')
          }
        }
      }
    },
    name: {
      type: DataTypes.STRING,//Por default tiene un maximo de 255 caracteres el tipo string.
      unique: true,//El name debe ser unico.
      allowNull: false,
      validate: {
        notIn: [[ "Henry", "SoyHenry", "Soy Henry"]]//Usamos notIn que es un método de sequellize para verificar.
      }
    },
    age: {
      type: DataTypes.INTEGER,
      //Aqui vamos a agregar un getter para poder modificar los valores de la base de datos:
      get(){//==>con este metodo modificamos el dato antes de que llegue a la db(data base)
        //Ahora que le pasamosla función get.
        //vamos a guardar ese valor en una constante usando el objeto this que va a ser referencia al dato numerico de age
        const value = this.getDataValue('age')
        //Una vez que obtengamos el valor de la edad vamos a concatenarlo con un string('years old').
        //Pero recordemos que age no es un tipo de dato obligatorio, asi que podriamos no estar recibiendolo y retornariamos un 'null years old'.
        //Para evitar ese error usaremos un ternario para preguntar si se recibio age en la base de datos.
        return value? value + ' years old' : null 
        //Si tengo value, agregale years old y si no tengo value, dejalo en null.
      }
    },
    race: {
      type: DataTypes.ENUM('Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other'),//(Enumeración) solo va a admitir esos valores que le pasamos por parametros.
      defaultValue: 'Other'//En caso de no setear una raza le asignamos por default Other(Otras).
    },
    hp: {
      type: DataTypes.FLOAT,// Este tipo de dato nos permite poner decimales.
      allowNull: false
    },
    mana: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    date_added: {
      type: DataTypes.DATEONLY,//DATEONLY (Solo fechas).
      defaultValue: DataTypes.NOW//Si no les damos un valor a la fecha por defecto debería tomar la fecha actual.
    }
  },
  {
    //Timestamps es nuestro tercer parametro de nuestra table.
    //Por default se nos crean dos propiedades (columnas) createdAt(Fecha de creación) y updateAt(Fecha de actualización), al crearse nuestra tabla Character.
    //Como no las vamos a necesitar las sacamos de la siguiente manera:
    timestamps: false
  })
}