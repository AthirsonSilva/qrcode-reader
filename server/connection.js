const mysqlConnection = (qrData, qrType) => {
  const mysql = require('mysql');

  const connection = mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: '!Potter4',
      database: 'scans'
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
}

const mssqlConnection = (err, qrData, qrType) => {
  const mssql = require('mssql')

  const config = {
    user: 'sa',
    password: '@Potter4',
    server: '127.0.0.1',
    database: 'scans'
  }

  mssql.connect(config, err => {
    if (err) throw err

    const request = new mssql.Request()

    request.query(`INSERT INTO scans (data, type) VALUES (${qrData}, ${qrType})`, (err, result) => {
      if (err) throw err

      console.log(result)
      return true
    })
  }, qrData, qrType)
}

module.exports = {
  mysqlConnection,
  mssqlConnection
}