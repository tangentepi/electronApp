const mongoose = required('mongoose');

const prestationSchema = mongoose.Schema({
    wording: {type: String, required: true}, //Libellé de la prestation (consultation, examen de sang, examen radio, etc)
    centerIds: [{type: mongoose.Type.ObjectId, ref: 'Center', required: true}]
});

export default mongoose.model('Prestation', prestationSchema);