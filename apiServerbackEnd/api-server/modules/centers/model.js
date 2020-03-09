const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
    wording: {type: String, required: true}, //Libellé du centre
    patientIds: [String],
    prestationIds: [String]
});

export default mongoose.model('Center', centerSchema);