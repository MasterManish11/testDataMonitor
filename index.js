require('dotenv').config()
const express =require("express")
const bodyParser = require("body-parser")
const app = express();
const cors = require("cors")
const port = process.env.PORT || 3000
const production = require("./routes/production.js")
app.use(bodyParser.json())

app.use(cors({
    origin: "*"
}))

// GET Request 

// const config = {
//     type: "mssql",
//     user: process.env.DB_UID,
//     password: process.env.DB_PASSWORD,
//     server: process.env.DB_SERVER,
//     port: 1433,
//     database: process.env.DB_DATABASE,
//     // connectionTimeout: 3000,
//     authentication: {
//         type: 'default'
//     },
//     // parseJSON: true,
//     options: {
//       encrypt: true,
//       enableArithAbort: true
//     },
//   };

app.get("/",(req,res)=>{
    res.json("app is working")
});
app.get("/production",production)
    

app.listen(port, ()=> 
console.log(`Express server is running on port ${port}`)
)

