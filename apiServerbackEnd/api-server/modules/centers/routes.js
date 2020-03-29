import {Router} from 'express';

import * as Center from './controller';

const auth = require('../../middleware/auth');
const amdminAuth = require('../../middleware/auth-admin');
//const multer = require('../../middleware/multer-config');

const routes = new Router();


routes.post('/', auth, Center.createCenter);
routes.get('/', auth, Center.getAllCenter);
routes.get('/:wording', auth, Center.findCenterByWording);

export default routes;