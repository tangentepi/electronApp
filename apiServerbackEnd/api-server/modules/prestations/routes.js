import {Router} from 'express';
import * as Prestation from './controller';

const auth = require('../../middleware/auth');
const multer = require('../../middleware/multer-config');

const routes = new Router();

routes.post('/', auth, Prestation.createPrestation);
