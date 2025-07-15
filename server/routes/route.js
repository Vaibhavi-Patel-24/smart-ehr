import express from 'express';
import { createMedical,getAllMedicals,getMedicalById,deleteMedical,updateMedical } from '../controllers/medical.controller.js';
import { addPatient, getAllPatients, getPatientById, updatePatientbyAdmin, updatePatientbyMedical, updatePatientSelf } from '../controllers/patient.controller.js';

// import all the controllers here from controller folder

const router = express.Router();
router.post('/medical/addmedical',createMedical);
router.get('/medical/allmedical', getAllMedicals);
router.get('/medical/:id', getMedicalById);
router.delete('/medical/:id', deleteMedical);
router.put('/medical/:id', updateMedical); // ← new route here

router.post('/patient/addpatient', addPatient)
router.get('/patient/allpatients',getAllPatients)
router.get('/patient/:id',getPatientById)
router.patch('/admin/patients/:id', updatePatientbyAdmin);
router.patch('/medical/patients/:id', updatePatientbyMedical);
router.patch('/patients/:id', updatePatientSelf);



export default router;
