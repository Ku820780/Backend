const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const swaggerui = require('swagger-ui-express')
const swaggerjsdoc = require('swagger-jsdoc')
const salt = 10;

const option = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"API DOCUMENTATION",
            version:"1.0.0"
        },
        servers:[
            {
                url:'http://localhost:5001'
            }
        ]
    },
    apis:['./Routes/tbl_admin_user.js']
}
// app.use(bcrypt());


app.use(express.json());
app.use(express.static('uploads'))
var cors = require("cors");

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(cookieParser())
app.use(bodyParser.json())

const port = 5001;

const {AdminUser} =require("./Routes/tbl_admin_user");
app.use("/", AdminUser);

const {Customer} = require("./Routes/tbl_customer");
app.use('/', Customer)

const {Inventory} = require("./Routes/tbl_gym_inventory");
app.use('/', Inventory);

app.use('testing',swaggerui.serve,swaggerui.setup(swaggerjsdoc(option)));


app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
});