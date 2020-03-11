import Center from './model';

export const createCenter = (req, res, next) => {
    const center = new Center({
        wording: req.body.wording,
        patientIds: req.body.patientId,
        prestationIds: req.body.prestationId
    });
    center.save().then(
        () => {
            res.status(201).json({
                message: 'The center has been created succsessfully !',
                center: center
                });
        }
    ).catch(
    (error) => {
        res.status(400).json({ error: error});
    }
    );
};