import { Sequelize} from "sequelize";
import dontenv from "dotenv"
dontenv.config();

const sequelize = new Sequelize(process.env.POSTGRES_BD, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
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

export default sequelize;