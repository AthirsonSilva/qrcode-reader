require('dotenv').config()

const express = require('express')
const app = express()
const connection = require('./connection/mysqlConnection')

const PORT = process.env.PORT || 3000

// app.post('/post')