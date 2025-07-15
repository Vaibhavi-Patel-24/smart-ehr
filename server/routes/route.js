import express from 'express';
import { createMedical,getAllMedicals,getMedicalById,deleteMedical,updateMedical } from '../controllers/medical.controller.js';
import { loginPatient } from '../controllers/login.patient.controller.js';
import { loginMedical } from '../controllers/login.medical.controller.js';
import { loginAdmin } from '../controllers/login.admin.controller.js';
import { addPatient, getAllPatients, getPatientById, getPatientByPatientId, updatePatientbyAdmin, updatePatientbyMedical, updatePatientSelf } from '../controllers/patient.controller.js';

// import all the controllers here from controller folder

const router = express.Router();
router.post('/medical/addmedical',createMedical);
router.get('/medical/allmedical', getAllMedicals);
router.get('/medical/:id', getMedicalById);
router.delete('/medical/:id', deleteMedical);
router.put('/medical/:id', updateMedical); // ← new route here

router.post('/patient/addpatient', addPatient)
router.get('/patient/allpatients',getAllPatients)

router.post('/login/patient',loginPatient);
router.post('/login/medical',loginMedical);
router.post('/login/admin',loginAdmin)
// place all routes(endpoints) here with methods like PUT, GET etc..
router.get('/patient/:id',getPatientById)
router.get('/patient/by-patientid/:patientId', getPatientByPatientId);

router.patch('/admin/patients/:id', updatePatientbyAdmin);
router.patch('/medical/patients/:id', updatePatientbyMedical);
router.patch('/patients/:id', updatePatientSelf);



export default router;
