const express = require('express')
const connection = require("../Model/model");

const bcrypt = require('bcrypt');

const app = express();
const Validation = require('../Validation.js')

// Secret access key Copied AWYorTE01aNY8L+MXBI5I2lGyuWRHZeRn8TEkieb
// Access key AKIATTH6CIGFMZG53VIY
const getAdminUser = (req, res) =>{
    let sqlQuery = "select * from tbl_admin_user";
    let data = req.body;
     
     connection.query(sqlQuery, data, function(error, result){
        if(error){
            console.log("Error", error.sqlMessage)
        }
        else{
            res.json(result);
        }
    })
}

//get admin data by Id

const get_Admin_data_by_Id = ((req, res)=>{
    try {
        // const id = req.params.id;
        // const manish = req.params.manish;
        const {id, manish} = req.params; // Extract the ID from the URL parameters
        const sqlQuery = "SELECT * FROM tbl_admin_user WHERE uid = ?";
    
        connection.query(sqlQuery, id, (error, result) => {
          if(error){
            console.log("Admin Data not Get", error) 
            res.status(500).json({Error: "Admin data Get failed"})
        } else{
            console.log("Admin data Get Success fully")
            res.status(200).json({result, message: "Admin data Get successFully"});
        }
        });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An internal server error occurred" });
      }
})


const Login = ((req, res)=>{
    const sql = "SELECT * FROM tbl_admin_user Where email = ? AND password = ?";
    connection.query(sql, [req.body.email, req.body.password], (err, result) =>{
        if(err) return res.json({Status: "Erroryyy"});
        if(result.length > 0){
            return res.json({Status: "Success"})
        }else{
            return res.json({Status: "Error"});
        }
    })
})

const postAdminUser = ((req,res)=>{
    const {uid, name,  email, password, mobile, dob, address, experience, aadhar, qualification, specialization, doj,  status}=req.body;
    const photo=req.file.originalname;

    bcrypt.genSalt(10, (err, salt) =>{
        if(err){
            console.log("Error generating salt", err);
            return res.status(500).json({Error: "Customer data insertion faild"});
        }

        bcrypt.hash(password, salt, (err, hashePassword) =>{
            if(err){
                console.log("Error hashing password", err);
                return res.status(500).json({Error: "Customer data insertion faild"});
            }
            const sql = `INSERT INTO tbl_admin_user (uid, name,  email, password,  mobile,  dob,  photo, address,   experience, aadhar,  qualification,  specialization,  doj,  status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const values = [uid, name,  email, hashePassword,  mobile,  dob,  photo, address, experience, aadhar, qualification, specialization,  doj,  status]

            connection.query(sql, values, (err, result) =>{
                if(err){
                    console.log("Admin Data not Inserted", err) 
                    res.status(500).json({Error: "Admin data Inserted failed"})
                } else{
                    console.log("Admin data Inserted Success fully")
                    res.status(200).json({result, message: "Admin data Inserted successFully"});
                }
            })
        })
    })
    
})

const deleteAdmin = (req, res) =>{
    const id = req.params.id;
    console.log(id)
    const sql = "DELETE FROM tbl_admin_user WHERE uid = ?";
    connection.query(sql, id, (err, result) =>{
        if(err){
            console.log("Admin Data not Delete", err) 
            res.status(500).json({Error: "Admin data Delete failed"})
        } else{
            console.log("Admin data Delete Success fully")
            res.status(200).json({result, message: "Admin data Delete successFully"});
        }
    })
}


//Update Api

const  updateAdmin  = (req, res) =>{
        try{
        const data = req.body;
        const id = req.params.id;
        const sql = "UPDATE tbl_admin_user SET ? WHERE uid = ?"
        connection.query(sql, [data, id], (err, result)=>{
          if (err) {
            console.error("Admin data not Updated", err);
            res.status(500).json({ error: "Admin data Update failed" });
          } else {
            console.log("Admin data updated Successfully");
            res.status(200).json({ result, message: "Admin data updated Successfully" });
          }
        })
    }catch(error){
        console.log("Error")
    }

}

//Update Statuss

const status_damin_update = (req, res) =>{

    try {
        // Extract the status and id from the request
        const { status } = req.body;
        const { id } = req.params;
    
        // Validate status and id here if needed
    
        const sql = "UPDATE tbl_admin_user SET status = ? WHERE uid = ?";
        connection.query(sql, [status, id], (err, result) => {
          if (err) {
            console.error("Admin Status not Updated", err);
            res.status(500).json({ error: "Admin Status Update failed" });
          } else {
            console.log("Admin Status updated Successfully");
            res.status(200).json({ result, message: "Admin Status updated Successfully" });
          }
        });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An internal server error occurred" });
      }
    };





module.exports = { getAdminUser, postAdminUser, deleteAdmin, get_Admin_data_by_Id, updateAdmin, status_damin_update, Login }
