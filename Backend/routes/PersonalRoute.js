import express from "express";
import {
    getPersonal,
    totalPersonal,
    getPersonalById,
    createPersonal,
    updatePersonal,
    deletePersonal
} from "../controllers/Personal.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/personal',verifyUser, getPersonal);
router.get('/personal/count',verifyUser, totalPersonal);
router.get('/personal/:id',verifyUser, getPersonalById);
router.post('/personal',verifyUser, createPersonal);
router.patch('/personal/:id',verifyUser, updatePersonal);
router.delete('/personal/:id',verifyUser, deletePersonal);

export default router;