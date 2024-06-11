import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Muestras from "./MuestrasModel.js";
import Pacientes from "./PacientesModel.js";

const {DataTypes} = Sequelize;

const VIH = db.define('vih',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
    resultado:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    observaciones:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    estatus:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    fechaEntrega:{
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate:{
            notEmpty: true,
        }
    },
    muestraId: {
        type: DataTypes.INTEGER,
        references: {
            model: Muestras,
            key: 'id'
          },
        validate:{
            notEmpty: true
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


Pacientes.hasMany(VIH);
VIH.belongsTo(Pacientes, { foreignKey: 'pacienteId'});

Muestras.belongsTo(VIH);
VIH.belongsTo(Muestras, {foreignKey: 'muestraId'});

Users.hasMany(VIH);
VIH.belongsTo(Users, {foreignKey: 'userId'});

export default VIH;