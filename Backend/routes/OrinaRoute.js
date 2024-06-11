import express from "express";
import {
    getOrina,
    totalOrina,
    getOrinaById,
    createOrina,
    updateOrina,
    deleteOrina
} from "../controllers/Orina.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/resultados/orina',verifyUser, getOrina);
router.get('/resultados/orina/count',verifyUser, totalOrina);
router.get('/resultados/orina/:id',verifyUser, getOrinaById);
router.post('/resultados/orina',verifyUser, createOrina);
router.patch('/resultados/orina/:id',verifyUser, updateOrina);
router.delete('/resultados/orina/:id',verifyUser, deleteOrina);

export default router;