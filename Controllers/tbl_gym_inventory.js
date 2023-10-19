const connection = require("../Model/model");


//post api inventory

const post_inventory = (req, res) =>{
    const {pid, pro_name,  price, dod, quantity, company_name,  photo,  description} = req.body;

    const sql = `INSERT INTO tbl_gym_inventory (pid, pro_name,  price, dod, quantity, company_name,  photo,  description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [pid, pro_name,  price, dod, quantity, company_name,  photo,  description];

    connection.query(sql, values, (err, result) =>{
        if(err){
            console.log("Inventory data not inserted", err);
            res.status(500).json({ error: "Inventory data insertion failed" });
        } else {
          console.log("Inventory data inserted successfully");
          res.status(200).json({ result, message: "Inventory data inserted successfully" });
        }
        
    })
}


// Get Inventory data

const get_Inventory_data = (req, res) =>{
   
    const sql = `SELECT * FROM tbl_gym_inventory`;
    const data = req.body;
    console.log(data)
    connection.query(sql, data, (err, result)=>{
        if(err){
            console.log("You are not get data", err)
        }else{
            console.log("You are get data success Fully")
            console.log(result)
        }
    })

}


// Update inventory data

const update_inventory = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const sql = `UPDATE tbl_gym_inventory SET ? WHERE pid = ?`;

    connection.query(sql, [data, id], (err, result) =>{
        if (err) {
            console.error("Inventory data not Updated", err);
            res.status(500).json({ error: "Inventory data Update failed" });
          } else {
            console.log("Inventory data updated Successfully");
            res.status(200).json({ result, message: "Inventory data updated Successfully" });
        }
    })

}

//Delete Inventory data

const delete_Inventory_data = (req, res) =>{
    const id = req.params.id;

    const sql = `DELETE FROM tbl_gym_inventory WHERE pid = ?`;

    connection.query(sql, id, (err, result)=>{
        if(err){
            console.log("Inventory data not delete", err)
        }else{
            console.log("Inventory data delete success fully")
        }
    })
}

module.exports={post_inventory, get_Inventory_data, update_inventory, delete_Inventory_data}