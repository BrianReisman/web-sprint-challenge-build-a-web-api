//require
const express = require('express');
const server = express();

const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

//configure
server.use(express.json())

//routes
server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

//export
module.exports = server;
