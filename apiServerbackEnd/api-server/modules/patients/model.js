const mongoose = require('mongoose');
//const mongooseSchema = require('mongoose.Schema')
//const uniqueValidator = require('mongoose-unique-validator');


// ************************* hateoasLinker = require('express-hateoas-links');


//import mongoose, { Schema } from mongoose;

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true }, //Nom du patient
    firstName: { type: String, required: true }, // Prénom du patient
    birthDate: { type: Date, required: true }, // [MM/JJ/AAAA]
    pieceNumber: { type: String, required: true }, // Numéro de Piece
    typeOfPiece: { type: String, required: true }, // Type de Piece
    gender: { type: String, required: true }, // genre
    address: { type: String, required: true }, // Adresse postale
    placeOfResidence: {type: String, required: true}, // Lieu de résidence
    phoneNumber: { type: String, required: true }, // numéro de téléphone
    employer: { type: String, required: true }, // Employeur
    electricityRelease: { type: String, required: true }, // Quittance cie
    waterClearance: { type: String, required: true }, // Quittance sodeci
    nationality: { type: String, required: true }, // Nationalité
    fatherFullName: { type: String, required: true }, // Nom et prénom du Père
    motherFullName: { type: String, required: true}, // Nom et prénom de la Mère
    conventionId: {type: mongoose.Types.ObjectId, ref: 'Convention', required: true},
    users: [{userIds: {type: mongoose.Types.ObjectId, ref:'User' , required: true},  // L'identifient du médecin qui enregistre le patient 
    registringDate: {type: Date, required: true, default: Date.now},//date d'enregistrement du patient
    centerIds: {type: mongoose.Types.ObjectId, ref: 'Center', required: true} // Centre (lieu ou Service) d'enregistrement 
    }]
    
});

//patientSchema.plugin(uniqueValidator);

export default mongoose.model('Patient', patientSchema);