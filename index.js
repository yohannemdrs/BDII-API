import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize('BDII', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});

conectar();

async function conectar(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

const User = sequelize.define(
  'User',
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
  },
);

User.sync();

salvar();
async function salvar() {
  const user = await User.create({ 
    firstName: 'Paulo',
    lastName: 'Freitas'
  });
  console.log('User saved successfully!');
}