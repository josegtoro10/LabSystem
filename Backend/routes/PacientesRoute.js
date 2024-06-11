import express from "express";
import {
    getPacientes,
    totalPacientes,
    getPacientesById,
    createPacientes,
    updatePacientes,
    deletePacientes
} from "../controllers/Pacientes.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/pacientes',verifyUser, getPacientes);
router.get('/pacientes/count',verifyUser, totalPacientes);
router.get('/pacientes/:id',verifyUser, getPacientesById);
router.post('/pacientes',verifyUser, createPacientes);
router.patch('/pacientes/:id',verifyUser, updatePacientes);
router.delete('/pacientes/:id',verifyUser, deletePacientes);

export default router;