import express from 'express';
import { createMedical,getAllMedicals,getMedicalById,deleteMedical,updateMedical } from '../controllers/medical.controller.js';
import { loginPatient } from '../controllers/login.patient.controller.js';
import { loginMedical } from '../controllers/login.medical.controller.js';
import { loginAdmin } from '../controllers/login.admin.controller.js';
import { addPatient, getAllPatients, getPatientById, getPatientByPatientId, updatePatientbyAdmin, updatePatientbyMedical, updatePatientSelf } from '../controllers/patient.controller.js';
import auth from '../middleware/auth.js';
// import all the controllers here from controller folder

const router = express.Router();
router.post('/medical/addmedical',auth,createMedical);
router.get('/medical/allmedical',auth, getAllMedicals);
router.get('/medical/:id',auth, getMedicalById);
router.delete('/medical/:id',auth, deleteMedical);
router.put('/medical/:id',auth, updateMedical); // ← new route here

router.post('/patient/addpatient',auth, addPatient)
router.get('/patient/allpatients',auth,getAllPatients)

router.post('/login/patient',loginPatient);
router.post('/login/medical',loginMedical);
router.post('/login/admin',loginAdmin)
// place all routes(endpoints) here with methods like PUT, GET etc..
router.get('/patient/by-patientid/:patientId', getPatientByPatientId);
router.get('/patient/:id',auth,getPatientById)
router.patch('/admin/patients/:id',auth, updatePatientbyAdmin);
router.patch('/medical/patients/:patientId', auth, updatePatientbyMedical);
router.patch('/patients/:id',auth, updatePatientSelf);



export default router;
