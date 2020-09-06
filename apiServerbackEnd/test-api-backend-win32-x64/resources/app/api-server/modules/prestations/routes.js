import {Router} from 'express';
import * as Prestation from './controller';

const auth = require('../../middleware/auth');
const adminAuth = require('../../middleware/auth-admin');
// const multer = require('../../middleware/multer-config');

const routes = new Router();

routes.post('/', adminAuth, Prestation.createPrestation);
routes.get('/', auth, Prestation.getAllPrestation);
routes.put('/:id', adminAuth, Prestation.modifyPrestation);

export default routes;