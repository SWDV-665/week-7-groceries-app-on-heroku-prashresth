const express = require('express');
const dogRouter = express.Router();

const DogController = require('../controllers/dogController');

// all dog routes that call the dog controller
dogRouter.get('/', DogController.get)
dogRouter.get('/:id', DogController.getById)
dogRouter.get('/search/:id', DogController.searchDog)
dogRouter.post('', DogController.post)
dogRouter.put('/:id', DogController.dogUpdate)
dogRouter.delete('/:id', DogController.dogDelete)

module.exports = dogRouter;
