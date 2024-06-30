import Pacientes from "../models/PacientesModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getPacientes = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Pacientes.findAll({
                attributes: ['id', 'uuid', 'cedula', 'nombre', 'apellido', 'telefono', 'sexo', 'edad', 'direccion','createdAt','updatedAt'],
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        } else {
            response = await Pacientes.findAll({
                attributes: ['id', 'uuid', 'cedula', 'nombre', 'apellido', 'telefono', 'sexo', 'edad', 'direccion','createdAt','updatedAt'],
                where: {
                    userId: req.userId
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

export const getPacientesById = async (req, res) => {
    try {
        const pacientes = await Pacientes.findOne({
            where: {
                [Op.or]: [{ id: req.params.id }, { uuid: req.params.id }]
            }
        });
        if (!pacientes) return res.status(404).json({ msg: "Datos NO Encontrados" });
        let response;
        if (req.role === "admin") {
            response = await Pacientes.findOne({
                attributes: ['id', 'uuid', 'cedula', 'nombre', 'apellido', 'telefono', 'sexo', 'edad', 'direccion','createdAt','updatedAt'],
                where: {
                    id: pacientes.id
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        } else {
            response = await Pacientes.findOne({
                attributes: ['id', 'uuid', 'cedula', 'nombre', 'apellido', 'telefono', 'sexo', 'edad', 'direccion','createdAt','updatedAt'],
                where: {
                    [Op.and]: [{ id: pacientes.id }, { userId: req.userId }]
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

export const totalPacientes = async (req, res) => {
    try {
        const count = await Pacientes.count();
        res.json({ count });
    } catch (err) {
        console.error('Error al obtener el conteo de pacientes:', err);
        res.status(500).send('Error del servidor');
    }
}

const verificarCedula = async (cedula) => {
    if (cedula === 'No Posee') {
        return false;
    }

    const pacienteExistente = await Pacientes.findOne({
        where: {
            cedula: {
                [Op.eq]: cedula
            }
        }
    });

    return pacienteExistente !== null;
}

export const createPacientes = async (req, res) => {
    const { cedula, nombre, apellido, telefono, sexo, edad, direccion } = req.body;
    try {
        const cedulaValida = await verificarCedula(cedula);
        if (cedulaValida) {
            throw new Error('La cédula ya está registrada');
        }
        await Pacientes.create({
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            sexo: sexo,
            edad: edad,
            direccion: direccion,
            userId: req.userId
        });
        res.status(201).json({ msg: "Paciente Agregado Exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updatePacientes = async (req, res) => {
    try {
        const pacientes = await Pacientes.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!pacientes) return res.status(404).json({ msg: "Datos NO Encontrados" });
        const { cedula, nombre, apellido, telefono, sexo, edad, direccion } = req.body;
        if (req.role === "admin") {
            await Pacientes.update({ cedula, nombre, apellido, telefono, sexo, edad, direccion }, {
                where: {
                    id: pacientes.id
                }
            });
        } else {
            if (req.userId !== pacientes.userId) return res.status(403).json({ msg: "Acceso Denegado" });
            await Pacientes.update({ cedula, nombre, apellido, telefono, sexo, edad, direccion }, {
                where: {
                    [Op.and]: [{ id: pacientes.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Paciente Actualizado Exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deletePacientes = async (req, res) => {
    try {
        const pacientes = await Pacientes.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!pacientes) return res.status(404).json({ msg: "Datos NO Encontrados" });
        const { cedula, nombre, apellido, telefono, sexo, edad, direccion } = req.body;
        if (req.role === "admin") {
            await Pacientes.destroy({
                where: {
                    id: pacientes.id
                }
            });
        } else {
            if (req.userId !== pacientes.userId) return res.status(403).json({ msg: "Acceso Denegado" });
            await Pacientes.destroy({
                where: {
                    [Op.and]: [{ id: pacientes.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Paciente Eliminado Exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}