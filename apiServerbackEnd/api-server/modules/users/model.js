const mongoose = require('mongoose');
//const mongooseSchema = require('mongoose.Schema')
const uniqueValidator = require('mongoose-unique-validator');





//import mongoose, { Schema } from mongoose;

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password :{ type: String, required: true },
    profil: {type: String, required: false},
    token: {type: String, required: false},
    connectionStart: { type: Number},
    connectionEnd: {type: Number },
    patientIds: [String]
});

userSchema.plugin(uniqueValidator);

export default mongoose.model('Users', userSchema);