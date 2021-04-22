const express = require('express');
const cors = require('cors')

const priglosRouter = require('./routes/priglosRoutes')
const AppError = require('./utils/appError')

const app = express();

app.use(cors())
app.use(express.json({ limit: '10kb'}));

app.use(express.static(`${__dirname}../../frontend/build`));
// app.use()
app.use('/priglos', priglosRouter);


module.exports = app;