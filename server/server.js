import * as dotenv from 'dotenv';
dotenv.config()
import express, { urlencoded, json } from 'express'
const app = express()
import cors from 'cors'
import mysql from 'mysql2/promise'

app.use(urlencoded({ extended: true }))
app.use(json())

const query = async (data, type) => {
    if (global.connection && global.connection.state !== 'disconnect') {
      return global.connection
    }
  
    const connection = await mysql.createConnection(process.env.CONNECTION || 'mysql://root:!Potter4@localhost:3306/scans')

    console.info('MySQL: Connection established')
    console.table({data, type})
    global.connection = connection
    
    try {
        console.info('Inserting stuff in the fucking table.')
        
        const query = `INSERT INTO scans (qrData, qrType) VALUES (dataTest, typeTest)`
        connection.query
    } catch (error) {
        console.log(error)
    } finally {
        selectData()
    }
}


const selectData = async () => {
    const conn = await query()

    const [rows] = await conn.query('SELECT * FROM scans')
    return rows
}  

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

const PORT = process.env.PORT || 3000
app.use(cors(corsOptions))

app.post('/api/scans', (req, res) => {
    const type = JSON.stringify(req.body.type)
    const data = JSON.stringify(req.body.data)
    
    query({type: type, data: data})

    console.table(req.body)
    
    return res.send('Data sent: ' + req.body.data)
})

app.get('/api/scans', (req, res) => {
    const query = 'SELECT * FROM scans'
    
    _query(query, (err, result) => {
        if (err) {
        console.log(err)
        } else {
        res.send(result)
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})