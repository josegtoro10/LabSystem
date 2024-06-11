import Personal from "../models/PersonalModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getPersonal = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Personal.findAll({
                attributes:['uuid','codigo','nombre','apellido','cedula','telefono','sexo','edad','direccion','cargo','turno','estatus','fechaIngreso'],
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Personal.findAll({
                attributes:['uuid','codigo','nombre','apellido','cedula','telefono','sexo','edad','direccion','cargo','turno','estatus','fechaIngreso'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getPersonalById = async(req, res) =>{
    try {
        const personal = await Personal.findOne({
            where:{
                [Op.or]:[{id: req.params.id}, {uuid: req.params.id}] 
            }
        });
        if(!personal) return res.status(404).json({msg: "Datos NO Encontrados"});
        let response;
        if(req.role === "admin"){
            response = await Personal.findOne({
                attributes:['uuid','codigo','nombre','apellido','cedula','telefono','sexo','edad','direccion','cargo','turno','estatus','fechaIngreso'],
                where:{
                    id: personal.id
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Personal.findOne({
                attributes:['uuid','codigo','nombre','apellido','cedula','telefono','sexo','edad','direccion','cargo','turno','estatus','fechaIngreso'],
                where:{
                    [Op.and]:[{id: personal.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const totalPersonal = async(req, res) =>{
    try {
        const count = await Personal.count();
        res.json({ count }); 
      } catch (err) {
        console.error('Error al obtener el conteo de personal:', err);
        res.status(500).send('Error del servidor');
      }
}

export const createPersonal = async(req, res) =>{
    const {codigo,nombre,apellido,cedula,telefono,sexo,edad,direccion,cargo,turno,estatus,fechaIngreso} = req.body;
    try {
        const personalExistente = await Personal.findOne({ 
            where: {
            [Op.or]: [
              { codigo: codigo },
              { cedula: cedula }
            ]
          } });
        if (personalExistente) {
            throw new Error('El empleado ya existe');
          }
        await Personal.create({
            codigo: codigo,
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            sexo: sexo,
            edad: edad,
            cedula: cedula,
            direccion: direccion,
            cargo: cargo,
            turno: turno,
            estatus: estatus,
            fechaIngreso: fechaIngreso,
            userId: req.userId
        });
        res.status(201).json({msg: "Personal Agregado Exitosamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updatePersonal = async(req, res) =>{
    try {
        const personal = await Personal.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!personal) return res.status(404).json({msg: "Datos NO Encontrados"});
        const {codigo,nombre,apellido,cedula,telefono,sexo,edad,direccion,cargo,turno,estatus,fechaIngreso} = req.body;
        if(req.role === "admin"){
            await Personal.update({codigo,nombre,apellido,cedula,telefono,sexo,edad,direccion,cargo,turno,estatus,fechaIngreso},{
                where:{
                    id: personal.id
                }
            });
        }else{
            if(req.userId !== personal.userId) return res.status(403).json({msg: "Acceso Denegado"});
            await Personal.update({codigo,nombre,apellido,cedula,telefono,sexo,edad,direccion,cargo,turno,estatus,fechaIngreso},{
                where:{
                    [Op.and]:[{id: personal.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Personal Actualizado Exitosamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deletePersonal = async(req, res) =>{
    try {
        const personal = await Personal.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!personal) return res.status(404).json({msg: "Datos NO Encontrados"});
        const {codigo,nombre,apellido,cedula,telefono,sexo,edad,direccion,cargo,turno,estatus,fechaIngreso} = req.body;
        if(req.role === "admin"){
            await Personal.destroy({
                where:{
                    id: personal.id
                }
            });
        }else{
            if(req.userId !== personal.userId) return res.status(403).json({msg: "Acceso Denegado"});
            await Personal.destroy({
                where:{
                    [Op.and]:[{id: personal.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Personal Eliminado Exitosamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}