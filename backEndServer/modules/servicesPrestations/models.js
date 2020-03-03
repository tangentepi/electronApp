const mongoose = require('mongoose');


//import mongoose, { Schema } from mongoose;

const servicesPrestationsSchema = new mongoose.Schema({
    idService: { type: String, required: true, unique: true },
    libService: { type: String, required: true },
    nombrePrestationService: { type: Number, required: true },
    });

//patientSchema.plugin(uniqueValidator);

export default mongoose.model('ServicesPrestations', servicesPrestationsSchema);