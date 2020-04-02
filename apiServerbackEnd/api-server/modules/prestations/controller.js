import Prestation from './model';
import { request } from 'express';

// Ajout d'une prestation

// export const createPrestation = (req, res, next) => {
//     const prestation = new Prestation({
//         wording: req.body.wording,
//         centerIds: req.body.centerId,
//         cost: request.body.cost
//     });
//     prestation.save().then(
//         () => {
//             res.status(201).json({
//                 message: 'Prestation save successfully !',
//                 prestation: prestation
//             });
//         }
//     ).catch(
//         (error) => {
//             res.status(400).json({
//                 error : error
//             });
//         }
//     );
// };

export const createPrestation = (req, res, next) => {
    Prestation.findOne({
      wording: req.body.wording
    }).then(
      (prestation) => {
        if(!prestation){
          const newPrestation = new Prestation({
            wording: req.body.wording,
            centerIds: req.body.centerId,
            cost: req.body.cost
            //    {
            //   userIds: req.body.user,
            //   registrationDate: req.body.registrationDate,
            //   centerIds: req.body.center
            // }
            // $push:{
            //   "registrationInfos":{$each:[req.bosy.registrationInfos]}
            // }
          });
          newPrestation.save().then(()=>{
            res.status(201).json({message: "New Prestation created successfully !", prestation: newPrestation})
          }).catch((error)=>{
            res.status(400).json({error: error, message: 'New Prestation; creation failed !'});
          });
        }
        else{
          Prestation.updateOne({wording: req.body.wording},{
            $push:{
              "centerIds":{$each: [req.body.centerId]},
              "cost":{$each: [req.body.cost]}
            }
          }).then(()=>{
            res.status(201).json({message: 'Prestation successfully updated !', prestation: prestation});
          }).catch((error)=>{
            res.status(400).json({error: error,
            message: 'Prestation; update failed !'});
          })
        }
      }).catch((error)=>{
        res.status(400).json({error: error, message: 'Erreur lors de la recherche de la Prestation !'});
      })
  };

export const getAllPrestation = async (req, res) => {
    try {
      return res.status(200).json({prestations: await Prestation.find()});
    }
    catch (e) {
        return res.status(e.status).json({ error: true, message: 'Error with Prestation' });
    }

};
// Modification d'une prestation

export const modifyPrestation = (req, res, next) => {
    // const prestation = new Prestation ({
    //     _id: req.params.id,
    //     wording: req.body.wording,
    //     centerIds: req.body.centerId
    // });
    Prestation.updateOne({_id: req.params.id}, {
        wording: req.body.wording,
        $push:{
            "centerIds":{$each: [req.body.centerId]}
        },
        cost: req.body.cost
    }).then(
        () => {
            res.status(201).json({
                message: 'Prestation updated successfully !',
                // prestation: prestation
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({error: error});
        }
    );
};