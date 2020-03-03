const mongoose = require('mongoose');
//const mongooseSchema = require('mongoose.Schema')
const uniqueValidator = require('mongoose-unique-validator');





//import mongoose, { Schema } from mongoose;

const prestationSchema = new mongoose.Schema({
    patientId: { type: String, required: true },
    userId :{ type: String, required: true },
    prestationWording: {type: String, required: false},
    prestationCenter: {type: String, required: false},
    prestationDate: { type: Date, required: true}
});

//prestationSchema.plugin(uniqueValidator);

export default mongoose.model('Prestations', prestationSchema);