import { Router } from 'express' // Un import ici
import * as User from './controller'


const routes = new Router();

//LOGIN & SIGNUP 

const auth = require('../../middleware/auth');
const adminAuth = require('../../middleware/auth-admin');





routes.post('/signup', User.signup);
routes.post('/login', User.login);
routes.put('/modify/1/:id', adminAuth, User.modifyUser1);
routes.put('/modify/2/:id', auth, User.modifyUser2);



export default routes; // Un export ici, pourquoi: c'est une sorte d'exportation des routes afin que l'on puisse les utiliser ailleurs