const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dogRouter = require('./routes/dogRoutes');
const groceryRouter = require('./routes/groceryRoutes');
const galleryRouter = require('./routes/galleryRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json());

// add routes
app.use('/api/dogs', dogRouter);
app.use('/api/grocery', groceryRouter);
app.use('/api/gallery', galleryRouter);

// just trying to show the potential
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;