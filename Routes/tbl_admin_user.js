const express = require("express");
const multer = require('multer');
const AdminUser = express.Router();
const app = express();
const Validation = require('../Validation.js')
app.use(express.static('uploads'))
const { getAdminUser, get_Admin_data_by_Id, postAdminUser, deleteAdmin, updateAdmin, status_damin_update,Login  }  = require("../Controllers/tbl_admin_user");
const Validate = require("../Validation");

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


/**
* @swagger
* components:
*   schemas:
*       tbl_admin_user:
*       type: object
*       properties:
*         uid:
*           type: number
*         name:
*           type: string
*         email:
*           type: string
*         password:
*           type: string
*         mobile:
*           type: string
*         dob:
*           type: number
*         photo:
*           type: string
*         address:
*           type: string
*         experience:
*           type: string
*         aadhar:
*           type: string
*         qualification:
*           type: string
*         specialization:
*           type: string
*         doj:
*           type: number
*         status:
*           type: string
*/

/**
 *@swagger
 * /getadminuser:
 *          get:
 *              summary: This get api is used to check get metod is working or not
 *              description: This api is used to check get metod is working or not
 *              responses:
 *                  200:
 *                      description: to test get method
 *                      content: 
 *                          application/json:
 *                              schema:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#components/schemas/tbl_admin_user'
 * 
 
*/


AdminUser.get("/getadminuser", getAdminUser);
AdminUser.get("/api/admin/getadminbyId/:id/:manish", get_Admin_data_by_Id);
AdminUser.post("/api/admin/postadminUser",upload.single('photo'), Validation, postAdminUser);
AdminUser.delete("/api/admin/deleteadmin/:id", deleteAdmin);
AdminUser.put("/api/admin/updateadmin/:id", updateAdmin);
AdminUser.put("/api/admin/statusUpdate/:id", status_damin_update);
AdminUser.post("/api/admin/login", Login);

module.exports = {AdminUser}