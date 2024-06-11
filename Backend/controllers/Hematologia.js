import Hematologia  from "../models/HematologiaModel.js";
import Muestras from "../models/MuestrasModel.js";
import Pacientes from "../models/PacientesModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getHematologia = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Hematologia.findAll({
                attributes:['id','uuid','hemoglobina','hematocrito','chcm','vsg','estatus','fechaEntrega','muestraId','pacienteId'],
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
            response = await Hematologia.findAll({
                attributes:['id','uuid','hemoglobina','hematocrito','chcm','vsg','estatus','fechaEntrega','muestraId','pacienteId'],
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

export const getHematologiaById = async(req, res) =>{
    try {
        const hematologia = await Hematologia.findOne({
            where:{
                [Op.or]:[{id: req.params.id}, {uuid: req.params.id}] 
            }
        });
        if(!hematologia) return res.status(404).json({msg: "Datos NO Encontrados"});
        let response;
        if(req.role === "admin"){ 
            response = await Hematologia.findOne({
                attributes:['id','uuid','hemoglobina','hematocrito','chcm','vsg','estatus','fechaEntrega','muestraId','pacienteId'],
                where:{
                    id: hematologia.id,
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Hematologia.findOne({
                attributes:['id','uuid','hemoglobina','hematocrito','chcm','vsg','estatus','fechaEntrega','muestraId','pacienteId'],
                where:{
                    [Op.and]:[{id: hematologia.id}, {userId: req.userId}]
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

export const getMuestrasByMuestraId = async (req, res) => {
    const muestraId = parseInt(req.params.muestraId);
    const muestras = await Hematologia.findAll({
      where: {
        muestraId: muestraId
      }
    });
    res.json(muestras);
  };

export const totalHematologia = async(req, res) =>{
    try {
        const count = await Hematologia.count();
        res.json({ count }); 
      } catch (err) {
        console.error('Error al obtener el conteo de resultados de hemtaologia:', err);
        res.status(500).send('Error del servidor');
      }
}



export const createHematologia = async(req, res) =>{
    const {hemoglobina,hematocrito,chcm,vsg,estatus,fechaEntrega,muestraId,pacienteId} = req.body;      
    try {
        await Hematologia.create({
            hemoglobina: hemoglobina,
            hematocrito: hematocrito,
            chcm: chcm,
            vsg: vsg,
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

export const updateHematologia = async(req, res) =>{
    try {
        const hematologia = await Hematologia.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!hematologia) return res.status(404).json({msg: "Datos NO Encontrados"});
        const {hemoglobina,hematocrito,chcm,vsg,estatus,fechaEntrega,muestraId,pacienteId} = req.body;
        if(req.role === "admin"){
            await Hematologia.update({hemoglobina,hematocrito,chcm,vsg,estatus,fechaEntrega,muestraId,pacienteId},{
                where:{
                    id: hematologia.id,
                }
            });
        }else{
            if(req.userId !== hematologia.userId) return res.status(403).json({msg: "Acceso Denegado"});
            await Hematologia.update({hemoglobina,hematocrito,chcm,vsg,estatus,fechaEntrega,muestraId,pacienteId},{
                where:{
                    [Op.and]:[{id: hematologia.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Muestra Actualizada Exitosamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteHematologia = async(req, res) =>{
    try {
        const hematologia = await Hematologia.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!hematologia) return res.status(404).json({msg: "Datos NO Encontrados"});
        const {hemoglobina,hematocrito,chcm,vsg,estatus,fechaEntrega,muestraId,pacienteId} = req.body;
        if(req.role === "admin"){
            await Hematologia.destroy({
                where:{
                    id: hematologia.id,
                }
            });
        }else{
            if(req.userId !== hematologia.userId) return res.status(403).json({msg: "Acceso Denegado"});
            await Hematologia.destroy({
                where:{
                    [Op.and]:[{id: hematologia.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Muestra Eliminada Exitosamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}










