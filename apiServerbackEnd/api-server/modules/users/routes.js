import { Router } from 'express' // Un import ici
import * as User from './controller'


const routes = new Router();

//LOGIN & SIGNUP 

const auth = require('../../middleware/auth');





routes.post('/signup', User.signup);
routes.post('/login', User.login);
routes.put('/modify/:id', auth, User.modifyUser);



export default routes; // Un export ici, pourquoi: c'est une sorte d'exportation des routes afin que l'on puisse les utiliser ailleurs