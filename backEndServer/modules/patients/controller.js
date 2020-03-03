/*const bcrypt = require('bcrypt'); // Concerne uniquement les users pour leurs authentification
const jwt = require('jsonwebtoken');*/
/*const Patient = require('./model');*/
/*******************Appel express*****************/
//const express = require('express');
/*Fin appel express*/
import Patient from './model';
/*Appel du module express-hateoas-links*/
//const hateoasLinker = require('express-hateoas-links');

/*Utilisation du module express-hateoas-links */
//const app = express();
//app.use(hateoasLinker);


//***************FONCTIONS CRUD PATIENT*******************

//Création d'un patient

export const createPatient = (req, res, next) => {
  const patient = new Patient({
    name: req.body.name,
    firstName: req.body.firstName,
    birthDate: req.body.birthDate,
    pieceNumber: req.body.pieceNumber,
    gender: req.body.gender,
    address: req.body.address,
    typeOfPiece: req.body.typeOfPiece,
    placeOfResidence: req.body.placeOfResidence,
    phoneNumber: req.body.phoneNumber,
    employer: req.body.employer,
    electricityRelease: req.body.electricityRelease,
    waterClearance: req.body.waterClearance,
    nationality: req.body.nationality,
    fatherFullName: req.body.fatherFullName,
    motherFullName: req.body.motherFullName
    });
  const prestation = new prestation({
    prestationDate : req.body.prestationDate
  });
  patient.save().then(
    () => {
      res.status(201).json({
        message: 'Patient saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
//Lecture d'un patient en foction de son identifiant

/*
exports.getOnePatient = (req, res, next) => {
  Patient.findOne({
    _id: req.params.id
  }).then(
    (Patient) => {
      res.status(200).json(Patient);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};
*/

//Lecture de tous les patients


// ************************* hateoasLinker = require('express-hateoas-links');


export const getAllPatient = async (req, res) => {
    try {
      return res.status(200).json({patients: await Patient.find()});
    }
    catch (e) {
        return res.status(e.status).json({ error: true, message: 'Error with patient' });
    }

};

export const getOnePatient = (req, res, next) => {
  Patient.findOne({
    _id: req.params.id
  }).then(
    (patient) => {
      res.status(200).json(patient);
      /*console.log(patient);*/
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

//Modification d'un patient 
//Attention: Renseigner tous les champs avant de lancer la requête


export const modifyPatient = (req, res, next) => {
  const patient = new Patient({
    _id: req.params.id,
    name: req.body.name,
    firstName: req.body.firstName,
    birthDate: req.body.birthDate,
    pieceNumber: req.body.pieceNumber,
    typeOfPiece: req.body.typeOfPiece,
    gender: req.body.gender,
    address: req.body.address,
    placeOfResidence: req.body.placeOfResidence,
    phoneNumber: req.body.phoneNumber,
    employer: req.body.employer,
    electricityRelease: req.body.electricityRelease,
    waterClearance: req.body.waterClearance,
    nationality: req.body.nationality,
    fatherFullName: req.body.fatherFullName,
    motherFullName: req.body.motherFullName
  });
  Patient.updateOne({_id: req.params.id}, patient).then(
    () => {
      res.status(201).json({
        message: 'Patient updated successfully!',
        patient: patient
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

//Suppression d'un patient


export const deletePatient = (req, res, next) => {
  Patient.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Patient deleted successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};