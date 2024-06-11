import express from "express";
import {
    getVIH,
    totalVIH,
    getVIHById,
    createVIH,
    updateVIH,
    deleteVIH
} from "../controllers/VIH.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/resultados/vih',verifyUser, getVIH);
router.get('/resultados/vih/count',verifyUser, totalVIH);
router.get('/resultados/vih/:id',verifyUser, getVIHById);
router.post('/resultados/vih',verifyUser, createVIH);
router.patch('/resultados/vih/:id',verifyUser, updateVIH);
router.delete('/resultados/vih/:id',verifyUser, deleteVIH);

export default router;