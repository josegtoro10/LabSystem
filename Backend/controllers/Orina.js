import Orina from "../models/OrinaModel.js";
import Muestras from "../models/MuestrasModel.js";
import Pacientes from "../models/PacientesModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";



export const getOrina = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Orina.findAll({
                attributes: ['id', 'uuid', 'aspecto', 'color', 'olor', 'densidad', 'ph', 'proteinas', 'glucosa', 'nitritos', 'c_cetonicos', 'bilirrubina', 'urobilinogeno', 'hemoglobina', 'cel_epiteliales', 'bacterias', 'leucocitos', 'hematies', 'mucina', 'piocitos', 'cilindros', 'cristales', 'otros', 'estatus', 'fechaEntrega', 'muestraId', 'pacienteId','createdAt','updatedAt'],
                include: [{
                    model: User,
                    attributes: ['name', 'email',]
                },
                {
                    model: Muestras,
                    attributes: []
                },],
            });
        } else {
            response = await Orina.findAll({
                attributes: ['id', 'uuid', 'aspecto', 'color', 'olor', 'densidad', 'ph', 'proteinas', 'glucosa', 'nitritos', 'c_cetonicos', 'bilirrubina', 'urobilinogeno', 'hemoglobina', 'cel_epiteliales', 'bacterias', 'leucocitos', 'hematies', 'mucina', 'piocitos', 'cilindros', 'cristales', 'otros', 'estatus', 'fechaEntrega', 'muestraId', 'pacienteId','createdAt','updatedAt'],
                where: {
                    userId: req.userId,
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getOrinaById = async (req, res) => {
    try {
        const orina = await Orina.findOne({
            where: {
                [Op.or]: [{ id: req.params.id }, { uuid: req.params.id }]
            }
        });
        if (!orina) return res.status(404).json({ msg: "Datos NO Encontrados" });
        let response;
        if (req.role === "admin") {
            response = await Orina.findOne({
                attributes: ['id', 'uuid', 'aspecto', 'color', 'olor', 'densidad', 'ph', 'proteinas', 'glucosa', 'nitritos', 'c_cetonicos', 'bilirrubina', 'urobilinogeno', 'hemoglobina', 'cel_epiteliales', 'bacterias', 'leucocitos', 'hematies', 'mucina', 'piocitos', 'cilindros', 'cristales', 'otros', 'estatus', 'fechaEntrega', 'muestraId', 'pacienteId','createdAt','updatedAt'],
                where: {
                    id: orina.id,
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        } else {
            response = await Orina.findOne({
                attributes: ['id', 'uuid', 'aspecto', 'color', 'olor', 'densidad', 'ph', 'proteinas', 'glucosa', 'nitritos', 'c_cetonicos', 'bilirrubina', 'urobilinogeno', 'hemoglobina', 'cel_epiteliales', 'bacterias', 'leucocitos', 'hematies', 'mucina', 'piocitos', 'cilindros', 'cristales', 'otros', 'estatus', 'fechaEntrega', 'muestraId', 'pacienteId','createdAt','updatedAt'],
                where: {
                    [Op.and]: [{ id: orina.id }, { userId: req.userId }]
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const totalOrina = async(req, res) =>{
    try {
        const count = await Orina.count();
        res.json({ count }); 
      } catch (err) {
        console.error('Error al obtener el conteo de resultados de orina:', err);
        res.status(500).send('Error del servidor');
      }
}



export const createOrina = async (req, res) => {
    const { aspecto, color, olor, densidad, ph, proteinas, glucosa, nitritos, c_cetonicos, bilirrubina, urobilinogeno, hemoglobina, cel_epiteliales, bacterias, leucocitos, hematies, mucina, piocitos, cilindros, cristales, otros, estatus, fechaEntrega, muestraId, pacienteId } = req.body;
    try {
        await Orina.create({
            aspecto: aspecto,
            color: color,
            olor: olor,
            densidad: densidad,
            ph: ph,
            proteinas: proteinas,
            glucosa: glucosa,
            nitritos: nitritos,
            c_cetonicos: c_cetonicos,
            bilirrubina: bilirrubina,
            urobilinogeno: urobilinogeno,
            hemoglobina: hemoglobina,
            cel_epiteliales: cel_epiteliales,
            bacterias: bacterias,
            leucocitos: leucocitos,
            hematies: hematies,
            mucina: mucina,
            piocitos: piocitos,
            cilindros: cilindros,
            cristales: cristales,
            otros: otros,
            estatus: estatus,
            fechaEntrega: fechaEntrega,
            muestraId: muestraId,
            pacienteId: pacienteId,
            userId: req.userId
        });
        res.status(201).json({ msg: "Muestra Agregada Exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateOrina = async (req, res) => {
    try {
        const orina = await Orina.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!orina) return res.status(404).json({ msg: "Datos NO Encontrados" });
        const { aspecto, color, olor, densidad, ph, proteinas, glucosa, nitritos, c_cetonicos, bilirrubina, urobilinogeno, hemoglobina, cel_epiteliales, bacterias, leucocitos, hematies, mucina, piocitos, cilindros, cristales, otros, estatus, fechaEntrega, muestraId, pacienteId } = req.body;
        if (req.role === "admin") {
            await Orina.update({ aspecto, color, olor, densidad, ph, proteinas, glucosa, nitritos, c_cetonicos, bilirrubina, urobilinogeno, hemoglobina, cel_epiteliales, bacterias, leucocitos, hematies, mucina, piocitos, cilindros, cristales, otros, estatus, fechaEntrega, muestraId, pacienteId }, {
                where: {
                    id: orina.id,
                }
            });
        } else {
            if (req.userId !== orina.userId) return res.status(403).json({ msg: "Acceso Denegado" });
            await Orina.update({ aspecto, color, olor, densidad, ph, proteinas, glucosa, nitritos, c_cetonicos, bilirrubina, urobilinogeno, hemoglobina, cel_epiteliales, bacterias, leucocitos, hematies, mucina, piocitos, cilindros, cristales, otros, estatus, fechaEntrega, muestraId, pacienteId }, {
                where: {
                    [Op.and]: [{ id: orina.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Muestra Actualizada Exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteOrina = async (req, res) => {
    try {
        const orina = await Orina.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!orina) return res.status(404).json({ msg: "Datos NO Encontrados" });
        const { aspecto, color, olor, densidad, ph, proteinas, glucosa, nitritos, c_cetonicos, bilirrubina, urobilinogeno, hemoglobina, cel_epiteliales, bacterias, leucocitos, hematies, mucina, piocitos, cilindros, cristales, otros, estatus, fechaEntrega, muestraId, pacienteId } = req.body;
        if (req.role === "admin") {
            await Orina.destroy({
                where: {
                    id: orina.id,
                }
            });
        } else {
            if (req.userId !== orina.userId) return res.status(403).json({ msg: "Acceso Denegado" });
            await Orina.destroy({
                where: {
                    [Op.and]: [{ id: orina.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Muestra Eliminada Exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}










