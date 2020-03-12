const mongoose = require('mongoose');

const prestationSchema = new mongoose.Schema({
    wording: {type: String, required: true}, //Libellé de la prestation (consultation, examen de sang, examen radio, etc)
    centerIds: [String]
    // centerIds: [{type: mongoose.Types.ObjectId, ref: 'Center'}]
});

export default mongoose.model('Prestation', prestationSchema);