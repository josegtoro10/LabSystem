import express from "express";
import {
    getMuestras,
    totalMuestras,
    getMuestrasById,
    getMuestrasByPacienteId,
    createMuestras,
    updateMuestras,
    deleteMuestras
} from "../controllers/Muestras.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/muestras',verifyUser, getMuestras);
router.get('/muestras/pacienteId/:pacienteId',verifyUser, getMuestrasByPacienteId);
router.get('/muestras/count',verifyUser, totalMuestras);
router.get('/muestras/:id',verifyUser, getMuestrasById);
router.post('/muestras',verifyUser, createMuestras);
router.patch('/muestras/:id',verifyUser, updateMuestras);
router.delete('/muestras/:id',verifyUser, deleteMuestras);

export default router;