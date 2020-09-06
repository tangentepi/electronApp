const mongoose = require('mongoose');

const prestationSchema = new mongoose.Schema({
    wording: {type: String, required: true}, //Libellé de la prestation (consultation, examen de sang, examen radio, etc)
    centerIds: [{type: String, required: true}],
    cost:[{type: Number, required: true}]
    //centerIds: [{type: mongoose.Types.ObjectId, ref: 'Center'}]
});

// export default mongoose.model('Prestation', prestationSchema);
module.exports = mongoose.model('Prestation', prestationSchema);