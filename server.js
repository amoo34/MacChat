const express = require('express')
const server = express()
const app = require('./app.js')
server.use(app)

server.listen(3002,()=>console.log("Listening to 3002"))