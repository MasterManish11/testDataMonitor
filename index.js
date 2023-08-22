require('dotenv').config()
const sql = require("msnodesqlv8");
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

const connectionString = `Driver={${process.env.DB_DRIVER}};Server=${process.env.DB_SERVER},${process.env.DB_PORT};
Database=${process.env.DB_DATABASE};Uid=${process.env.DB_UID};Pwd=${process.env.DB_PASSWORD};Encrypt=yes;
TrustServerCertificate=no;Connection Timeout=30;`
// // console.log("connectionString",connectionString)


// GET Request 

app.get("/",(req,res)=>{
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


//   console.log("Starting...");
// connectAndQuery();

// async function connectAndQuery() {
//     try {
//         var poolConnection = await sql.connect(config);

//         console.log("Reading rows from the Table...");
//         var resultSet = await poolConnection.request().query(`SELECT TOP 20 pc.Name as CategoryName,
//             p.name as ProductName 
//             FROM [SalesLT].[ProductCategory] pc
//             JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid`);

//         console.log(`${resultSet.recordset.length} rows returned.`);

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





app.listen(port, ()=> 
console.log(`Express server is running on port ${port}`)
)








































