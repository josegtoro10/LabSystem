import Muestras from "../models/MuestrasModel.js";
import Pacientes from "../models/PacientesModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getMuestras = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Muestras.findAll({
                attributes:['id','uuid','tipo','examen','fechaRecepcion','pacienteId','createdAt','updatedAt'],
                include:[{
                    model: User,
                    attributes:['name','email',]
                },
                {
                  model: Pacientes, 
                  attributes: []
                },],
            });
        }else{
            response = await Muestras.findAll({
                attributes:['id','uuid','tipo','examen','fechaRecepcion','pacienteId','createdAt','updatedAt'],
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

export const getMuestrasById = async(req, res) =>{
    try {
        const muestras = await Muestras.findOne({
            where:{
                [Op.or]:[{id: req.params.id}, {uuid: req.params.id}] 
            }
        });
        if(!muestras) return res.status(404).json({msg: "Datos NO Encontrados"});
        let response;
        if(req.role === "admin"){ 
            response = await Muestras.findOne({
                attributes:['id','uuid','tipo','examen','fechaRecepcion','pacienteId','createdAt','updatedAt'],
                where:{
                    id: muestras.id,
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Muestras.findOne({
                attributes:['id','uuid','tipo','examen','fechaRecepcion','pacienteId','createdAt','updatedAt'],
                where:{
                    [Op.and]:[{id: muestras.id}, {userId: req.userId}]
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

export const getMuestrasByPacienteId = async (req, res) => {
    const pacienteId = parseInt(req.params.pacienteId);
    const muestras = await Muestras.findAll({
      where: {
        pacienteId: pacienteId
      }
    });
    res.json(muestras);
  };

export const totalMuestras = async(req, res) =>{
    try {
        const count = await Muestras.count();
        res.json({ count }); 
      } catch (err) {
        console.error('Error al obtener el conteo de muestras:', err);
        res.status(500).send('Error del servidor');
      }
}


export const createMuestras = async(req, res) =>{
    const {tipo,examen,fechaRecepcion, pacienteId} = req.body;      
    try {
        await Muestras.create({
            tipo: tipo,
            examen: examen,
            fechaRecepcion: fechaRecepcion,
            pacienteId: pacienteId,
            userId: req.userId,
        });
        res.status(201).json({msg: "Muestra Agregada Exitosamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateMuestras = async(req, res) =>{
    try {
        const muestras = await Muestras.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!muestras) return res.status(404).json({msg: "Datos NO Encontrados"});
        const {tipo,examen,fechaRecepcion,pacienteId} = req.body;
        if(req.role === "admin"){
            await Muestras.update({tipo,examen,fechaRecepcion, pacienteId},{
                where:{
                    id: muestras.id,
                }
            });
        }else{
            if(req.userId !== muestras.userId) return res.status(403).json({msg: "Acceso Denegado"});
            await Muestras.update({tipo,examen,fechaRecepcion, pacienteId},{
                where:{
                    [Op.and]:[{id: muestras.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Muestra Actualizada Exitosamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteMuestras = async(req, res) =>{
    try {
        const muestras = await Muestras.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!muestras) return res.status(404).json({msg: "Datos NO Encontrados"});
        const {tipo,examen,fechaRecepcion,pacienteId} = req.body;
        if(req.role === "admin"){
            await Muestras.destroy({
                where:{
                    id: muestras.id,
                }
            });
        }else{
            if(req.userId !== muestras.userId) return res.status(403).json({msg: "Acceso Denegado"});
            await Muestras.destroy({
                where:{
                    [Op.and]:[{id: muestras.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Muestra Eliminada Exitosamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}










