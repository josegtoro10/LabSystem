import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Muestras from "./MuestrasModel.js";
import Pacientes from "./PacientesModel.js";

const {DataTypes} = Sequelize;

const Hematologia = db.define('hematologia',{
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
    hemoglobina:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [2, 100]
        }
    },
    hematocrito:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [2, 100]
        }
    },
    chcm:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [2, 100]
        }
    },
    vsg:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [2, 100]
        }
    },
    estatus:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [2, 100]
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


Pacientes.hasMany(Hematologia);
Hematologia.belongsTo(Pacientes, { foreignKey: 'pacienteId'});

Muestras.belongsTo(Hematologia);
Hematologia.belongsTo(Muestras, {foreignKey: 'muestraId'});

Users.hasMany(Hematologia);
Hematologia.belongsTo(Users, {foreignKey: 'userId'});

export default Hematologia;