const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
    wording: {type: String, required: true}, //Libellé du centre
    registrationInfos: [{
        patientIds: {type: String},
        registrationDate:{ type: Date}
    }],
    prestationIds: [{type: String}]
    // patientIds: [{type: mongoose.Types.ObjectId, ref: 'Patient'}],
    // prestationIds: [{type: mongoose.Types.ObjectId, ref: 'Prestation'}]
});

// export default mongoose.model('Center', centerSchema);
module.exports = mongoose.model('Center', centerSchema);