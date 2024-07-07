import { Sequelize, Op } from "sequelize";
import dotenv from "dotenv";
import moment from 'moment';
import fs from 'fs';
dotenv.config();


const db = new Sequelize(process.env.BD, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT
});

const generarNombreArchivo = () => {
  const fechaActual = moment().format('DD-MM-YYYY');
  return `dbRespaldo-${fechaActual}.sql`;
};

const generarRespaldo = async () => {
  const nombreArchivo = generarNombreArchivo();
  const consulta = 'SELECT * FROM heces, hematologia, muestras, orina, pacientes, personal, sessions, users, vih';

  try {
    const resultadoConsulta = await db.query(consulta);
    const datosTabla = resultadoConsulta[0];
    const contenidoArchivo = datosTabla.map(fila => JSON.stringify(fila)).join('\n');

    const rutaCarpetaRespaldos = './respaldos';
    if (!fs.existsSync(rutaCarpetaRespaldos)) {
      fs.mkdirSync(rutaCarpetaRespaldos);
    }

    const rutaCompletaArchivo = `${rutaCarpetaRespaldos}/${nombreArchivo}`;
    fs.writeFileSync(rutaCompletaArchivo, contenidoArchivo);

    console.log(`Respaldo generado exitosamente: ${nombreArchivo}`);
  } catch (error) {
    console.error('Error al generar el respaldo:', error);
  }
};

export const ejecutarRespaldoDiario = async () => {
  const horaRespaldo = '09:30:00';

  while (true) {
    const fechaActual = moment();
    const horaActual = fechaActual.format('HH:mm:ss');

    if (horaActual === horaRespaldo) {
      await generarRespaldo();
      break;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
  }
};

export default db;