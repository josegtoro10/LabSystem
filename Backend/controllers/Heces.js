import Heces from "../models/HecesModel.js";
import Muestras from "../models/MuestrasModel.js";
import Pacientes from "../models/PacientesModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getHeces = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Heces.findAll({
                attributes:['id','uuid','aspecto','consistencia','color','olor','moco','sangre','restosAlimenticios','microscopio','otrosElementos','estatus','fechaEntrega','muestraId','pacienteId'],
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
            response = await Heces.findAll({
                attributes:['id','uuid','aspecto','consistencia','color','olor','moco','sangre','restosAlimenticios','microscopio','otrosElementos','estatus','fechaEntrega','muestraId','pacienteId'],
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

export const getHecesById = async(req, res) =>{
    try {
        const heces = await Heces.findOne({
            where:{
                [Op.or]:[{id: req.params.id}, {uuid: req.params.id}] 
            }
        });
        if(!heces) return res.status(404).json({msg: "Datos NO Encontrados"});
        let response;
        if(req.role === "admin"){ 
            response = await Heces.findOne({
                attributes:['id','uuid','aspecto','consistencia','color','olor','moco','sangre','restosAlimenticios','microscopio','otrosElementos','estatus','fechaEntrega','muestraId','pacienteId'],
                where:{
                    id: heces.id,
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Heces.findOne({
                attributes:['id','uuid','aspecto','consistencia','color','olor','moco','sangre','restosAlimenticios','microscopio','otrosElementos','estatus','fechaEntrega','muestraId','pacienteId'],
                where:{
                    [Op.and]:[{id: heces.id}, {userId: req.userId}]
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

export const totalHeces = async(req, res) =>{
    try {
        const count = await Heces.count();
        res.json({ count }); 
      } catch (err) {
        console.error('Error al obtener el conteo de resultados de heces:', err);
        res.status(500).send('Error del servidor');
      }
}



export const createHeces = async(req, res) =>{
    const {aspecto,consistencia,color,olor,moco,sangre,restosAlimenticios,microscopio,otrosElementos,estatus, fechaEntrega,muestraId,pacienteId} = req.body;      
    try {
        await Heces.create({
            aspecto: aspecto,
            consistencia: consistencia,
            color: color,
            olor: olor,
            moco: moco,
            sangre: sangre,
            restosAlimenticios: restosAlimenticios,
            microscopio: microscopio,
            otrosElementos: otrosElementos,
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

export const updateHeces = async(req, res) =>{
    try {
        const heces = await Heces.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!heces) return res.status(404).json({msg: "Datos NO Encontrados"});
        const {aspecto,consistencia,color,olor,moco,sangre,restosAlimenticios,microscopio,otrosElementos,estatus,fechaEntrega,muestraId,pacienteId} = req.body;
        if(req.role === "admin"){
            await Heces.update({aspecto,consistencia,color,olor,moco,sangre,restosAlimenticios,microscopio,otrosElementos,estatus,fechaEntrega,muestraId,pacienteId},{
                where:{
                    id: heces.id,
                }
            });
        }else{
            if(req.userId !== heces.userId) return res.status(403).json({msg: "Acceso Denegado"});
            await Heces.update({aspecto,consistencia,color,olor,moco,sangre,restosAlimenticios,microscopio,otrosElementos,estatus,fechaEntrega,muestraId,pacienteId},{
                where:{
                    [Op.and]:[{id: heces.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Muestra Actualizada Exitosamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteHeces = async(req, res) =>{
    try {
        const heces = await Heces.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!heces) return res.status(404).json({msg: "Datos NO Encontrados"});
        const {aspecto,consistencia,color,olor,moco,sangre,restosAlimenticios,microscopio,otrosElementos,estatus,fechaEntrega,muestraId,pacienteId} = req.body;
        if(req.role === "admin"){
            await Heces.destroy({
                where:{
                    id: heces.id,
                }
            });
        }else{
            if(req.userId !== heces.userId) return res.status(403).json({msg: "Acceso Denegado"});
            await Heces.destroy({
                where:{
                    [Op.and]:[{id: heces.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Muestra Eliminada Exitosamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}










