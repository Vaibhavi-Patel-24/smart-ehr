import express from 'express';
import { createMedical,getAllMedicals,getMedicalById,deleteMedical,updateMedical } from '../controllers/medical.controller.js';

// import all the controllers here from controller folder

const router = express.Router();
router.post('/medical/addmedical',createMedical);
router.get('/medical/allmedical', getAllMedicals);
router.get('/medical/:id', getMedicalById);
router.delete('/medical/:id', deleteMedical);
router.put('/medical/:id', updateMedical); // ← new route here


// place all routes(endpoints) here with methods like PUT, GET etc..


export default router;
