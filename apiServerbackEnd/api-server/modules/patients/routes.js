import { Router } from 'express'; // Un import ici
import * as Patient from './controller';

const adminAuth = require('../../middleware/auth-admin');
const auth = require('../../middleware/auth');
const multer = require('../../middleware/multer-config');



const routes = new Router();





routes.post('/', auth, multer, Patient.createPatient);
routes.get('/', auth, Patient.getAllPatient);
routes.get('/1/:id', auth, Patient.getOnePatient);
routes.get('/2/:id', auth, Patient.findAPatient);
routes.put('/:id',auth, Patient.modifyPatient);
routes.delete('/:id', adminAuth, Patient.deletePatient);

export default routes; // Un export ici, pourquoi? ==>
                       //On exporte les routes pour les rendre
                       //utilisables à partir d'autres modules
                       
