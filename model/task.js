import sequelize from "../database/sequelize.js";
import { DataTypes } from "sequelize";

const Task = sequelize.define(
    'Task',
    {
        id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      decricao: {
        type: DataTypes.STRING, 
      },
      dataHora: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      tipo: {
        type: DataTypes.ENUM ('Pessoal', 'Profissional'),
        allowNull: false
      },
    },
  );
  
  Task.sync();  

  export default Task;