import VIH  from "../models/VIHModel.js";
import Muestras from "../models/MuestrasModel.js";
import Pacientes from "../models/PacientesModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getVIH = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await VIH.findAll({
                attributes:['id','uuid','resultado','observaciones','estatus','fechaEntrega','muestraId','pacienteId','createdAt','updatedAt'],
                include:[{
                    model: User,
                    attributes:['name','email',]
                },
                {
                  model: Muestras, 
                  attributes: []
                },],
            });
        }else{
            response = await VIH.findAll({
                attributes:['id','uuid','resultado','observaciones','estatus','fechaEntrega','muestraId','pacienteId','createdAt','updatedAt'],
                where:{
                    userId: req.userId,
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

export const getVIHById = async(req, res) =>{
    try {
        const vih = await VIH.findOne({
            where:{
                [Op.or]:[{id: req.params.id}, {uuid: req.params.id}] 
            }
        });
        if(!vih) return res.status(404).json({msg: "Datos NO Encontrados"});
        let response;
        if(req.role === "admin"){ 
            response = await VIH.findOne({
                attributes:['id','uuid','resultado','observaciones','estatus','fechaEntrega','muestraId','pacienteId','createdAt','updatedAt'],
                where:{
                    id: vih.id,
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await VIH.findOne({
                attributes:['id','uuid','resultado','observaciones','estatus','fechaEntrega','muestraId','pacienteId','createdAt','updatedAt'],
                where:{
                    [Op.and]:[{id: vih.id}, {userId: req.userId}]
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

export const totalVIH = async(req, res) =>{
    try {
        const count = await VIH.count();
        res.json({ count }); 
      } catch (err) {
        console.error('Error al obtener el conteo de resultados de VIH:', err);
        res.status(500).send('Error del servidor');
      }
}




export const createVIH = async(req, res) =>{
    const {resultado,observaciones,estatus,fechaEntrega,muestraId,pacienteId} = req.body;      
    try {
        await VIH.create({
            resultado: resultado,
            observaciones: observaciones,
            estatus: estatus,
            fechaEntrega: fechaEntrega,
            muestraId: muestraId,
            pacienteId: pacienteId,
            userId: req.userId
        });
        res.status(201).json({msg: "Muestra Agregada Exitosamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateVIH = async(req, res) =>{
    try {
        const vih = await VIH.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!vih) return res.status(404).json({msg: "Datos NO Encontrados"});
        const {resultado,observaciones,estatus,muestraId} = req.body;
        if(req.role === "admin"){
            await VIH.update({resultado,observaciones,estatus,fechaEntrega,muestraId,pacienteId},{
                where:{
                    id: vih.id,
                }
            });
        }else{
            if(req.userId !== vih.userId) return res.status(403).json({msg: "Acceso Denegado"});
            await VIH.update({resultado,observaciones,estatus,fechaEntrega,muestraId,pacienteId},{
                where:{
                    [Op.and]:[{id: vih.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Muestra Actualizada Exitosamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteVIH = async(req, res) =>{
    try {
        const vih = await VIH.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!vih) return res.status(404).json({msg: "Datos NO Encontrados"});
        const {resultado,observaciones,estatus,fechaEntrega,muestraId,pacienteId} = req.body;
        if(req.role === "admin"){
            await VIH.destroy({
                where:{
                    id: vih.id,
                }
            });
        }else{
            if(req.userId !== vih.userId) return res.status(403).json({msg: "Acceso Denegado"});
            await VIH.destroy({
                where:{
                    [Op.and]:[{id: vih.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Muestra Eliminada Exitosamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}










