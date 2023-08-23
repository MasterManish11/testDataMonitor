require('dotenv').config()
const sql = require("mssql");
const express =require("express")
const bodyParser = require("body-parser")
const app = express();
const router =express.Router()
const cors = require("cors")
const port = process.env.PORT || 3000
app.use(bodyParser.json())

app.use(cors({
    origin: "*"
}))

// const connectionString = `Driver={${process.env.DB_DRIVER}};Server=${process.env.DB_SERVER},${process.env.DB_PORT};
// Database=${process.env.DB_DATABASE};Uid=${process.env.DB_UID};Pwd=${process.env.DB_PASSWORD};Encrypt=yes;
// TrustServerCertificate=no;Connection Timeout=30;`
// // console.log("connectionString",connectionString)


// GET Request 

// app.get("/",(req,res)=>{
//     const query = "SELECT * FROM dbo.realtimedata";
    
//     sql.query(connectionString, query, (err, rows) => {
//         if(err){
//             console.log(err)
//         }else{
//             // console.log(rows);
//             res.send(rows)
//         }
        
//     });
    
//     })




const config = {
    type: "mssql",
    user: process.env.DB_UID,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: 1433,
    database: process.env.DB_DATABASE,
    // connectionTimeout: 3000,
    authentication: {
        type: 'default'
    },
    // parseJSON: true,
    options: {
      encrypt: true,
      enableArithAbort: true
    },
  };


  console.log("Starting...");

//   const poolPromise =new sql.ConnectionPool(config)
//   .connect()
//   .then (pool =>{
//       console.log("connected")
//       return pool
//   })
//   .catch(err => console.log("failed  connect", err)); 

app.get("/production",(req,res)=>{
    
    // res.json({
    //     "name":"manish"
    // })
        
    sql.connect(config, function (err) {

        if (err) console.log(err);
    
        // create Request object
        var request = new sql.Request();
    
        // query to the database and get the records
        request.query('SELECT * FROM dbo.realtimedata', function (err, recordset) {
    
            if (err) console.log(err)
    
            // send records as a response
            res.json(recordset);
    
        });
    });








   
    
// async function connectAndQuery() {
    // try {
    //     // const pool = new sql.ConnectionPool(config);
    //     var poolConnection = await sql.connect(config);
    //     // const poolConnect = pool.connect();
    //     console.log("Reading rows from the Table...");
    //     var resultSet = await poolConnection.request().query(`SELECT TOP 20 pc.Name as CategoryName,
    //     p.name as ProductName 
    //     FROM [SalesLT].[ProductCategory] pc
    //         JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid`);
            
    //         console.log(`${resultSet.recordset.length} rows returned.`);
    //         res.json(resultSet)
    //         // output column headers
    //         var columns = "";
    //         for (var column in resultSet.recordset.columns) {
    //             columns += column + ", ";
    //         }
    //         console.log("%s\t", columns.substring(0, columns.length - 2));
            
    //         // ouput row contents from default record set
    //         resultSet.recordset.forEach(row => {
    //             console.log("%s\t%s", row.CategoryName, row.ProductName);
    //         });
            
    //         // close connection only when we're certain application is finished
    //         poolConnection.close();
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // }
    
    // connectAndQuery();
});
    



app.listen(port, ()=> 
console.log(`Express server is running on port ${port}`)
)








































