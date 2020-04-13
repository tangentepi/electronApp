const mongoose = require('mongoose');
//const mongooseSchema = require('mongoose.Schema')
const uniqueValidator = require('mongoose-unique-validator');


// ************************* hateoasLinker = require('express-hateoas-links');


//import mongoose, { Schema } from mongoose;

const patientSchema = new mongoose.Schema({
    patientId: {type: String, required: true, unique: true},// Numéro unique du patient
    name: { type: String, required: true }, //Nom du patient
    firstName: { type: String, required: true }, // Prénom du patient
    birthDate: { type: Date }, // [MM/JJ/AAAA]
    pieceNumber: { type: String }, // Numéro de Piece
    typeOfPiece: { type: String }, // Type de Piece
    gender: { type: String }, // genre
    address: { type: String }, // Adresse postale
    placeOfResidence: {type: String}, // Lieu de résidence
    phoneNumber: { type: String }, // numéro de téléphone
    employer: { type: String }, // Employeur
    electricityRelease: { type: String }, // Quittance cie
    waterClearance: { type: String }, // Quittance sodeci
    nationality: { type: String }, // Nationalité
    fatherFullName: { type: String }, // Nom et prénom du Père
    motherFullName: { type: String}, // Nom et prénom de la Mère
    imageUrl: {type: String}, // l'URL de la photo du patient
    conventionId: {type: String},
    // conventionId: {type: mongoose.Types.ObjectId, ref: 'Convention'},
    registrationInfos: [{
        userIds: {type: String, required: true}, // L'identifient du médecin qui enregistre le patient 
        registrationDate: {type: Date, default: Date.now}, // date d'enregistrement du patient
        centerIds: {type: String, required: true} // Centre (lieu ou Service) d'enregistrement 
        //userIds: {type: mongoose.Types.ObjectId, ref:'User'},  
        //registrationDate: {type: Date, default: Date.now},
        //centerIds: {type: mongoose.Types.ObjectId, ref: 'Center'}
    }]
    
});

patientSchema.plugin(uniqueValidator);

// export default mongoose.model('Patient', patientSchema);
module.exports = mongoose.model('Patient', patientSchema);