import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Muestras from "./MuestrasModel.js";
import Pacientes from "./PacientesModel.js";

const {DataTypes} = Sequelize;

const Heces = db.define('heces',{
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
    aspecto:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [2, 100]
        }
    },
    consistencia:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [2, 100]
        }
    },
    color:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [2, 100]
        }
    },
    olor:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [2, 100]
        }
    },
    moco:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [2, 100]
        }
    },
    sangre:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [2, 100]
        }
    },
    restosAlimenticios:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [2, 100]
        }
    },
    microscopio:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [2, 100]
        }
    },
    otrosElementos:{
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


Pacientes.hasMany(Heces);
Heces.belongsTo(Pacientes, { foreignKey: 'pacienteId'});

Muestras.belongsTo(Heces);
Heces.belongsTo(Muestras, {foreignKey: 'muestraId'});

Users.hasMany(Heces);
Heces.belongsTo(Users, {foreignKey: 'userId'});

export default Heces;