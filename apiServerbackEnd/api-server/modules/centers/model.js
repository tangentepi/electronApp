const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
    wording: {type: String, required: true}, //Libellé du centre
    patientIds: [{type: mongoose.Types.ObjectId, ref: 'Patient'}],
    prestationIds: [{type: mongoose.Types.ObjectId, ref: 'Prestation'}]
});

export default mongoose.model('Center', centerSchema);