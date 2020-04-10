import Convention from './model';

export const createConvention = (req, res, next) => {
    Convention.findOne({
      wording: req.body.wording
    }).then(
      (convention) => {
        if(!convention){
          const newConvention = new Convention({
            wording: req.body.wording,
            membershipCost: req.body.membershipCost,
            insuredShare: req.body.insuredShare
          });
          newConvention.save().then(()=>{
            res.status(201).json({message: "New Convention created successfully !", convention: newConvention})
          }).catch((error)=>{
            res.status(400).json({error: error, message: 'Nouvelle convention; echec création !'});
          });
        }
        else{
          Convention.updateOne({wording: req.body.wording},{
            wording: req.body.wording,
            membershipCost: req.body.membershipCost,
            insuredShare: req.body.insuredShare
          }).then(()=>{
            res.status(201).json({message: 'Convention successfully updated !', convention: convention});
          }).catch((error)=>{
            res.status(400).json({error: error,
            message: 'Echec de mise à jour de Convention'});
          })
        }
      }).catch((error)=>{
        res.status(400).json({error: error, message: 'Erreur lors de la recherche de la Convention !'});
      })
  };
  
export const getAllConvention = async (req, res) =>{
    try {
        return res.status(200).json({conventions: await Convention.find()});
    } catch (e) {
        return res.status(e.status).json({error: true, message: 'Error with convention'});
    }
};

export const getOneConvention = (req, res, next) => {

};

export const modifyConvention = (req, res, next) => {

};

export const deleteConvention = (req, res, next) => {

};