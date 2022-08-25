const  {validationResult,checkSchema}  = require('express-validator/check');
const validationModel = require('../helpers/validationModels');

const validation = function(model){
    return function (req,res,next){
        try {
            checkSchema(validationModel[model]);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({"status-code":"400","message":errors.array(),"data":[]});
            }
            next();
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports=validation;