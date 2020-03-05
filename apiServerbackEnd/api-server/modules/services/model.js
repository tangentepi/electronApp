const mongoose = require('mongoose');


//import mongoose, { Schema } from mongoose;

const serviceSchema = new mongoose.Schema({
    idService: { type: String, required: true, unique: true },
    libelleService: { type: String, required: true },
    nombrePrestationService: { type: Number, required: true },
    servicesPrestations: { type: Array, required: true }
    });

//patientSchema.plugin(uniqueValidator);

export default mongoose.model('Service', serviceSchema);