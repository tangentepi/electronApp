import Prestation from './model';

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