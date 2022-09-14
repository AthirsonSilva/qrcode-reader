require('dotenv').config()

const express = require('express')
const app = express()
const connection = require('./connection')
const cors = require('cors')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

const PORT = process.env.PORT || 3000
app.use(cors(corsOptions))

app.post('/api/scans', (req, res) => {
    /* const type = req.body.type
    const data = req.body.data

    const sql = 'INSERT INTO scans (qrData, qrType) VALUES (?, ?)'
    connection.mysqlConnection.query(sql, [type, data], (err, result) => {
        if (err) {
        console.log(err)
        } else {
        res.send(result)
        }
    }) */

    return res.send('Data sent: ' + req.body.data)
})

app.get('/api/scans', (req, res) => {
    const query = 'SELECT * FROM scans'
    
    connection.query(query, (err, result) => {
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