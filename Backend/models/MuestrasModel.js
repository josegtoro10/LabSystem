import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Pacientes from "./PacientesModel.js"
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Muestras = db.define('muestras',{
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        validate:{
            notEmpty: true
        }
      },
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    tipo:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    examen:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    fechaRecepcion:{
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    pacienteId: {
        type: DataTypes.INTEGER,
        references: {
            model: Pacientes,
            key: 'id'
          },
        validate:{
            notEmpty: true
        }
      }
},{
    freezeTableName: true
});

Pacientes.hasMany(Muestras);
Muestras.belongsTo(Pacientes, { foreignKey: 'pacienteId'});


Users.hasMany(Muestras);
Muestras.belongsTo(Users, {foreignKey: 'userId'});

export default Muestras;