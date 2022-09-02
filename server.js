const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'dbfoda'
})

const sendScan = connection.connect((err, qrData, qrType) => {
    if (err) throw err;
    console.log('connected!');

    let query = `INSERT INTO Scans (data, type) VALUES (${qrData}, ${qrType})`

    connection.query(query, (err, result) => {
      if (err) throw err;

      console.log(`result: ${result}`);
      return true
    })
})

module.exports = sendScan