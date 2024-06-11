import express from "express";
import {
    getHeces,
    totalHeces,
    getHecesById,
    createHeces,
    updateHeces,
    deleteHeces
} from "../controllers/Heces.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/resultados/heces',verifyUser, getHeces);
router.get('/resultados/heces/count',verifyUser, totalHeces);
router.get('/resultados/heces/:id',verifyUser, getHecesById);
router.post('/resultados/heces',verifyUser, createHeces);
router.patch('/resultados/heces/:id',verifyUser, updateHeces);
router.delete('/resultados/heces/:id',verifyUser, deleteHeces);

export default router;