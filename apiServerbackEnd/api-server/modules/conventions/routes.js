import { Router } from 'express';
import * as Convention from './controller';

const adminAuth = require('../../middleware/auth-admin');
const auth = require('../../middleware/auth');



const routes = new Router();


// routes.post('/',adminAuth, Convention.createConvention);
routes.get('/', auth, Convention.getAllConvention);
routes.get('/:id', auth, Convention.getOneConvention);
routes.put('/:id', adminAuth, Convention.modifyConvention);
routes.delete('/:id', adminAuth, Convention.deleteConvention);

export default routes;