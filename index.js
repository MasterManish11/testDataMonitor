require('dotenv').config()
const sql = require("msnodesqlv8");
const express =require("express")
const bodyParser = require("body-parser")
const app = express();
const cors = require("cors")
const port = process.env.PORT || 3000
const connectionString = `Driver={${process.env.DB_DRIVER}};Server=${process.env.DB_SERVER},${process.env.DB_PORT};
Database=${process.env.DB_DATABASE};Uid=${process.env.DB_UID};Pwd=${process.env.DB_PASSWORD};Encrypt=yes;
TrustServerCertificate=no;Connection Timeout=30;`

// console.log("connectionString",connectionString)

app.use(bodyParser.json())

app.use(cors({
    origin: "*"
}))

// GET Request 

app.get("/productiondetail",(req,res)=>{
const query = "SELECT * FROM dbo.realtimedata";

sql.query(connectionString, query, (err, rows) => {
    if(err){
        console.log(err)
    }else{
        // console.log(rows);
        res.send(rows)
    }
    
});

})

app.listen(port, ()=> 
console.log(`Express server is running on port ${port}`)
)