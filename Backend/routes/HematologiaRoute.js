import express from "express";
import {
    getHematologia,
    totalHematologia,
    getHematologiaById,
    getMuestrasByMuestraId,
    createHematologia,
    updateHematologia,
    deleteHematologia
} from "../controllers/Hematologia.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/resultados/hematologia',verifyUser, getHematologia);
router.get('/resultados/hematologia/muestraId/:muestraId',verifyUser, getMuestrasByMuestraId);
router.get('/resultados/hematologia/count',verifyUser, totalHematologia);
router.get('/resultados/hematologia/:id',verifyUser, getHematologiaById);
router.post('/resultados/hematologia',verifyUser, createHematologia);
router.patch('/resultados/hematologia/:id',verifyUser, updateHematologia);
router.delete('/resultados/hematologia/:id',verifyUser, deleteHematologia);

export default router;