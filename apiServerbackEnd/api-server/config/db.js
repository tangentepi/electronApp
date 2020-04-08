/* import mongoose from 'mongoose';
//_________________THE APP__________________

export default () => {
    mongoose.promise = global.promise;
    mongoose.connect('mongodb+srv://otherUsers:S5fZFoxMy01NfMnF@cluster0-6rr0h.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection
    .once('open', () => console.log('Successfully connected to MongoDB Atlas!') )
    .on('error', err => console.error(err))
};
mongoose.set('useCreateIndex', true);
*/

//_________________THE APP__________________
// CONNECXION LOCALE

import mongoose from 'mongoose';


export default () => {
    mongoose.promise = global.promise;

    mongoose.connect('mongodb://localhost:27017/test',{ useNewUrlParser: true, useUnifiedTopology: true }); // connexion Locale
    mongoose.connection
    .then(() => console.log('Connexion Locale à MongoDB  réussie :) !') )
    .catch(() => console.log('Connexion Locale à MongoDB échouée :('))
};
mongoose.set('useCreateIndex', true);

// **********************************************************************

// CONNECXION DISTANTE

// export default () => {
//     mongoose.promise = global.promise;

//     mongoose.connect('mongodb+srv://otherUsers:S5fZFoxMy01NfMnF@cluster0-6rr0h.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true }); // Connexion distance à la base de données (DBaaS) Atlas

//     mongoose.connection
//     .then(() => console.log('Connexion Distante à MongoDB Atlas réussie :) !') )
//     .catch(() => console.log('Connexion Distante à MongoDB Atlas échouée :('))
// };
// mongoose.set('useCreateIndex', true);
