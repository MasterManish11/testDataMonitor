const express =require("express")
const router = express.Router()
const sql = require("mssql");
const connectionString = `Server=${process.env.DB_SERVER},${process.env.DB_PORT};
Database=${process.env.DB_DATABASE};Uid=${process.env.DB_UID};Pwd=${process.env.DB_PASSWORD};Encrypt=yes;
TrustServerCertificate=no;Connection Timeout=30;`

router.get("/production",(req,res)=>{
    (async function(){
        try {
            await sql.connect(connectionString)
            const result = await sql.query`SELECT * FROM dbo.realtimedata`
            res.json(result.recordsets[0])
        } catch (err) {
            console.log(err)

        }
    })()
})

        module.exports = router