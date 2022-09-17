import * as dotenv from 'dotenv'
dotenv.config()

import mysql from 'mysql2/promise'
import mssql from 'mssql'

/* const mysqlConnection = (qrData, qrType) => {

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

export { mysqlConnection, mssqlConnection } */

const connect = async () => {
  if (global.connection && global.connectio.state !== 'disconnect') {
    return global.connection
  }

  const connection = await mysql.createConnection(process.env.CONNECTION || 'mysql://root:!Potter4@localhost:3306/scans')
  console.log('Conectou no MySQL!')
  global.connection = connection
  return connection
}

const insertData = async (qrData, qrType) => {
  const conn = await connect()

  const sql = 'INSERT INTO scans (data, type) VALUES (?, ?)'
  const values = [qrData, qrType]

  return await conn.query(sql, values)
}

const selectData = async () => {
  const conn = await connect()

  const [rows] = await conn.query('SELECT * FROM scans')
  return rows
}

export { connect, insertData, selectData }