//__________________THE SERVER_______________________

import express from 'express';
import dbConfig from './config/db';
import middlewares from './config/middlewares';
import { UserRoutes } from './modules';
import { patientRoutes } from './modules';

const app = express();

// Appel de la connexion à la base de données
 
dbConfig();

//gestion des erreurs CORS (Cross Orignin Resource Sharing)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


//Appel des midllewares


middlewares(app);

app.use( '/api/patients', patientRoutes );
app.use( '/api/users', UserRoutes );


const PORT  = 3001;


app.listen(PORT, err => {
    if ( err ){
        console.err( err )
    }else{
        console.log(`****************************\nAPI LISTEN FROM PORT : ${PORT}\n****************************`)
    }
});