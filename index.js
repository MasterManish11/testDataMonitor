require('dotenv').config()
const sql = require("mssql");
const express =require("express")
const bodyParser = require("body-parser")
const app = express();
const cors = require("cors")
const port = process.env.PORT || 3000
app.use(bodyParser.json())

app.use(cors({
    origin: "*"
}))

const connectionString = `Server=${process.env.DB_SERVER},${process.env.DB_PORT};
Database=${process.env.DB_DATABASE};Uid=${process.env.DB_UID};Pwd=${process.env.DB_PASSWORD};Encrypt=yes;
TrustServerCertificate=no;Connection Timeout=30;`


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

app.get("/production",(req,res)=>{
    (async function(){
        try {
            console.log("inside loop")
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(connectionString)
            const result = await sql.query`SELECT * FROM dbo.realtimedata`
            res.json(result.recordsets[0])
        } catch (err) {
            // ... error checks
            console.log(err)

        }
    })()

});
    

app.listen(port, ()=> 
console.log(`Express server is running on port ${port}`)
)

