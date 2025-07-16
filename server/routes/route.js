import express from 'express';
import { createMedical,getAllMedicals,getMedicalById,deleteMedical,updateMedical ,updateMedicalByAdmin } from '../controllers/medical.controller.js';
import { loginPatient } from '../controllers/login.patient.controller.js';
import { loginMedical } from '../controllers/login.medical.controller.js';
import { loginAdmin } from '../controllers/login.admin.controller.js';
import { addPatient, getAllPatients, getPatientById, getPatientByPatientId, updatePatientbyAdmin, updatePatientbyMedical, updatePatientSelf ,deletePatient} from '../controllers/patient.controller.js';
import auth from '../middleware/auth.js';
// import all the controllers here from controller folder

const router = express.Router();
router.post('/medical/addmedical',auth,createMedical);
router.get('/medical/allmedical',auth, getAllMedicals);
router.get('/admin/medical/:medicalId', auth, getMedicalById);
router.delete('/medical/deletemedical/:id', deleteMedical);
router.put('/medical/:id',auth, updateMedical); // ← new route here

router.delete('/patient/deletepatient/:id', deletePatient);
router.post('/patient/addpatient',auth, addPatient)
router.get('/patient/allpatients',auth,getAllPatients)

router.post('/login/patient',loginPatient);
router.post('/login/medical',loginMedical);
router.post('/login/admin',loginAdmin)
// place all routes(endpoints) here with methods like PUT, GET etc..
router.get('/patient/by-patientid/:patientId', getPatientByPatientId);
router.get('/admin/patient/:patientId', auth, getPatientById);
router.patch('/admin/patient/:patientId',auth, updatePatientbyAdmin);
router.patch('/admin/medical/:medicalId', auth, updateMedicalByAdmin);
router.patch('/medical/patients/:patientId', auth, updatePatientbyMedical);
router.patch('/patients/:patientId',auth, updatePatientSelf);




export default router;
