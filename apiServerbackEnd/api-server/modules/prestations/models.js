const mongoose = required('mongoose');

const prestationSchema = mongoose.Schema({
    wording: {type: String, required: true}, //Libellé de la prestation (consultation, examen de sang, examen radio, etc)
    centerIds: [Sting]
});

export default mongoose.model('Prestation', prestationSchema);