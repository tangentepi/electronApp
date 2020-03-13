import Prestation from './model';

// Ajout d'une prestation

export const createPrestation = (req, res, next) => {
    const prestation = new Prestation({
        wording: req.body.wording,
        centerIds: req.body.centerId
    });
    prestation.save().then(
        () => {
            res.status(201).json({
                message: 'Prestation save successfully !'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error : error
            });
        }
    );
};

// Modification d'une prestation

export const modifyPrestation = (req, res, next) => {
    // const prestation = new Prestation ({
    //     _id: req.params.id,
    //     wording: req.body.wording,
    //     centerIds: req.body.centerId
    // });
    Prestation.updateOne({_id: req.params.id}, {wording: req.body.wording,
        $push:{
            "centerIds":{$each: [req.body.centerId]}
        }}).then(
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