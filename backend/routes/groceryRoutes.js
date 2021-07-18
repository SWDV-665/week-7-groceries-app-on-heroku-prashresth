const express = require('express');
const groceryRouter = express.Router();

const GroceryController = require('../controllers/groceryController');

// all dog routes that call the dog controller
groceryRouter.get('/', GroceryController.get)
groceryRouter.get('/:id', GroceryController.getItemById)
groceryRouter.post('', GroceryController.post)
groceryRouter.put('/:id', GroceryController.itemUpdate)
groceryRouter.delete('/:id', GroceryController.itemDelete)

module.exports = groceryRouter;
