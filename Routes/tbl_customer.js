const express = require('express')
const multer = require('multer');
const Customer = express.Router()

const {getCustomerData, postCustomerData, updateCustomerData, deleteCustomerData} = require('../Controllers/tbl_customer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({
    storage: storage
})

Customer.get('/api/customer/getcustomerdata', getCustomerData)
Customer.post('/api/customer/postcustomerdata', upload.single('photo'), postCustomerData)
Customer.put('/api/customer/updatecustomerdata/:id', updateCustomerData)
Customer.delete('/api/customer/deletecustomerdata/:id', deleteCustomerData)


module.exports = {Customer};