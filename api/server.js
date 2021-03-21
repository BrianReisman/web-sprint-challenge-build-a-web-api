//require
const express = require('express');
const server = express();

const actionsRouter = require('./actions/actions-router')//!

//configure
server.use(express.json())

//routes
server.use('/api/actions', actionsRouter)

//export
module.exports = server;
