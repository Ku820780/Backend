const joi = require('joi')

const schema = joi.object({
    uid:joi.number().integer().min(1).max(100).required(),
    name:joi.string().min(2).max(50).required(),
    email:joi.string().min(1).max(20).required(),
    password:joi.string().min(5).max(20).required(),
    mobile:joi.string().min(1).max(10).required(),
    dob:joi.date().required(),
    photo:joi.string(),
    address:joi.string().min(5).max(100).required(),
    experience:joi.string().min(1).max(15).required(),
    aadhar:joi.string().min(1).max(16).required(),
    qualification:joi.string(),
    specialization:joi.string(),
    doj:joi.date().required(),
    status:joi.string().min(5).max(10).required()
})

const Validation = (req, res, next) => {
    const value = schema.validate(req.body)
    if(value.error){
        res.send({error:value.error.details[0]})
    }else{
        next()
    }
}
module.exports = Validation;