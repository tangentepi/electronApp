import Prestation from './model';

export const createPrestation = (req, res, next) => {
    const prestation = new Prestation({
        wording: req.body.wording,
        centerIds: req.body.centerId
    });
};