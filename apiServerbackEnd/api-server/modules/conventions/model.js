const mongoose = require('mongoose');

const conventionSchema = new mongoose.Schema({
    wording: {type: String, required: true}, //Libellé de la convention
    membershipCost: {type: String, required: true}, //Coût d'adhésion à la convention
    insuredShare: {type: Number, required}, //Part de l'adhérent (en %)
    patientIds: [String]
});

export default mongoose.model('Convention', conventionSchema);