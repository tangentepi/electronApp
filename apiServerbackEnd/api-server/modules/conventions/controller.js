import Convention from './model';

export const createConventtion = (req, res, next) => {

};
export const getAllConvention = async (req, res) =>{
    try {
        return res.status(200).json({convention: await Convention.find()});
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