const connection = require("../Model/model");
const bcrypt = require('bcrypt');



const getCustomerData=(req, res) =>{
   const sql = 'select * from  tbl_customers';
   const data = req.body;
   console.log(data)
   connection.query(sql,data, (err, result)=>{
    if(err){
        console.log("Customer Data not Get", err) 
        res.status(500).json({Error: "Customer data Get failed"})
    } else{
        console.log("Customer data Get Success fully")
        res.status(200).json({result, message: "Customer data Get successFully"});
    }
   })
}



// const postCustomerData = (req, res) =>{
//     const {id , name, dob, gender, height, weight, doj, photo, email, password, contect} = req.body;

//     const sql = `INSERT INTO tbl_customers (id , name, dob, gender, height, weight, doj, photo, email, password, contect)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//     const values = [id , name, dob, gender, height, weight, doj, photo, email, password, contect];

//     connection.query(sql, values, (err, result) =>{
//         if(err){
//             console.log("Customer Data not Inserted", err) 
//             res.status(500).json({Error: "Customer data Inserted failed"})
//         } else{
//             console.log("Customer data updated Success fully")
//             res.status(200).json({result, message: "Customer data Inserted successFully"});
//         }
//     })
// }



const postCustomerData = (req, res) => {
  const { id, name, dob, gender, height, weight, doj, email, password, contect } = req.body;
  const photo=req.file.originalname;
  // Generate a salt (a random string used for hashing)
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.log("Error generating salt", err);
      return res.status(500).json({ error: "Customer data insertion failed" });
    }

    // Hash the password with the generated salt
    bcrypt.hash(password, salt, (err, hashedPassword) => {
      if (err) {
        console.log("Error hashing password", err);
        return res.status(500).json({ error: "Customer data insertion failed" });
      }

      const sql = `INSERT INTO tbl_customers (id , name, dob, gender, height, weight, doj, photo, email, password, contect)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        id, name, dob, gender, height, weight, doj, photo, email, hashedPassword, contect
      ];

      connection.query(sql, values, (err, result) => {
        if (err) {
          console.log("Customer Data not Inserted", err);
          res.status(500).json({ error: "Customer data insertion failed" });
        } else {
          console.log("Customer data updated successfully");
          res.status(200).json({ result, message: "Customer data inserted successfully" });
        }
      });
    });
  });
};



const updateCustomerData = (req, res) => {
     try{
        const data = req.body;
        const id = req.params.id;
        const sql = "UPDATE tbl_customers SET ? WHERE id = ?"
        connection.query(sql, [data, id], (err, result)=>{
          if (err) {
            console.error("Customer data not Updated", err);
            res.status(500).json({ error: "Customer data Update failed" });
          } else {
            console.log("Customer data updated Successfully");
            res.status(200).json({ result, message: "Customer data updated Successfully" });
          }
        })
    }catch(error){
        console.log("Error")
    }

}


const deleteCustomerData = (req, res) =>{
    const id = req.params.id;
    const sql = `DELETE FROM tbl_customers WHERE id = ?`

    connection.query(sql,  id, (err, result)=>{
        if(err){
            console.error("Customer data not deleted", err);
            res.status(500).json({ error: "Customer data Delete failed" });
        }else {
            console.log("Customer data delete Successfully");
            res.status(200).json({ result, message: "Customer data delete Successfully" });
          }
    })
}






module.exports = {getCustomerData, postCustomerData, updateCustomerData, deleteCustomerData  };